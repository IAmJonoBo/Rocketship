const tsParser = require('@typescript-eslint/parser');

module.exports = [
  // Ignore build artifacts and JS/d.ts files
  {
    ignores: ['dist/**', '**/*.js', '**/*.d.ts'],
  },
  // Lint only TS source files with TypeScript parser and correct tsconfig
  {
    files: ['src/**/*.ts', 'src/**/*.mts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    }
  }
];