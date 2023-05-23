const { expect } = require('@playwright/test');

exports.Commands = class Commands {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
      this.page = page;
  }

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
};
