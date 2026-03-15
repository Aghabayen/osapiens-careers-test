import { test, expect } from '@playwright/test';
import { CareersPage } from '../support/POM/pages/CareersPage';

test('Check open jobs on Osapiens careers page', async ({ page }) => {
  const careersPage = new CareersPage(page);

  // Navigate to careers page and accept cookies
  await careersPage.goto();

  // Count the number of open jobs
  const jobCount = await careersPage.getJobCount();
  console.log(`Number of open jobs: ${jobCount}`);

  // Ensure there is at least one job
  expect(jobCount).toBeGreaterThan(0);

  // Check if any job title contains "Quality"
  const hasQuality = await careersPage.hasJobWithKeyword('Quality');
  expect(hasQuality).toBeTruthy();

  // 💡 Improvements:
  // - Add pagination handling if multiple pages of jobs exist.
  // - Create reusable components for footer, filters, or modals in the components folder.
  // - Use more specific selectors in page objects if the site structure changes.
  // - Test is already running on Chrome; enabling Firefox or WebKit in playwright.config.ts is simple if needed.
  // - Integrate this test into a CI/CD pipeline (e.g., GitHub Actions) for continuous testing.
});

