module.exports = {
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['dist/**', '*.js', '*.d.ts'],
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.mts'],
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  ],
};