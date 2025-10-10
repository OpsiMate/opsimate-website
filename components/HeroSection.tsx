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
              <a
                href="https://github.com/Fifaboyz/OpsiMate"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </a>

              <a
                href="https://join.slack.com/t/opsimate/shared_invite/zt-39bq3x6et-NrVCZzH7xuBGIXmOjJM7gA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-lg px-8 py-4 inline-flex items-center gap-2"
              >
                Join Slack Community
              </a>
            </div>
          </div>

          {/* Right Column - Hero Image/Video Placeholder */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-2xl">

              {/* Subtle dark overlay for better contrast */}
              <div className="absolute inset-0 bg-black/5 rounded-2xl pointer-events-none"></div>

              {/* OpsiMate Dashboard Image */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden relative" style={{ aspectRatio: '16/10' }}>
                <img
                  src="/images/opsimate-dashboard.png"
                  alt="OpsiMate Dashboard - Infrastructure Management Interface"
                  className="w-full h-full object-contain rounded-lg brightness-95 contrast-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
              <div class="flex items-center justify-center h-full bg-gray-100">
                <div class="text-center">
                  <div class="bg-blue-100 p-4 rounded-full inline-block mb-4">
                    <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                  <p class="text-gray-500 font-medium">OpsiMate Dashboard</p>
                  <p class="text-sm text-gray-400 mt-2">Infrastructure Management Interface</p>
                </div>
              </div>
            `;
                    }
                  }}
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-800">All in One Place</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-800">Real-time Monitoring</span>
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
