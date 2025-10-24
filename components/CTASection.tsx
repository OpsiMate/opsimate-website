import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const CTASection: React.FC = () => {
  const benefits = [
    '100% Open Source',
    'No vendor lock-in',
    'Setup in under 10 minutes',
    'Community-driven development'
  ];

  return (
    <section className="section-padding bg-primary-600 dark:bg-surface-900 text-white dark:text-surface-100">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Ready to Try Open Source Infrastructure Management?
            </h2>
            <p className="text-xl text-primary-100 dark:text-surface-100/90 mb-8 leading-relaxed">
              Join the growing community of teams using OpsiMate's open source platform. 
              Deploy, customize, and contribute to the future of infrastructure management.
            </p>
            
            {/* Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-primary-100 dark:text-surface-300">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://github.com/OpsiMate/OpsiMate"
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-surface-50 text-primary-600 hover:bg-surface-100 dark:bg-surface-100 dark:text-primary-700 dark:hover:bg-surface-200 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center gap-2 text-lg"
              >
                View on GitHub
                <ArrowRight className="h-5 w-5" />
              </a>
              <a 
                href="https://join.slack.com/t/opsimate/shared_invite/zt-39bq3x6et-NrVCZzH7xuBGIXmOjJM7gA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border-2 border-surface-50 text-surface-50 hover:bg-surface-50 hover:text-primary-600 dark:border-surface-200 dark:text-surface-200 dark:hover:bg-surface-200 dark:hover:text-primary-700 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center gap-2 text-lg"
              >
                Join Community
              </a>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              {/* OpsiMate Dashboard Preview */}
              <div className="bg-white/10 rounded-lg border border-white/20 overflow-hidden mb-6" style={{aspectRatio: '16/10'}}>
                <img 
                  src="/images/opsimate-dashboard.png" 
                  alt="OpsiMate Dashboard Preview" 
                  className="w-full h-full object-contain rounded-lg"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="flex items-center justify-center h-full bg-white/5">
                          <div class="text-center">
                            <div class="bg-white/20 p-4 rounded-full inline-block mb-4">
                              <div class="w-8 h-8 bg-white/30 rounded animate-pulse"></div>
                            </div>
                            <p class="text-white/80 font-medium">Dashboard Preview</p>
                            <p class="text-sm text-white/60 mt-2">OpsiMate Interface</p>
                          </div>
                        </div>
                      `;
                    }
                  }}
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-white/80">Open Source</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white mb-1">Free</div>
                  <div className="text-sm text-white/80">Forever</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white mb-1">AGPL</div>
                  <div className="text-sm text-white/80">License</div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-green-400 text-green-900 rounded-lg shadow-lg p-3 font-medium text-sm">
              ✓ Open Source
            </div>
            <div className="absolute -bottom-4 -left-4 bg-yellow-400 text-yellow-900 rounded-lg shadow-lg p-3 font-medium text-sm">
              🚀 Quick Setup
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default CTASection;
