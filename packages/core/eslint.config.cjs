const tsParser = require('@typescript-eslint/parser');

module.exports = [
  // Ignore build artifacts, JS/definition files, and scripts
  { ignores: ['dist/**', '**/*.js', '**/*.d.ts', 'scripts/**/*.ts'] },
  {
    // Apply to TypeScript files
    files: ['src/**/*.ts', 'src/**/*.mts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      }
    }
  }
];