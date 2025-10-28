import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import GitHubStarButton from "./GitHubStarsButton";

// constants/contact.ts
export const CONTACT_EMAIL = 'idan.lut@gmail.com';
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

interface NavigationItem {
  name: string;
  href: string;
  external?: boolean;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation: NavigationItem[] = [
    { name: "Features", href: "/#features" },
    { name: "Integrations", href: "/#integrations" },
    { name: "Blog", href: "/#blog" },
    {
      name: "Docs",
      href: "https://opsimate.vercel.app/#integrations",
      external: true,
    },
  ];
  const slackLink: NavigationItem = {
    name: "Slack",
    href: "https://join.slack.com/t/opsimate/shared_invite/zt-39bq3x6et-NrVCZzH7xuBGIXmOjJM7gA",
    external: true,
  };
  // New Contact link
  const contactLink: NavigationItem = {
    name: "Contact Us",
    href: CONTACT_MAILTO,
    external: true,
  };

  return (
    <nav className="bg-surface-50 dark:bg-surface-950 shadow-sm border-b border-surface-200 dark:border-surface-800 sticky top-0 z-50 transition-colors duration-200">
      <div className="container-max">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-surface-700 dark:text-surface-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors duration-200"
                {...(item.external && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                {item.name}
              </Link>
            ))}
            <GitHubStarButton />
            <Link
              href={slackLink.href}
              className="text-surface-700 dark:text-surface-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors duration-200"
              {...(slackLink.external && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
            >
              {slackLink.name}
            </Link>
             {/* Contact Us button */}
             <a
              href={contactLink.href}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              {contactLink.name}
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                  {...(item.external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Contact Us link */}
              <a
                href={contactLink.href}
                className="text-surface-700 dark:text-surface-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors duration-200 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {contactLink.name}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
