const credentials = require('../../cypress/fixtures/credentials1.json');

exports.ListsUi = class ListsUi {

	/**
	 * @param {import('@playwright/test').Page} page
	 */
	constructor(page) {
		// general locators  
		this.page = page;
		this.loadPageOfBoards = page.goto(`u/${credentials.userName}/boards`);
        this.enterBoardBtn = page.locator('[class="board-tile-details-name"]');
        this.locatorList = page.locator('[class="list-header-name-assist js-list-name-assist"]');
		// create a lists
		this.addListBtn = page.locator('[class="placeholder"]');
        this.nameListInput = page.locator('[class="list-name-input"]');
		this.cancelEditListBtn = page.locator('[class="icon-lg icon-close dark-hover js-cancel-edit"]');

		// Delete a list
		this.optionsListBtn = page.locator('[class="list-header-extras-menu js-open-list-menu icon-sm icon-overflow-menu-horizontal"]');
		this.archiveListBtn = page.locator('[class="js-close-list"]');
	}

	async createLists(boardName, listNameArray) {
        await this.enterBoardBtn.first().getByText(boardName).click();
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
};
