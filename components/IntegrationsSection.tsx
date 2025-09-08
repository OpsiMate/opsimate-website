import React from 'react';
import { ExternalLink, BarChart3, FileText, Box, Server, Database } from 'lucide-react';

const IntegrationsSection: React.FC = () => {
  const integrations = [
    {
      name: 'Grafana',
      description: 'Connect your Grafana dashboards and visualizations',
      icon: BarChart3,
      color: 'text-orange-600',
      link: 'https://opsimate.vercel.app/integrations/grafana'
    },
    {
      name: 'Kibana',
      description: 'Connect to Kibana for log analysis and visualization',
      icon: FileText,
      color: 'text-purple-600',
      link: 'https://opsimate.vercel.app/integrations/kibana'
    },
    {
      name: 'Datadog',
      description: 'Integrate with Datadog for comprehensive monitoring',
      icon: Database,
      color: 'text-purple-700',
      link: 'https://opsimate.vercel.app/integrations/datadog'
    },
    {
      name: 'Docker',
      description: 'Container monitoring and management',
      icon: Box,
      color: 'text-blue-500',
      link: 'https://opsimate.vercel.app/providers-services/services/container-services'
    },
    {
      name: 'Kubernetes',
      description: 'Monitor and manage Kubernetes clusters',
      icon: Server,
      color: 'text-blue-600',
      link: 'https://opsimate.vercel.app/providers-services/services/kubernetes-pods'
    },
    {
      name: 'Systemd',
      description: 'Monitor and manage systemd services',
      icon: Server,
      color: 'text-gray-600',
      link: 'https://opsimate.vercel.app/providers-services/services/systemd-services'
    }
  ];

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

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group"
            >
              {/* Integration Icon */}
              <div className="w-12 h-12 bg-gray-100 rounded-lg mb-4 flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300">
                <integration.icon className={`w-6 h-6 ${integration.color}`} />
              </div>
              
              <div className="mb-2">
                <h3 className="font-semibold text-gray-900">{integration.name}</h3>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {integration.description}
              </p>
              
              <a 
                href={integration.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 transition-colors duration-200"
              >
                Learn More
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>




      </div>
    </section>
  );
};

export default IntegrationsSection;
