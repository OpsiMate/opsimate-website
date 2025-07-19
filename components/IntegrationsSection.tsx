import React from 'react';
import { ExternalLink } from 'lucide-react';

const IntegrationsSection: React.FC = () => {
  const integrations = [
    {
      name: 'Grafana',
      description: 'Connect your Grafana dashboards and visualizations',
      logo: '/images/integrations/grafana-logo.png', // Placeholder - add actual logo
      category: 'Monitoring'
    },
    {
      name: 'Prometheus',
      description: 'Integrate with Prometheus metrics and alerting',
      logo: '/images/integrations/prometheus-logo.png', // Placeholder - add actual logo
      category: 'Metrics'
    },
    {
      name: 'Kibana',
      description: 'Connect to Kibana for log analysis and visualization',
      logo: '/images/integrations/kibana-logo.png', // Placeholder - add actual logo
      category: 'Logging'
    },
    {
      name: 'Coralogix',
      description: 'Integrate with Coralogix for advanced log analytics',
      logo: '/images/integrations/coralogix-logo.png', // Placeholder - add actual logo
      category: 'Logging'
    },
    {
      name: 'Kubernetes',
      description: 'Monitor and manage Kubernetes clusters',
      logo: '/images/integrations/kubernetes-logo.png', // Placeholder - add actual logo
      category: 'Orchestration'
    },
    {
      name: 'Docker',
      description: 'Container monitoring and management',
      logo: '/images/integrations/docker-logo.png', // Placeholder - add actual logo
      category: 'Containers'
    },
    {
      name: 'AWS',
      description: 'Connect to Amazon Web Services infrastructure',
      logo: '/images/integrations/aws-logo.png', // Placeholder - add actual logo
      category: 'Cloud'
    },
    {
      name: 'Azure',
      description: 'Integrate with Microsoft Azure services',
      logo: '/images/integrations/azure-logo.png', // Placeholder - add actual logo
      category: 'Cloud'
    }
  ];

  const categories = ['All', 'Monitoring', 'Metrics', 'Logging', 'Cloud', 'Containers', 'Orchestration'];

  return (
    <section id="integrations" className="section-padding bg-white">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Integrate with Your{' '}
            <span className="gradient-text">Existing Tools</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            OpsiMate seamlessly connects with your current monitoring and infrastructure tools. 
            No need to replace what's working - enhance it.
          </p>
        </div>

        {/* Category Filter - Placeholder for future functionality */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                category === 'All' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group"
            >
              {/* Logo Placeholder */}
              <div className="w-12 h-12 bg-gray-100 rounded-lg mb-4 flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300">
                <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
              </div>
              
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {integration.category}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {integration.description}
              </p>
              
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 transition-colors duration-200">
                Learn More
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Integration CTA */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Don't See Your Tool?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're constantly adding new integrations. Request a custom integration 
            or use our flexible API to connect any tool to OpsiMate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Request Integration
            </button>
            <button className="btn-secondary">
              View API Docs
            </button>
          </div>
        </div>

        {/* Integration Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Integrations</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">&lt; 5min</div>
            <div className="text-gray-600">Setup Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
