import fs from "fs/promises";
import { chromium } from "playwright";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  const browser = await chromium.launch({ headless: false });

  const page = await browser.newPage();

  await page.goto("https://app.reonomy.com/!/search");

  await delay(100);

  await page.click('[type="email"]');
  await page.keyboard.insertText("ernest@earnest3d.com");
  await page.click('[type="password"]');
  await page.keyboard.insertText("ernest5650");
  await page.click(".auth0-label-submit");

  await delay(1000);

  await page.click('[data-testid="Property Type"]');
  await page.locator("text=Shopping Centers & Stores").click();
  await page.locator("text=Restaurants").click();
  await page.locator("text=Commercial General").click();

  await page.locator("text=Apply").click();

  await page.click('[id="location-search-input"]');
  await page.keyboard.insertText("Orlando, FL");

  await delay(1000);

  await page.keyboard.press("Enter");

  await delay(4000);

  const buildings = page
    .locator("#summary-cards-list-container")
    .locator(">div");

  const buildingsCount = await page
    .locator("#summary-cards-list-container")
    .locator("div")
    .count();

  for (let i = 1; i < buildingsCount; i++) {
    const building = buildings.locator(`>div:nth-child(${i})`);
    const text = await building.textContent();
    if (text) await fs.appendFile("./buildings.txt", text);
  }

  await browser.close();
})();
