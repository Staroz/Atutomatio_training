const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        this.page = page;
        this.email = page.locator('[id="user"]');
        this.password = page.locator('#password');
        this.enterEm = page.locator('[id="login"]');
        this.enterPw = page.locator('[id="login-submit"]');
    };
    async gotoPage() {
    await this.page.goto('login');
    };
    async enterEmail(email) {
        await this.email.fill(email);
        await this.enterEm.click();
    };
    async enterPassword(password) {
        await this.password.fill(password);
        await this.enterPw.click();
        await expect(this.page).toHaveURL('');
    };
};
