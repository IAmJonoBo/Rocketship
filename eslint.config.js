// @ts-check
import tseslint from 'typescript-eslint';
import security from 'eslint-plugin-security';
import eslintPluginImport from 'eslint-plugin-import';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['**/dist/**', '**/node_modules/**'],
  },
  ...tseslint.config({
    files: ['cli/src/**/*.ts', 'extension/src/**/*.ts', 'shared/src/**/*.ts'],
    rules: {
      'security/detect-object-injection': 'off',
      'import/no-unresolved': 'error',
    },
    plugins: {
      security,
      import: eslintPluginImport,
    },
  }),
  {
    files: ['cli/src/**/*.ts'],
    rules: {
      // CLI-specific overrides
    },
  },
  {
    files: ['extension/src/**/*.ts'],
    rules: {
      // Extension-specific overrides
    },
  },
  {
    files: ['shared/src/**/*.ts'],
    rules: {
      // Shared-specific overrides
    },
  },
];