const { expect } = require('@playwright/test');
const axios = require('axios');

let boardId;

exports.Commands = class Commands {

  /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        this.page = page;
        this.email = page.getByPlaceholder('Enter email');
        this.password = page.getByPlaceholder('Enter password');
    }

  async loginTrello(email, pw) {
    
    await this.page.goto('');
    await this.page.getByTestId('bignav').getByRole('link', { name: 'Log in' }).click();
    await this.email.click();
    await this.email.fill(email);
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await this.password.fill(pw);
    await this.page.getByRole('button', { name: 'Log in' }).click();
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.click('#login-submit')
        ]);
    await expect(this.page).toHaveURL('');
  };

  async deleteBoard(boardName) {
    await this.page.locator('[class="board-tile-details is-badged"]').click();
    await this.page.locator('[class="frrHNIWnTojsww GDunJzzgFqQY_3 bxgKMAm3lq5BpA HAVwIqCeMHpVKh SEj5vUdI3VvxDc"]').click({force: true});
    await this.page.locator('[class="board-menu-navigation-item-link js-open-more"]').click();
    await this.page.locator('[class="board-menu-navigation-item-link js-close-board"]').click({force: true});
    await this.page.locator('[class="js-confirm full nch-button nch-button--danger"]').click(); 
    await this.page.locator('[data-testid="close-board-delete-board-button"]').click();
    await this.page.locator('[data-testid="close-board-delete-board-confirm-button"]').click();
    await expect(this.page.locator('[data-testid="close-board-big-message"]')).toContainText(`${boardName} is closed.`);

  };

  async createBoard(boardName) {
    await this.page.locator('[data-testid="create-board-tile"]').click();
    await this.page.getByTestId('create-board-title-input').click();
    await this.page.getByTestId('create-board-title-input').fill(boardName);
    await this.page.getByTestId('create-board-submit-button').click();
    await expect(this.page.getByRole('link', {name: boardName})).toBeVisible();
  };

  async updateBoard(newBoardName) {

    await this.page.locator('[class="board-tile-details is-badged"]').click();
    await this.page.locator('[data-testid="board-name-display"]').click();
    await this.page.locator('[data-testid="board-name-input"]').fill(newBoardName);
    await this.page.locator('[data-testid="board-name-input"]').press('Enter');
    await expect(this.page.locator('[data-testid="board-name-display"]')).toContainText(newBoardName);
  };

  async getId( boardName, key, token) {
    const responseId = await axios.get(`https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`);
    expect(responseId.status).toBe(200);
    let arr = responseId.data;
    let ans = "";
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (element.name === boardName) {
        ans = element.id;
        break;
      } else {
        ans = "ERROR, THIS BOARD NAME DOESN'T EXIT";
      }
    }
    boardId = ans;
  };

  async createBoardApi(boardName, key, token) {
    const response = await axios.post(`https://api.trello.com/1/boards/?name=${boardName}&key=${key}&token=${token}`);
    expect(response.status).toBe(200);
    boardId = response.data.id;
  };

  async deleteBoardApi( key, token) {
    const response = await axios.delete(`https://api.trello.com/1/boards/${boardId}?key=${key}&token=${token}`);
    expect(response.status).toBe(200);
  };
};
