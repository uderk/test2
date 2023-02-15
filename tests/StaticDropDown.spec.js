const { test, expect } = require("@playwright/test");

test("First playwright test", async ({browser}) =>
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
   const dropDown = page.locator("select.form-control");
   const rdBtnUser = page.locator(".checkmark").nth(1);
   const okMsg = page.locator("#okayBtn");
   const terms = page.locator("input[name='terms']");
   const linkAccessMaterials = page.locator("[href*='documents-request']");
   //actions 

   await userName.fill("rahulshettyacademy");
   await password.fill("learning");
   await dropDown.selectOption('teach');
   //await page.pause(); - similar to a break point 
   await rdBtnUser.click();
   
   await okMsg.click();
   //assertion
   await expect(rdBtnUser).toBeChecked();
   await terms.click();
   await expect(terms).toBeChecked();
   await terms.uncheck();
   expect(await terms.isChecked()).toBeFalsy();
   await expect(linkAccessMaterials).toHaveAttribute("class","blinkingText");


});

test("Child windows handling", async ({browser})=>
{
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   //define page properties 
   const linkAccessMaterials = page.locator("[href*='documents-request']");

   //actions 
   const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      linkAccessMaterials.click() // opening new page
   ]);

   const text = await newPage.locator(".red").textContent();
   console.log(text)
   

});