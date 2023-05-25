exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        this.page = page;
        this.email = page.locator('[id="user"]');
        this.password = page.locator('#password');
        this.sendEmail = page.locator('[id="login"]');
        this.sendPassword = page.locator('[id="login-submit"]');
    };
    async gotoPage() {
    await this.page.goto('login');
    };
    async enterEmail(email) {
        await this.email.fill(email);
        await this.sendEmail.click();
    };
    async enterPassword(password) {
        await this.password.fill(password);
        await this.sendPassword.click();
    };
};
