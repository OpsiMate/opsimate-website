import React, { useState } from 'react';
import useIsMobile from '../hooks/useIsMobile'; 
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

const MOBILE_VISIBLE_COUNT = 4; 

const FeaturesSection: React.FC = () => {
  const isMobile = useIsMobile(); 
  
  const [isExpanded, setIsExpanded] = useState(false); 

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

  const featuresToDisplay = 
      (isMobile && !isExpanded) 
          ? features.slice(0, MOBILE_VISIBLE_COUNT) 
          : features; 
  
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  
  const requiresToggle = isMobile && (features.length > MOBILE_VISIBLE_COUNT);

  return (
    <section id="features" className="py-16 features-section">
      <div className="container-max">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"> 
          {featuresToDisplay.map((feature, index) => ( 
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {requiresToggle && (
            <div className="flex justify-center mt-8 md:hidden"> 
                <button
                    onClick={handleToggle}
                    className="py-2 px-6 text-sm font-semibold rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-300"
                >
                    {isExpanded ? 'Show Less Features' : 'Show More Features'}
                </button>
            </div>
        )}

      </div>
    </section>
  );
};

export default FeaturesSection;