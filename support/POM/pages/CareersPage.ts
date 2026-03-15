// support/POM/pages/CareersPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { Header } from '../components/Header';

export class CareersPage {
  readonly page: Page;
  readonly header: Header;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page); // include header component
  }

  /**
   * Locator for all job links inside the jobs table
   * - Uses :visible to avoid duplicates from mobile/desktop links
   * - Targets the first cell in each row, where the job title lives
   */
  get jobRows(): Locator {
    return this.page.locator('main [role="rowgroup"] [role="row"] div.rt-td:first-child a:visible');
  }

  /**
   * Navigate to the careers page
   */
  async goto() {
    await this.page.goto('https://careers.osapiens.com/');
    // Accept cookies if the popup appears
    await this.header.acceptCookies();
    // Wait for the job section heading to ensure page loaded
    await expect(this.page.locator('text=Current Opportunities')).toBeVisible({ timeout: 10000 });
  }

  /**
   * Get number of jobs
   */
  async getJobCount(): Promise<number> {
    // Wait for at least one job link to be visible
    await expect(this.jobRows.first()).toBeVisible({ timeout: 10000 });
    return this.jobRows.count();
  }

  /**
   * Get all job titles
   */
  async getJobTitles(): Promise<string[]> {
    await expect(this.jobRows.first()).toBeVisible({ timeout: 10000 });
    return this.jobRows.allTextContents();
  }

  /**
   * Check if any job title contains a keyword
   * @param keyword string to search in job titles
   */
  async hasJobWithKeyword(keyword: string): Promise<boolean> {
    const titles = await this.getJobTitles();
    return titles.some(title => title.toLowerCase().includes(keyword.toLowerCase()));
  }

  /**
   * Optionally, click on a job by keyword
   * @param keyword string to match the job title
   */
  async openJobByKeyword(keyword: string) {
    const job = this.jobRows.filter({ hasText: keyword });
    await expect(job.first()).toBeVisible({ timeout: 10000 });
    await job.first().click();
  }
}