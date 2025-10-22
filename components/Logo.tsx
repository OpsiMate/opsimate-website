import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ className = '', width = 40, height = 40 }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#4FC3F7', stopOpacity:1}} />
            <stop offset="50%" style={{stopColor:'#2196F3', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#1976D2', stopOpacity:1}} />
          </linearGradient>
        </defs>
        
        {/* O letter */}
        <circle cx="30" cy="50" r="25" fill="none" stroke="url(#logoGradient)" strokeWidth="8"/>
        
        {/* M letter */}
        <path 
          d="M 55 25 L 55 75 M 55 25 L 70 50 M 85 25 L 70 50 M 85 25 L 85 75" 
          stroke="url(#logoGradient)" 
          strokeWidth="8" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">OpsiMate</span>
    </div>
  );
};

export default Logo;
