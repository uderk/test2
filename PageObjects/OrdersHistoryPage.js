const {test, expect} = require('@playwright/test');

class OrdersHistoryPage{

  constructor(page){
    this.tableRows = page.locator("th[scope='row']");
  }

  async checkOrder(orderID){
    const allOrders = this.tableRows.count();
    for(let i=0;i<allOrders; ++i){
           let text = await page.locator("//th[@scope='row']").nth(i).textContent();
           if(text.includes(orderID.slice(3,-3))){
              await this.tableRows.nth(i).locator("//parent::tr/td[5]/button").click();
           }
        }
    }
}

module.exports = {OrdersHistoryPage};