import React from 'react';
import { 
  Monitor, 
  Bell, 
  Settings, 
  Database,
  Activity,
  GitBranch,
  Server
} from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Monitor,
      title: 'Unified Monitoring',
      description: 'Monitor your entire infrastructure from a single dashboard with real-time metrics and health status.'
    },
    {
      icon: Server,
      title: 'Infrastructure Management',
      description: 'Manage VMs and Kubernetes clusters seamlessly via SSH without agent installation.'
    },
    {
      icon: Activity,
      title: 'Real-time Metrics',
      description: 'Track system performance with instant visibility into CPU, memory, disk, and network usage.'
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Get intelligent notifications before issues impact users with custom thresholds.'
    },
    {
      icon: Database,
      title: 'Log Aggregation',
      description: 'Centralize logs from all services with powerful search and pattern analysis.'
    },
    {
      icon: GitBranch,
      title: 'Service Discovery',
      description: 'Auto-discover systemd services and containers without manual configuration.'
    },
    {
      icon: Settings,
      title: 'Automated Actions',
      description: 'Create automated responses with workflows that restart services and scale resources.'
    },
    {
      icon: GitBranch,
      title: 'Open Source',
      description: 'Fully open source with transparent development. Contribute and customize freely.'
    }
  ];

  return (
    <section id="features" className="py-16 features-section">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-surface-100 mb-3">
            Everything You Need to{' '}
            <span className="gradient-text">Manage Infrastructure</span>
          </h2>
          <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            OpsiMate provides comprehensive tools to monitor, manage, and optimize 
            your infrastructure from a single platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>


      </div>
    </section>
  );
};

export default FeaturesSection;
