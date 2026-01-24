import React from 'react';
import { ArrowRight, Play, Slack } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section bg-gradient-to-br from-surface-50 via-surface-50 to-surface-50 dark:from-surface-950 dark:via-surface-950 dark:to-surface-950 section-padding min-h-screen flex items-center">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-surface-200 dark:bg-surface-800 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="mr-2">🔔</span>
              Unified Alert Management Platform
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-surface-900 dark:text-surface-100 mb-6 leading-tight">
              All Your Alerts in{' '}
              <span className="gradient-text">One Single Pane of Glass</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
              OpsiMate is an <strong>open source</strong> alert management platform that consolidates alerts from every monitoring tool, cloud provider, and service into one unified dashboard. Stop switching between tools—see everything, respond faster, and eliminate alert fatigue.
            </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
            {/* Get Started – Primary */}
            <a
              href="https://github.com/OpsiMate/OpsiMate"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </a>
          
            {/* Demo – Highly visible secondary */}
            <a
              href="https://demo.opsimate.com/?playground=true"
              className="relative inline-flex items-center gap-2 text-lg px-8 py-4 rounded-xl
                         border-2 border-blue-600 text-blue-600
                         hover:bg-blue-50 dark:hover:bg-blue-950
                         transition-all duration-300
                         ring-2 ring-blue-500/30 hover:ring-blue-500/60"
            >
              <Play className="h-5 w-5" />
              Live Demo
          
              {/* subtle attention pulse */}
              <span className="absolute -top-2 -right-2 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
            </a>
          
            {/* Slack – Tertiary */}
            <a
              href="https://join.slack.com/t/opsimate/shared_invite/zt-39bq3x6et-NrVCZzH7xuBGIXmOjJM7gA"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-8 py-4 inline-flex items-center gap-2"
              aria-label="Join our Slack community"
            >
              <Slack className="h-5 w-5" aria-hidden="true" />
              Join Slack
            </a>
          </div>

          </div>

          {/* Right Column - Hero Image/Video Placeholder */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-surface-100 to-surface-200 dark:from-surface-800 dark:to-surface-700 rounded-2xl p-8 shadow-2xl">
              {/* OpsiMate Dashboard Image */}
              <div className="bg-surface-50 dark:bg-surface-800 rounded-lg shadow-lg overflow-hidden" style={{aspectRatio: '16/10'}}>
                <img 
                  src="/images/opsimate-dashboard.png" 
                  alt="OpsiMate Dashboard - Infrastructure Management Interface" 
                  className="w-full h-full object-contain rounded-lg"
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
              <div className="absolute -top-4 -right-4 bg-surface-50 dark:bg-surface-800 rounded-lg shadow-lg p-3 border border-surface-200 dark:border-surface-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm font-medium text-surface-700 dark:text-surface-300">All Alerts Unified</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-surface-50 dark:bg-surface-800 rounded-lg shadow-lg p-3 border border-surface-200 dark:border-surface-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm font-medium text-surface-700 dark:text-surface-300">Real-time Alerts</span>
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
