exports.LoginPage = class LoginPage {

    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('[id="user"]');
        this.passwordInput = page.locator('#password');
        this.sendEmail = page.locator('[id="login"]');
        this.sendPassword = page.locator('[id="login-submit"]');
    };
    
    async logIn(email, password) {
        await this.page.goto('login');
        await this.emailInput.fill(email);
        await this.sendEmail.click();
        await this.passwordInput.fill(password);
        await this.sendPassword.click();
    };
    // async gotoPage() {
    //     await this.page.goto('login');
    // };
    // async enterEmail(email) {
    //     await this.emailInput.fill(email);
    //     await this.sendEmail.click();
    // };
    // async enterPassword(password) {
    //     await this.passwordInput.fill(password);
    //     await this.sendPassword.click();
    // };
};
