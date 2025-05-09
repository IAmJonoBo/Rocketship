module.exports = [
  { ignores: ['dist/**', '**/*.js', '**/*.d.ts'] },
  {
    files: ['src/**/*.ts','src/**/*.mts'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      }
    }
  },
];