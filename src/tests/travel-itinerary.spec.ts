import { test, expect } from "@playwright/test";
import { translations } from "../translations/translations";

test.beforeEach(async ({ page }) => {
  if (!process.env.OPENAI_API_KEY || !process.env.UNSPLASH_ACCESS_KEY) {
    throw new Error("Brakujące klucze API w zmiennych środowiskowych");
  }

  await page.goto("https://travelitineraryplanner.netlify.app/");

  await page.locator('input[id="destination"]').waitFor({ state: "visible" });
  await page.locator('input[id="destination"]').fill("Paris");
  await page.locator('input[id="days"]').fill("5");
  await page.locator('textarea[id="activities"]').fill("Museum");
  await page.locator('button[aria-label="Settings"]').click();

  await page
    .locator('input[aria-label="OpenAi Key Input"]')
    .waitFor({ state: "visible" });
  await page
    .locator('input[aria-label="OpenAi Key Input"]')
    .fill(process.env.OPENAI_API_KEY);
  await page
    .locator('input[aria-label="Unsplash Access Key Input"]')
    .fill(process.env.UNSPLASH_ACCESS_KEY);
  await page.locator('button[aria-label="Save Settings"]').click();
});

test("should load the app and switch languages correctly", async ({ page }) => {
  const heading = page.locator("h1");
  await expect(heading).toHaveText(translations.en.title);

  const polishFlag = page.locator('button[aria-label="Polski"]');
  await polishFlag.waitFor({ state: "visible" });
  await polishFlag.click();

  await expect(heading).toHaveText(translations.pl.title);

  const englishFlag = page.locator('button[aria-label="English"]');
  await englishFlag.waitFor({ state: "visible" });
  await englishFlag.click();

  await expect(heading).toHaveText(translations.en.title);
});

test("should display validation errors for invalid input in both languages", async ({
  page,
}) => {
  const destinationInput = page.locator('input[name="destination"]');
  const daysInput = page.locator('input[name="days"]');
  const activitiesInput = page.locator('textarea[name="activities"]');
  const submitButton = page.locator('button[type="submit"]');

  //PL TEST
  await page.locator('button[aria-label="Polski"]').click();
  await destinationInput.fill("");
  await submitButton.click();
  await expect(
    page.locator(`text=${translations.pl.destinationError}`)
  ).toBeVisible();

  await daysInput.fill("-1");
  await submitButton.click();
  await expect(page.locator(`text=${translations.pl.daysError}`)).toBeVisible();

  await activitiesInput.fill("");
  await submitButton.click();
  await expect(
    page.locator(`text=${translations.pl.activitiesError}`)
  ).toBeVisible();

  //ENG TEST
  await page.locator('button[aria-label="English"]').click();
  await destinationInput.fill("");
  await submitButton.click();
  await expect(
    page.locator(`text=${translations.en.destinationError}`)
  ).toBeVisible();

  await daysInput.fill("-1");
  await submitButton.click();
  await expect(page.locator(`text=${translations.en.daysError}`)).toBeVisible();

  await activitiesInput.fill("");
  await submitButton.click();
  await expect(
    page.locator(`text=${translations.en.activitiesError}`)
  ).toBeVisible();
});

test("should generate itinerary", async ({ page }) => {
  await page.locator('button[type="submit"]').click();
  await page
    .locator('h2[aria-label="Your itinerary"]')
    .waitFor({ state: "visible" });
  const h2 = page.locator('h2[aria-label="Your itinerary"]');
  await expect(h2).toHaveText(translations.en.itineraryTitle);
});

test("should export itinerary to PDF", async ({ page }) => {
  await page.locator('button[type="submit"]').click();
  await page
    .locator('button[aria-label="Export to PDF"]')
    .waitFor({ state: "visible" });
  const exportButton = page.locator('button[aria-label="Export to PDF"]');
  await exportButton.click();
});

test("should toggle between dark and light mode", async ({ page }) => {
  const darkModeToggle = page.locator('button[aria-label="Toggle Dark Mode"]');
  const html = page.locator("html");

  await expect(html).not.toHaveClass("dark");
  await darkModeToggle.click();
  await expect(html).toHaveClass("dark");
  await darkModeToggle.click();
  await expect(html).not.toHaveClass("dark");
});
