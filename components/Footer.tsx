import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, Slack } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Integrations', href: '#integrations' },
    ],
    resources: [
      { name: 'Documentation', href: 'https://opsimate.vercel.app/#integrations' },
    ],
    opensource: [
      { name: 'GitHub Repository', href: 'https://github.com/OpsiMate/OpsiMate' },
      { name: 'Contribute', href: 'https://github.com/OpsiMate/OpsiMate/blob/main/CONTRIBUTING.md' },
      { name: 'Issues', href: 'https://github.com/OpsiMate/OpsiMate/issues' },
      { name: 'License', href: 'https://github.com/OpsiMate/OpsiMate/blob/main/LICENSE' },
    ],
  };

  const socialLinks = [
    { 
      name: 'GitHub', 
      href: 'https://github.com/OpsiMate/OpsiMate',
      icon: Github 
    },
    { 
      name: 'Slack Community', 
      href: 'https://join.slack.com/t/opsimate/shared_invite/zt-39bq3x6et-NrVCZzH7xuBGIXmOjJM7gA',
      icon: Slack 
    },
    { 
      name: 'Email', 
      href: 'mailto:idan.lut@gmail.com',
      icon: Mail 
    },
  ];

  return (
    <footer className="bg-[#FEFEFE] dark:bg-gray-900 text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Logo className="mb-4" />
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-md">
              Simplify your infrastructure management with one unified platform. 
              Monitor, manage, and optimize your entire infrastructure from a single dashboard.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Open Source Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Open Source</h3>
            <ul className="space-y-2">
              {footerLinks.opensource.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} OpsiMate. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link 
              href="/privacy" 
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white text-sm transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white text-sm transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;