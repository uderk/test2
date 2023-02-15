const {LoginPage} = require('../PageObjects/LoginPage');
const {DashboardPage} = require('../PageObjects/DashboardPage');
const {OrderPage} = require('../PageObjects/OrderPage');
const {OrdersHistoryPage} = require('../PageObjects/OrdersHistoryPage')

class POManager{
    
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboard = new DashboardPage(page);
        this.orderPage = new OrderPage(page);
        this.ordersHistoryPage = new OrdersHistoryPage(page);
    }
   
    async getLoginPage(){
        return this.loginPage;
    }

    async getDashboardPage(){
        return this.dashboard;
    }

    async getOrderPage(){
        return this.orderPage;
    }

    async getOrdersHistoryPage(){
        return this.ordersHistoryPage;
    }
}

module.exports = {POManager};