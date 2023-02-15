const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('./utils/APiUtils.js');
const loginPayLoad = {userEmail:"venko.zdravkov@gmail.com",userPassword:"123456Ve@"};
const orderPayLoad = {orders:[{country:"India",productOrderedId:"6262e95ae26b7e1a10e89bf0"}]};
const fakePayLoadOrders = {data:[],message:"No Orders"};

let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext,loginPayLoad);
   response =  await apiUtils.createOrder(orderPayLoad);

})


//create order is success
test('Place the order', async ({page})=>
{
    page.addInitScript(value => {

        window.localStorage.setItem('token',value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client/");
await page.pause();
await page.route("https://rahulshettyacademy.com/client/dashboard/myorders",
route=> route.continue({url: 'goole.com'})
)
await page.locator("button[routerlink*='myorders']").click();


await page.locator("button:has-text('View')").first().click();

await page.pause();
});
