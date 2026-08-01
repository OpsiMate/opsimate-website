import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

// Next 16 removed the `next lint` command and ESLint 9 defaults to flat
// config, so the linting setup now lives here instead of being implicit.
export default [
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
  ...nextCoreWebVitals,
];
