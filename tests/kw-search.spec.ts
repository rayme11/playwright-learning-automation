import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://kw.com/');
  await page.getByRole('textbox', { name: 'City, Neighborhood, Address,' }).click();
  await page.getByRole('textbox', { name: 'City, Neighborhood, Address,' }).fill('austin');
  await page.getByText('Austin, TX, USA', { exact: true }).click();
  await page.goto('https://kw.com/search/sale/Austin-TX-USA/929288?q=Austin%2C+TX%2C+USA&viewport=30.60196343072092%2C-97.292110675%2C29.990125873260578%2C-98.171016925');
  await expect(page.locator('.gm-style > div > div:nth-child(2)')).toBeVisible();
  await expect(page.locator('flutter:Text("Properties for Sale")')).toBeVisible();
  await expect(page.locator('flutter:BySemanticsLabel("Properties for Sale")')).toBeVisible();});