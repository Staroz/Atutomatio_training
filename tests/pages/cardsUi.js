const credentials = require('../../cypress/fixtures/credentials1.json');

exports.CardsUi = class CardsUi {
	/**
	 * @param {import('@playwright/test').Page} page
	 */
	constructor(page) {
		// general locators  
		this.page = page;
		this.loadPageOfBoards = page.goto(`u/${credentials.userName}/boards`);
        this.enterBoardBtn = page.locator('[class="board-tile-details-name"]');
        this.locatorList = page.locator('[class="list-header-name-assist js-list-name-assist"]');
        this.listBlockLocator = page.locator('[class="list js-list-content"]');
		// create cards
		this.addCardIconBtn = page.locator('[class="js-add-a-card"]');
        this.cardNameInput = page.locator('[class="list-card-composer-textarea js-card-title"]');
		this.cancelAddCardsBtn = page.locator('[class="icon-lg icon-close dark-hover js-cancel"]');
		// Drag and drop cards
		this.cardSelector = page.locator('[class="list-card-details js-card-details"]');
		this.listSelector = page.locator('[class="u-fancy-scrollbar js-no-higher-edits js-list-sortable ui-sortable"]');
    }

	async createCards(boardName, listName, cardsNameArray) {
        await this.enterBoardBtn.first().getByText(boardName).click();
        await this.listBlockLocator.filter({has: this.page.getByText(listName)})
                .getByText('Add a card').click();
		for (let index = 0; index < cardsNameArray.length; index++) {
            await this.cardNameInput.fill(cardsNameArray[index]);
            await this.cardNameInput.press('Enter');    
        }
		await this.cancelAddCardsBtn.click();
	};

	async moveCard( cardName, listName) {
        const listPosition = (listName)=>{
            let ans = 0;
            for (let index = 0; index < credentials.listNameArray.length; index++) {
                const element = credentials.listNameArray[index];
                if (listName == element) {
                    ans=index;
                };
            };
            return ans;
        };
        await this.cardSelector.getByText(cardName).dragTo(this.page.locator( '[class="list-cards u-fancy-scrollbar js-list-cards js-sortable ui-sortable"]').nth(listPosition(listName)));
	};
};

