import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

// Next 16 removed the `next lint` command and ESLint 9 defaults to flat
// config, so the linting setup now lives here instead of being implicit.
const config = [
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      // React Compiler rule, new in eslint-config-next 16. It flags any
      // setState inside an effect, but on the pages router that is the only
      // correct way to read browser-only state: localStorage and matchMedia
      // don't exist during SSR, and reading them while rendering causes a
      // hydration mismatch. The four current call sites (_app, ThemeContext,
      // CookieComponentBanner, BlogSection) are all this pattern.
      //
      // Kept as a warning rather than off so genuine cascading-render cases
      // still surface in review.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
];

export default config;
