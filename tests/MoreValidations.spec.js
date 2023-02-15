const { test, expect } = require("@playwright/test");

test("More validation - chapter 7", async ({browser}) =>
{
// define context and browser 
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://www.rahulshettyacademy.com/AutomationPractice/");
//await page.goto("https://google.com");
//await page.goBack(); //goForwatd() possible too
await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();

await page.on('dialog',dialog =>dialog.accept());
await page.locator("#confirmbtn").click();
//await page.pause();
await page.locator("#mousehover").hover();
//await page.pause();
await page.locator(".mouse-hover-content a").nth(0).click();

//iframes 
const frPage = page.frameLocator("#courses-iframe");
await frPage.locator("li a[href*='lifetime-access']:visible").click();//:visible select only visible element 
const textCheck = await frPage.locator(".text h2").textContent();
console.log(textCheck.split(" ")[1]);
})