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
      icon: Bell,
      title: 'Unified Alert Dashboard',
      description: 'Consolidate alerts from all your monitoring tools, cloud providers, and services into one single pane of glass.',
      link: 'https://opsimate.vercel.app/docs/alerts/adding-alerts',
    },
    {
      icon: Monitor,
      title: 'Multi-Source Integration',
      description: 'Connect Prometheus, Grafana, Datadog, AWS CloudWatch, and dozens of other alert sources seamlessly.',
      link: 'https://opsimate.vercel.app/docs/integrations/overview',
    },
    {
      icon: Activity,
      title: 'Real-time Alert Aggregation',
      description: 'See all alerts in real-time with intelligent deduplication and correlation to reduce noise.',
      link: 'https://opsimate.vercel.app/docs/dashboards/overview',
    },
    {
      icon: Settings,
      title: 'Smart Alert Routing',
      description: 'Route alerts to the right teams with intelligent filtering, prioritization, and escalation rules.',
      link: 'https://opsimate.vercel.app/docs/alerts/adding-alerts',
    },
    {
      icon: Database,
      title: 'Alert History & Analytics',
      description: 'Track alert patterns, response times, and trends to optimize your incident response.',
      link: 'https://opsimate.vercel.app/docs/dashboards/overview',
    },
    {
      icon: GitBranch,
      title: 'Automated Response',
      description: 'Trigger automated workflows and remediation actions directly from alerts to resolve issues faster.',
      link: 'https://opsimate.vercel.app/docs/dashboards/service-menu',
    },
    {
      icon: Server,
      title: 'Infrastructure Visibility',
      description: 'Get complete context for every alert with infrastructure topology and service dependencies.',
      link: 'https://opsimate.vercel.app/docs/providers-services/overview',
    },
    {
      icon: GitBranch,
      title: 'Open Source',
      description: 'Fully open source with transparent development. Contribute and customize freely.',
      link: 'https://opsimate.vercel.app/docs/development',
    }
  ];

  return (
    <section id="features" className="py-16 features-section">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-surface-100 mb-3">
            Everything You Need to{' '}
            <span className="gradient-text">Manage All Your Alerts</span>
          </h2>
          <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            OpsiMate consolidates alerts from every source into one unified platform, 
            giving you complete visibility and control over your entire infrastructure's health.
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
              link={feature.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
