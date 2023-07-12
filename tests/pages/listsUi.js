const credentials = require('../../cypress/fixtures/credentials1.json');

exports.ListsUi = class ListsUi {

	/**
	 * @param {import('@playwright/test').Page} page
	 */
	constructor(page) {
		// general locators  
		this.page = page;
		this.loadPageOfBoards = page.goto(`u/${credentials.userName}/boards`);
        this.enterBoardBtn = page.locator('.board-tile-details-name');
        this.locatorList = page.locator('.list.js-list-content');
		this.listBlockLocator = page.locator('#board');
		// create a lists
		this.addListBtn = page.locator('.placeholder');
        this.nameListInput = page.locator('.list-name-input');
		this.cancelEditListBtn = page.locator('.icon-lg.icon-close.dark-hover.js-cancel-edit');
		// Delete a list
		this.optionsListBtn = page.locator('[aria-label="List actions"]');
		this.archiveListBtn = page.locator('.js-close-list');
		
	}

	async createLists(boardName, listNameArray) {
        await this.enterBoardBtn.getByText(boardName).first().click();
        await this.addListBtn.click();
		for (let index = 0; index < listNameArray.length; index++) {
            await this.nameListInput.fill(listNameArray[index]);
            await this.nameListInput.press('Enter');    
        }
		await this.cancelEditListBtn.click();
	};

	async deleteLists(boardName) {
        await this.enterBoardBtn.getByText(boardName).first().click();
        await this.optionsListBtn.first().waitFor();
        let listsNumbers = await this.optionsListBtn.count();
        for (let index = 0; index < listsNumbers; index++) {
                await this.optionsListBtn.first().click();
                await this.archiveListBtn.click();
            };
	};

	async archivedList(boardName, listName) {
        await this.enterBoardBtn.getByText(boardName).first().click();
        await this.locatorList.filter({has: this.page.getByText(listName)}).getByRole('link', {name: "List actions"}).click();
        await this.archiveListBtn.click();
	};
};
