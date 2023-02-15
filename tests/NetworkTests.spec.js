const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('./utils/APiUtils.js');

//global varibles 
const loginPayLoad = {userEmail:"veni.zdravkov@gmail.com",userPassword:"123456Ve@"};
const orderPayLoad = {orders:[{country:"India",productOrderedId:"6262e95ae26b7e1a10e89bf0"}]};
const fakePayLoadOrders = {data:[], message: "No Orders"};


let response;

test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext,loginPayLoad);
   response =  await apiUtils.createOrder(orderPayLoad);

})


//create order is success
test('@API Place the order', async ({page})=>
{
    page.addInitScript(value => {

        window.localStorage.setItem('token',value);
    }, response.token );
 await page.goto("https://rahulshettyacademy.com/client/");
 page.pause();
 //route page - to moke up response 
 await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/63e559e5568c3e9fb111ebb8",
 async route=>
 { 
  const response =  await page.request.fetch(route.request());
   route.fulfill(
      {
        response,
        body : {"data":[],"message":"No Orders"},

      });
     //intercepting response - APi response->{ playwright fakeresponse}->browser->render data on front end
 });
 
 await page.pause();
 await page.locator("button[routerlink*='myorders']").click();
 //await page.pause();
 console.log(await page.locator(".mt-4").textContent());
 

});
