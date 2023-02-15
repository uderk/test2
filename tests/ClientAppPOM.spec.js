const { test, expect } = require("@playwright/test");
//const {LoginPage} = require('../PageObjects/LoginPage');
//const {DashboardPage} = require('../PageObjects/DashboardPage');
//const {OrderPage} = require('../PageObjects/OrderPage');
//const {OrdersHistoryPage} = require('../PageObjects/OrdersHistoryPage')
const {POManager} = require('../PageObjects/POManager')

test("Test client app - with POM", async ({page})=>{
    //define context and page
    const poManager = new POManager(page);
   // const loginPage = new LoginPage(page);
   // const dashboard = new DashboardPage(page);
   // const orderPage = new OrderPage(page);
   // const ordersHistoryPage = new OrdersHistoryPage(page);
    //await loginPage.goTo();
    const loginPage = await poManager.getLoginPage();
    const dashboard = await poManager.getDashboardPage();
    const orderPage = await poManager.getOrderPage();
    const ordersHistoryPage = await poManager.getOrdersHistoryPage();
    //define consts used in scripts 

    const email = "veni.zdravkov@gmail.com";
    const password = "123456Ve@";
    const product = "zara coat 3"
//   //actions
//   //login
    await loginPage.goTo()
    await loginPage.validLogin(email,password);

    await dashboard.searchProductAndAddToChart(product);
    await dashboard.navigateToCart();
    await orderPage.CheckIfProductIsInChart(product); 
    await dashboard.fillOrderInformation();
    await dashboard.placeAnOrderAndCheckEmail(email);
    await dashboard.checkIfOrderIsSuccessful();
    const orderID = await dashboard.getOrderID();
    await dashboard.goToOrdersHistoryPage();
    await ordersHistoryPage.checkOrder(orderID);
    await page.pause();

});
