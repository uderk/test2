const {test, expect} = require('@playwright/test');

class DashboardPage{

    //constructor
    constructor(page)
    {
       this.page=page;
       this.products = page.locator(".card-body");
       this.productsText = page.locator(".card-body b");
       this.cart = page.locator("[routerlink*='cart']");
       this.checkOrder = page.locator("div li").last();
       this.checkOutBtn = page.locator("text=Checkout");
       this.CountryDropDown = page.locator("[placeholder='Select Country']");
       this.selectCountryResults = page.locator(".ta-results");
       this.placeOrderBtn = page.locator(".action__submit");
       this.orderEmail = page.locator(".user__name [type='text']").nth(0);
       this.textThankYou = page.locator(".hero-primary");
       this.orderID = page.locator(".em-spacer-1 .ng-star-inserted");
       this.myOrdersLink = page.locator("label[routerlink = '/dashboard/myorders']");
    }

    //methods

    async searchProductAndAddToChart(productName){
     const titles = await this.productsText.allTextContents();
     const numberOfElements = await this.products.count();
 
     for (let i = 0; i < numberOfElements; ++i){
          if(await this.products.nth(i).locator("b").textContent() === productName){
             await this.products.nth(i).locator("text= Add To Cart").click();
             break;
          }
     } 
   }
    
    async navigateToCart(){
     await this.cart.click();
     await this.checkOrder.waitFor();
    }

    async fillOrderInformation(){
     await this.checkOutBtn.click();
     await this.CountryDropDown.type("ind",{delay:250});
     await this.selectCountryResults.waitFor();
     await this.page.locator(".ta-results").waitFor();
     this.page.pause();
     const options = await this.page.locator(".ta-results").locator("button").count();
     for(let i = 0; i<options; ++i){
      let text = await this.page.locator(".ta-results").locator("button").nth(i).textContent();
      if(text === " India"){
         await this.selectCountryResults.locator("button").nth(i).click();
         break;
      }
    }  
   }

   async placeAnOrderAndCheckEmail(email){
    await expect(this.page.locator(".user__name [type='text']").nth(0)).toHaveText(email)
    await this.placeOrderBtn.click();
   }
   
   async checkIfOrderIsSuccessful(){
     await expect(this.textThankYou).toHaveText(" Thankyou for the order. ")
   }

   async getOrderID(){
      const orderIdText = this.orderID.textContent();
      return orderIdText;
   }

   async goToOrdersHistoryPage(){
      await this.myOrdersLink.click();
   }

}

module.exports = {DashboardPage};