const { test, expect } = require("@playwright/test");
const {POManager} = require('../PageObjects/POManager')
const dataSet = JSON.parse(JSON.stringify(require("../tests/utils/placeOrderTestData.json")));

for(const data of dataSet){

 test(`Test client app - with POM ${data.product}`, async ({page})=>{
     //define context and page
     const poManager = new POManager(page);
     const loginPage = await poManager.getLoginPage();
     const dashboard = await poManager.getDashboardPage();
     const orderPage = await poManager.getOrderPage();
     const ordersHistoryPage = await poManager.getOrdersHistoryPage();
     //actions 
     await loginPage.goTo()
     await loginPage.validLogin(data.email,data.password);
     await dashboard.searchProductAndAddToChart(data.product);
     await dashboard.navigateToCart();
     await orderPage.CheckIfProductIsInChart(data.product); 
     await dashboard.fillOrderInformation();
     await dashboard.placeAnOrderAndCheckEmail(data.email);
     await dashboard.checkIfOrderIsSuccessful();
     const orderID = await dashboard.getOrderID();
     await dashboard.goToOrdersHistoryPage();
     await ordersHistoryPage.checkOrder(orderID);
 
 })
};
