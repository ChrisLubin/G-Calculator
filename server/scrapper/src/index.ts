require("dotenv").config();
import fs from "fs/promises";
import { chromium, Page } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: false });

  const page = await browser.newPage();

  await page.goto("https://app.reonomy.com/!/search");

  await delay(1000);

  await signIn(page);

  await delay(1000);

  await setFilters(page);

  await searchLocation(page);

  await delay(4000);

  await getBuildingData(page);

  await browser.close();
})();

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function signIn(page: Page) {
  if (!process.env.EMAIL || !process.env.PASSWORD) {
    throw new Error("Email and password are required");
  }
  await page.click('[type="email"]');
  await page.keyboard.insertText(process.env.EMAIL);
  await page.click('[type="password"]');
  await page.keyboard.insertText(process.env.PASSWORD);
  await page.click(".auth0-label-submit");
}

async function setFilters(page: Page) {
  await page.click('[data-testid="Property Type"]');
  await page.locator("text=Shopping Centers & Stores").click();
  await page.locator("text=Restaurants").click();
  await page.locator("text=Commercial General").click();

  await page.locator("text=Apply").click();
}

async function searchLocation(page: Page) {
  await page.click('[id="location-search-input"]');
  await page.keyboard.insertText("Orlando, FL");

  await delay(1000);

  await page.keyboard.press("Enter");
}

async function getBuildingData(page: Page) {
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
}
