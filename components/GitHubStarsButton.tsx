// components/GitHubStarButton.tsx
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react'; // Assuming you use lucide-react for icons

const GitHubStarButton: React.FC = () => {
  const [stars, setStars] = useState<number | null>(null);
  const repo = 'OpsiMate/OpsiMate';

  useEffect(() => {
    // Function to fetch stars from GitHub API
    const fetchStars = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStars(data.stargazers_count);
      } catch (error) {
        console.error("Failed to fetch GitHub stars:", error);
        // You could set stars to a default/fallback value here if needed
      }
    };

    fetchStars();
  }, [repo]); // Dependency array ensures this runs once on mount

  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
       className="inline-flex items-center gap-2 text-sm font-medium text-surface-800 dark:text-surface-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
    >
       
      <span> GitHub</span>
      {stars !== null && (
        <>
          <span className="h-4 w-px bg-surface-300 dark:bg-surface-700"></span>
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-500" />
            <span className="font-semibold">{stars.toLocaleString()}</span>
          </div>
        </>
      )}
    </a>
  );
};

export default GitHubStarButton;