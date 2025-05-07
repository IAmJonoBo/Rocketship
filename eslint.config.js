import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import { globalIgnores } from 'eslint/config';

export default [
  // 1. Global ignores for compiled output and dependencies
  globalIgnores(['**/dist/**', '**/node_modules/**']),

  // 2. Core JavaScript rules
  js.configs.recommended,

  // 3. Shared package TypeScript linting
  {
    files: ['shared/**/*.ts', 'shared/**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./shared/tsconfig.json'],
        tsconfigRootDir: process.cwd(),
        ecmaVersion: 2020,
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'no-console': ['error', { allow: ['warn', 'error', 'log'] }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    },
    settings: {
      'import/resolver': {
        typescript: {}
      }
    }
  },

  // 4. Extension package TypeScript linting
  {
    files: ['extension/**/*.ts', 'extension/**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./extension/tsconfig.json'],
        tsconfigRootDir: process.cwd(),
        ecmaVersion: 2020,
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'no-console': ['error', { allow: ['warn', 'error', 'log'] }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    },
    settings: {
      'import/resolver': {
        typescript: {}
      }
    }
  },

  // 5. CLI package TypeScript linting
  {
    files: ['cli/**/*.ts', 'cli/**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./cli/tsconfig.json'],
        tsconfigRootDir: process.cwd(),
        ecmaVersion: 2020,
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'no-console': ['error', { allow: ['warn', 'error', 'log'] }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    },
    settings: {
      'import/resolver': {
        typescript: {}
      }
    }
  },

  // 6. Test files override
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    languageOptions: {
      globals: {
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        expect: 'readonly'
      }
    },
    rules: {
      'no-console': 'off'
    }
  },

  // 7. CLI files override
  {
    files: ['cli/**/*.ts'],
    languageOptions: {
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
        console: 'readonly'
      }
    },
    rules: {
      'no-console': 'off'
    }
  }
];