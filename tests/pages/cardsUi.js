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
        // Add description in a card.
        this.shadowTextBtn = page.locator('[class="description-fake-text-area js-description-fake-text-area hide-on-edit js-edit-desc js-hide-with-draft"]')
        this.descriptionTextInput = page.locator('[id="ak-editor-textarea"]');
		this.descriptionTextSaveBtn = page.locator('[class="nch-button nch-button--primary confirm mod-submit-edit js-save-edit"]');
        // Selector for add properties in a card
        this.addPropertiesBtn = page.locator('[class="js-sidebar-action-text"]');
        // Add member in card.
        this.boardMemberBtn = page.locator('[class="full-name"]');
        this.closeMemberWindowBtn = page.locator('[class="pop-over-header-close-btn icon-sm icon-close"]');
        this.membersInCardIcon = page.locator('[class="member js-member-on-card-menu"]');
        // Add Label in card.
        
        this.labelColorBtn = page.locator('[data-testid="card-label"]');
        this.closeLabelWindowBtn = page.locator('[data-testid="popover-close"]');
        // Add CheckList
        this.checklistNameInput = page.locator('[id="id-checklist"]');
        this.checklistNameList = page.locator('[class="editable non-empty checklist-title js-checklist-title"]');
        // Add cover in a card.
        this.coverClassBtn = page.locator('[class="k5qq0MRUdPmpWq"]');
        this.closeCoverWindowBtn = page.locator('[class="pop-over-header-close-btn icon-sm icon-close"]');
        this.coverInterface = page.locator('[class="window-cover js-card-cover-box js-stickers-area is-covered"]');
        
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

    async addDescriptionInCard(cardName, descriptionText) {
        await this.cardSelector.getByText(cardName).click();
        await this.page.waitForTimeout(5000);
        const descriptionInput = await this.page.isVisible('[data-testid="placeholder-test-id"]');
        
            if (descriptionInput) {
                console.log('YES', descriptionInput);
                await this.descriptionTextInput.fill(descriptionText);
                await this.descriptionTextSaveBtn.click();
            } else {
                console.log('NO');
                await this.shadowTextBtn.click();
                await this.descriptionTextInput.fill(descriptionText);
                await this.descriptionTextSaveBtn.click();
            }
	};
    async addMember(cardName, memberName) {
        await this.cardSelector.getByText(cardName).click();
        await this.addPropertiesBtn.getByText('Member').click();
        await this.boardMemberBtn.getByText(memberName).click();
        await this.closeMemberWindowBtn.click();
	};

    async addLabel(cardName, labelColor) {
        await this.cardSelector.getByText(cardName).click();
        await this.addPropertiesBtn.getByText('Labels').click();
        await this.labelColorBtn.and(this.page.locator(`[data-color="${labelColor}"]`)).click();
        await this.closeLabelWindowBtn.click();
    };

    async addChecklists(cardName, checklistName) {
        await this.cardSelector.getByText(cardName).click();
        await this.addPropertiesBtn.getByText('Checklist').click();
        await this.checklistNameInput.type(checklistName);
        await this.checklistNameInput.press('Enter');
    };

    async addCovers(cardName, coverImageNumber) {
        await this.cardSelector.getByText(cardName).click();
        await this.addPropertiesBtn.getByText('Cover').click();
        await this.coverClassBtn.nth(coverImageNumber).click();
        await this.closeCoverWindowBtn.click();
    };
}

