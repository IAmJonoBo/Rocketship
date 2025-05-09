module.exports = [
  { ignores: ['dist/**', '**/*.js', '**/*.d.ts'] },
  {
    files: ['src/**/*.ts','src/**/*.mts'],
    languageOptions: {
      parserOptions: { project: './tsconfig.json', tsconfigRootDir: __dirname }
    }
  },
];