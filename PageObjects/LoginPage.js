const {test, expect} = require('@playwright/test');

class LoginPage {

    constructor(page){
        this.page = page;
        this.signButton = page.locator("#login");
        this.password = page.locator("#userPassword");
        this.email = page.locator("#userEmail");
    }
    
    async goTo(){
      await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(email,password){
        await this.email.type(email);
        await this.password.type(password);
        await this.signButton.click();
        await this.page.waitForLoadState('networkidle');
    }

}

module.exports = {LoginPage};