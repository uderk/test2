const { test, expect, request } = require("@playwright/test");

//define global varibles 
let token;

const loginPayLoad = {userEmail: "veni.zdravkov@gmail.com", userPassword: "123456Ve@"};

test.beforeAll(async ()=>{
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
  {
    data:loginPayLoad
  })
expect(loginResponse.ok()).toBeTruthy();
const loginResponseJson = await loginResponse.json();
const token = loginResponseJson.token;
console.log(token);
});

test("More validation - chapter 7", async ({page}) =>
{

    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },token);

//if additional information necessary like cookies or proxy or different browser
    //define page and context 
    //const context = await browser.newContext();
    //const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");

    //login page elements 
    //const email = page.locator("#userEmail");
    //const password = page.locator("#userPassword");
    //const loginBtn = page.locator("#login");
    const allElements =page.locator("card-body b");
    //const product = "zara coat 3";
    
    //actions 
    //await email.type("veni.zdravkov@gmail.com"); //with fill() possible too
    //await password.type("123456Ve@");

    //await loginBtn.click();
    //wait for load
    //await page.waitForLoadState('networkidle');
    const products = await page.locator(".card-body");
    const titles = await page.locator("card-body b").allTextContents();
    const product = "zara coat 3";
    const numberOfElements = await products.count();
    //page.pause();
    console.log("Number Of ELEMENTS" + numberOfElements);
    for (let i = 0; i < numberOfElements; ++i){
         //console.log(allElements.nth(i).allTextContents());
         if(await products.nth(i).locator("b").textContent() === product){
            //add item to chart 
            
            await products.nth(i).locator("text= Add To Cart").click();
            console.log("ITEM ADDED")
            break;//if found the element not necessary to run further 
         }
    } 
   
   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").last().waitFor();
   
   const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
   await expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
   await page.locator("[placeholder='Select Country']").type("Ind",{delay:250});
   const dropDownCountry = page.locator(".ta-results");
   await dropDownCountry.waitFor();
   const options = await dropDownCountry.locator("button").count();
   console.log("OPTIONS " + options);
   for(let i = 0; i<options; ++i){
      let text = await dropDownCountry.locator("button").nth(i).textContent();
      if(text === " India"){
         await dropDownCountry.locator("button").nth(i).click();
         break;
      }
   }

let userEmail = "veni.zdravkov@gmail.com"
const placeOrderBtn = page.locator(".action__submit");
await expect(page.locator(".user__name [type='text']").nth(0)).toHaveText(userEmail);
await placeOrderBtn.click();
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderID.slice(3,-2));
const orderHistoryPage = page.locator("label[routerlink = '/dashboard/myorders']");
await orderHistoryPage.click();
await page.locator("th[scope='row']").last().waitFor();
const allOrders = await page.locator("th[scope='row']").count();
console.log("------------");
for(let i=0;i<allOrders; ++i){
   let text = await page.locator("//th[@scope='row']").nth(i).textContent();
   if(text.includes(orderID.slice(3,-3))){
      await page.locator("//th[@scope='row']").nth(i).locator("//parent::tr/td[5]/button").click();
   }
}

});