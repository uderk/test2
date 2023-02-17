const { test, expect } = require("@playwright/test");

test("@Web First playwright test", async ({browser}) =>
{
   //if additional information necessary like cookies or proxy or different browser
    //define page and context 
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

   //define elements 
   const userName = page.locator("input#username");
   const password = page.locator("input#password");
   const signInButton = page.locator("input#signInBtn");
   const errorMsg = page.locator("[style*='block']");
   const cardTitles = page.locator(".card-body a");
   //actions and assertions 

   await userName.type("veni");
   await password.type("123456");
   await signInButton.click();

   await expect(errorMsg).toContainText("Incorrect");

   await userName.fill("");
   await userName.fill("rahulshettyacademy");
   await password.fill("learning");
   //await for non service based applications 
   await Promise.all(
    [
        page.waitForNavigation(),
        signInButton.click()
    ]
   );

   //access web store
   //await page.locator(".card-body a").first().textContent(); //if multiple elements
   // same as 
   await cardTitles.nth(1).textContent();
   const allTitles = await cardTitles.allTextContents();
   //await page.waitForLoadState("networkidle"); // wait until page is stable (no API calls currently) -  this works for service based architecture
   //await expect(cardTitles).toContainText("Samsung");
});
