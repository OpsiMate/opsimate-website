import React from 'react';
import { ExternalLink, BarChart3, Activity, FileText, Cloud, Box, Server, Database } from 'lucide-react';

const IntegrationsSection: React.FC = () => {
  const integrations = [
    {
      name: 'Grafana',
      description: 'Connect your Grafana dashboards and visualizations',
      icon: BarChart3,
      category: 'Monitoring',
      color: 'text-orange-600'
    },
    {
      name: 'Prometheus',
      description: 'Integrate with Prometheus metrics and alerting',
      icon: Activity,
      category: 'Metrics',
      color: 'text-red-600'
    },
    {
      name: 'Kibana',
      description: 'Connect to Kibana for log analysis and visualization',
      icon: FileText,
      category: 'Logging',
      color: 'text-purple-600'
    },
    {
      name: 'Coralogix',
      description: 'Integrate with Coralogix for advanced log analytics',
      icon: Database,
      category: 'Logging',
      color: 'text-green-600'
    },
    {
      name: 'Kubernetes',
      description: 'Monitor and manage Kubernetes clusters',
      icon: Server,
      category: 'Orchestration',
      color: 'text-blue-600'
    },
    {
      name: 'Docker',
      description: 'Container monitoring and management',
      icon: Box,
      category: 'Containers',
      color: 'text-blue-500'
    },
    {
      name: 'AWS',
      description: 'Connect to Amazon Web Services infrastructure',
      icon: Cloud,
      category: 'Cloud',
      color: 'text-yellow-600'
    },
    {
      name: 'Azure',
      description: 'Integrate with Microsoft Azure services',
      icon: Cloud,
      category: 'Cloud',
      color: 'text-blue-700'
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
              {/* Integration Icon */}
              <div className="w-12 h-12 bg-gray-100 rounded-lg mb-4 flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300">
                <integration.icon className={`w-6 h-6 ${integration.color}`} />
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




      </div>
    </section>
  );
};

export default IntegrationsSection;
