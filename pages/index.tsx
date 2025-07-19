import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import IntegrationsSection from '../components/IntegrationsSection';
import CTASection from '../components/CTASection';

const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Integrations Section */}
      <IntegrationsSection />
      
      {/* Call to Action Section */}
      <CTASection />
    </Layout>
  );
};

export default HomePage;
