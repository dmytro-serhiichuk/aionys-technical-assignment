import { defineConfig } from '@playwright/test';

const baseURL = process.env.E2E_BASE_URL ?? "http://localhost:3000";
const apiURL = process.env.E2E_API_URL ?? "http://localhost:5000";

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL,
    locale: "en",
  },
  webServer: {
    command: "docker compose -f ../compose.dev.yml -f ../compose.yml up --build",
    url: `${apiURL}/notes`,
    reuseExistingServer: true,
    timeout: 180_000
  },
});
