
exports.BoardsUi = class BoardsUi {

	/**
	 * @param {import('@playwright/test').Page} page
	 */
	constructor(page) {
		// general locators  
		this.page = page;
		this.loadPageOfBoards = page.goto('u/staroztesting/boards');
		this.confirmDeletedBoardTitle = page.locator('[data-testid="close-board-big-message"]');
		// create a board
		this.createBoardBtn = page.locator('[data-testid="create-board-tile"]');
		this.boardNameImput = page.getByTestId('create-board-title-input');
		this.createNewBoardBtn = page.getByTestId('create-board-submit-button');
		// update name of Board
		this.selectBoard = page.locator('[class="board-tile-details is-badged"]');
		this.currentBoardName = page.locator('[data-testid="board-name-display"]');
		this.updateBoardNameInput = page.locator('[data-testid="board-name-input"]');
		// delete a board
		this.menuIconBtn = page.locator('[class="frrHNIWnTojsww GDunJzzgFqQY_3 bxgKMAm3lq5BpA HAVwIqCeMHpVKh SEj5vUdI3VvxDc"]');
		this.menuMoreOptionsBtn = page.locator('[class="board-menu-navigation-item-link js-open-more"]');
		this.menuCloseBoardBtn = page.locator('[class="board-menu-navigation-item-link js-close-board"]');   
		this.boardCloseAlertBtn = page.locator('[class="js-confirm full nch-button nch-button--danger"]');   
		this.permanentlyDeleteBoardBtn= page.locator('[data-testid="close-board-delete-board-button"]'); 
		this.confirmDeleteBoardBtn= page.locator('[data-testid="close-board-delete-board-confirm-button"]'); 
	}
	async createBoard(boardName) {
		await this.createBoardBtn.click();
		await this.boardNameImput.fill(boardName);
		await this.createNewBoardBtn.click();
	};
	async updateBoardName(boardName, newBoardName) {
		await this.page.getByText(boardName).click();
		await this.currentBoardName.click();
		await this.updateBoardNameInput.fill(newBoardName);
		await this.updateBoardNameInput.press('Enter');
	};
	async deleteBoard(boardName) {
		await this.page.getByText(boardName).click();
		await this.menuIconBtn.click({force: true});
		await this.menuMoreOptionsBtn.click();
		await this.menuCloseBoardBtn.click({force: true});
		await this.boardCloseAlertBtn.click(); 
		await this.permanentlyDeleteBoardBtn.click();
		await this.confirmDeleteBoardBtn.click();
	};
};
