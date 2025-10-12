import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Bell, 
  Settings, 
  Database,
  Activity,
  GitBranch,
  Server,
  Shield,
  Zap,
  Eye,
  Code,
  LucideIcon
} from 'lucide-react';
import FeatureCard from './FeatureCard';

type Category = 'all' | 'monitoring' | 'control' | 'integrations' | 'security';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  category: Category[];
  example: string;
  hasDemo?: boolean;
}

const FeaturesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const features: Feature[] = [
    {
      icon: Monitor,
      title: 'Unified Monitoring',
      description: 'Monitor your entire infrastructure from a single dashboard with real-time metrics and health status.',
      category: ['monitoring'],
      example: 'Track 100+ servers in one view',
      hasDemo: true
    },
    {
      icon: Server,
      title: 'Infrastructure Management',
      description: 'Manage VMs and Kubernetes clusters seamlessly via SSH without agent installation.',
      category: ['control'],
      example: 'Control Docker and K8s from one place',
      hasDemo: true
    },
    {
      icon: Activity,
      title: 'Real-time Metrics',
      description: 'Track system performance with instant visibility into CPU, memory, disk, and network usage.',
      category: ['monitoring'],
      example: 'Monitor providers in real time'
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Get intelligent notifications before issues impact users with custom thresholds.',
      category: ['monitoring'],
      example: 'Get alerted before downtime hits'
    },
    {
      icon: Database,
      title: 'Log Aggregation',
      description: 'Centralize logs from all services with powerful search and pattern analysis.',
      category: ['monitoring', 'integrations'],
      example: 'Search across all service logs instantly'
    },
    {
      icon: GitBranch,
      title: 'Service Discovery',
      description: 'Auto-discover systemd services and containers without manual configuration.',
      category: ['integrations'],
      example: 'Auto-detect all running services'
    },
    {
      icon: Settings,
      title: 'Automated Actions',
      description: 'Create automated responses with workflows that restart services and scale resources.',
      category: ['control'],
      example: 'Auto-restart failing services',
      hasDemo: true
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Secure SSH connections with role-based access control and audit logging.',
      category: ['security'],
      example: 'Track who accessed what, when'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built with performance in mind. Get instant feedback on all your infrastructure operations.',
      category: ['monitoring', 'control'],
      example: 'Sub-second response times'
    },
    {
      icon: Eye,
      title: 'Complete Visibility',
      description: 'See everything happening across your infrastructure with detailed insights and analytics.',
      category: ['monitoring'],
      example: 'Full stack observability'
    },
    {
      icon: Code,
      title: 'Open Source',
      description: 'Fully open source with transparent development. Contribute and customize freely.',
      category: ['integrations'],
      example: 'Fork, customize, contribute'
    },
    {
      icon: GitBranch,
      title: 'Easy Integration',
      description: 'Connect with your existing tools and workflows seamlessly with our flexible API.',
      category: ['integrations'],
      example: 'Integrates with 20+ platforms'
    }
  ];

  const categories: Array<{ id: Category; label: string; icon: LucideIcon }> = [
    { id: 'all' as Category, label: 'All Features', icon: Zap },
    { id: 'monitoring' as Category, label: 'Monitoring', icon: Eye },
    { id: 'control' as Category, label: 'Control', icon: Settings },
    { id: 'integrations' as Category, label: 'Integrations', icon: GitBranch },
    { id: 'security' as Category, label: 'Security', icon: Shield }
  ];

  const filteredFeatures = activeCategory === 'all' 
    ? features 
    : features.filter(f => f.category.includes(activeCategory));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="features" className="py-20 features-section relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-max relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              Discover, Monitor, and Act
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-surface-100 mb-4">
            Everything You Need to{' '}
            <span className="gradient-text">Manage Infrastructure</span>
          </h2>
          <p className="text-lg md:text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
            OpsiMate provides comprehensive tools to monitor, manage, and optimize 
            your infrastructure from a single platform — all in one place.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30' 
                    : 'bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 border border-surface-200 dark:border-surface-700'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-4 w-4" />
                <span>{category.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {filteredFeatures.map((feature, index) => (
            <FeatureCard
              key={`${feature.title}-${index}`}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              example={feature.example}
              hasDemo={feature.hasDemo}
              index={index}
            />
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-surface-600 dark:text-surface-400 mb-6 text-lg">
            Ready to transform your infrastructure management?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="#"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="h-5 w-5" />
              Try the Demo
            </motion.a>
            <motion.a
              href="https://github.com/OpsiMate"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code className="h-5 w-5" />
              View on GitHub
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
