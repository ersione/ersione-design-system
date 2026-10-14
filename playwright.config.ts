import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser', workers: 1, timeout: 30000,
  use: { baseURL: 'http://127.0.0.1:8768', browserName: 'chromium' },
  webServer: { command: 'node scripts/serve-playground.mjs', url: 'http://127.0.0.1:8768/examples/react/', reuseExistingServer: false },
});
