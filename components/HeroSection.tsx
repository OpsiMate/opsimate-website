import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section section-padding min-h-screen flex items-center">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="mr-2">🚀</span>
              Open Source Infrastructure Management
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Streamline Your{' '}
              <span className="gradient-text">Infrastructure Operations</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
              OpsiMate is an <strong>open source</strong> platform that provides comprehensive infrastructure monitoring, 
              automation, and management tools. Transform complexity into clarity with our unified, intelligent platform.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button className="btn-primary text-lg px-8 py-4">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                <Play className="h-5 w-5" />
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-gray-500 mb-4">Trusted by teams worldwide</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 opacity-60">
                {/* Placeholder for company logos */}
                <div className="bg-gray-200 h-8 w-24 rounded animate-pulse"></div>
                <div className="bg-gray-200 h-8 w-24 rounded animate-pulse"></div>
                <div className="bg-gray-200 h-8 w-24 rounded animate-pulse"></div>
                <div className="bg-gray-200 h-8 w-24 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image/Video Placeholder */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-2xl">
              {/* Placeholder for hero image/video */}
              <div className="aspect-video bg-white rounded-lg shadow-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                    <Play className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-gray-500 font-medium">
                    Hero Image/Video Placeholder
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Upload your product demo video or screenshot here
                  </p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">99.9% Uptime</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Real-time Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
