// SPDX-License-Identifier: GPL-3.0-only
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    environment: 'node',
    include: ['apps/backend/src/**/*.test.ts'],
    passWithNoTests: false,
    coverage: {
      provider: 'v8',
      include: ['apps/backend/src/**/*.ts'],
      exclude: ['**/*.test.ts'],
      reportsDirectory: 'coverage/backend',
      reporter: ['text', 'json-summary', 'lcov'],
      thresholds: {
        lines: 100,
        statements: 100,
        functions: 100,
        branches: 100,
      },
    },
  },
});
