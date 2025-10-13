import { Sun, MoonStar } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const [hasInteracted, setHasInteracted] = React.useState(false);

  return (
    <button
      onClick={() => {
        setHasInteracted(true);
        toggleTheme();
      }}
      className={`p-2 w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 focus:outline-none hover:bg-surface-300 dark:hover:bg-surface-700 ${
        hasInteracted ? "transition-colors duration-200" : ""
      }`}
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="h-6 w-6 text-surface-900 dark:text-surface-400" />
      ) : (
        <MoonStar className="h-6 w-6 text-surface-600 dark:text-primary-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
