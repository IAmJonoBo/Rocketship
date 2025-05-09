import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['extension/src/**/*.test.{ts,mts}', 'extension/src/**/*.spec.{ts,mts}'],
    exclude: ['**/dist/**'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: 'coverage',
    },
  },
});