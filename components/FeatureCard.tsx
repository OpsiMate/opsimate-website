import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { LucideIcon, ArrowRight, Sparkles } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  example?: string;
  hasDemo?: boolean;
  className?: string;
  index?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  example,
  hasDemo = false,
  className = '',
  index = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const iconVariants: Variants = {
    rest: { 
      scale: 1,
      rotate: 0
    },
    hover: { 
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  const exampleVariants: Variants = {
    hidden: { 
      opacity: 0,
      height: 0,
      y: -10
    },
    visible: { 
      opacity: 1,
      height: 'auto',
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      className={`feature-card-enhanced group relative ${className}`}
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ padding: '2px' }}
      >
        <div className="absolute inset-0 rounded-2xl bg-white dark:bg-surface-800 m-[2px]" />
      </motion.div>

      <div className="relative z-10 p-6">
        <motion.div 
          className="flex items-center mb-4"
          variants={iconVariants}
        >
          <div className="relative">
            <motion.div 
              className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 p-3 rounded-xl group-hover:from-blue-500/20 group-hover:to-purple-500/20 dark:group-hover:from-blue-500/30 dark:group-hover:to-purple-500/30 transition-all duration-300"
              animate={isHovered ? {
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0)",
                  "0 0 0 8px rgba(59, 130, 246, 0.1)",
                  "0 0 0 0 rgba(59, 130, 246, 0)"
                ]
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </motion.div>
            
            {hasDemo && (
              <motion.div
                className="absolute -top-1 -right-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Sparkles className="h-4 w-4 text-yellow-500" />
              </motion.div>
            )}
          </div>
        </motion.div>

        <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed mb-4">
          {description}
        </p>

        <motion.div
          variants={exampleVariants}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
          className="overflow-hidden"
        >
          {example && (
            <div className="border-t border-surface-200 dark:border-surface-700 pt-4 mt-4">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-medium text-surface-500 dark:text-surface-500 mb-1">
                    Example Use Case
                  </p>
                  <p className="text-sm font-medium text-surface-700 dark:text-surface-300 italic">
                    "{example}"
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {hasDemo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-700"
          >
            <a 
              href="https://github.com/OpsiMate/OpsiMate" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-2 group/btn transition-colors"
            >
              <span>See it in action</span>
              <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        )}

        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        />
      </div>
    </motion.div>
  );
};

export default FeatureCard;
