import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ className = '', width = 32, height = 32 }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src="/images/logo.png" 
        alt="OpsiMate" 
        width={width} 
        height={height}
        className="flex-shrink-0 object-contain"
        style={{ background: 'transparent' }} 
      />
      <span className="text-xl font-semibold text-blue-700 dark:text-blue-400">
        OpsiMate
      </span>
    </div>
  );
};

export default Logo;
