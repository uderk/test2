const {test, expect} = require('@playwright/test');

class OrderPage {
   
    //constructor 
    constructor(page){
        this.page = page;
    }

    async CheckIfProductIsInChart(product){
        const bool = await this.page.locator(`h3:has-text('${product}')`).isVisible();
        await expect(bool).toBeTruthy();
    }
}


module.exports = {OrderPage};