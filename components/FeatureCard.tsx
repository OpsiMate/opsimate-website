import React from 'react';
import { LucideIcon, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  link?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  className = '',
  link,
}) => {
  return (
    <div className={`feature-card group hover:scale-105 transition-all duration-300 ${className}`}>
      <div className="flex items-center mb-3">
        <div className="bg-surface-200 dark:bg-surface-700 p-2 rounded-lg group-hover:bg-surface-300 dark:group-hover:bg-surface-600 transition-colors duration-300">
          <Icon className="h-5 w-5 text-surface-600 dark:text-surface-400" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">{title}</h3>
      <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">{description}</p>

      {(
        link ?? 'https://opsimate.vercel.app/docs/'
      ) && (
        <Link
          href={link ?? 'https://opsimate.vercel.app/docs/'}
          className="mt-3 inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
          {...(link?.startsWith('https') && {
            target: "_blank",
            rel: "noopener noreferrer"
          })}
        >
          Learn more
          <ExternalLink className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
};

export default FeatureCard;
