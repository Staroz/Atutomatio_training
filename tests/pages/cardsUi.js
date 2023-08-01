const credentials = require('../../cypress/fixtures/credentials1.json');

exports.CardsUi = class CardsUi {
	/**
	 * @param {import('@playwright/test').Page} page
	 */
	constructor(page) {
		// general locators  
		this.page = page;
		this.loadPageOfBoards = page.goto(`u/${credentials.userName}/boards`);
        this.enterBoardBtn = page.locator('.board-tile-details-name');
        this.locatorList = page.locator('[data-testid="list"]');
        this.listBlockLocator = page.locator('#board');
		// create cards
		this.addCardIconBtn = page.locator('.js-add-a-card');
        this.cardNameInput = page.locator('.list-card-composer-textarea.js-card-title');
		this.cancelAddCardsBtn = page.locator('.icon-lg.icon-close.dark-hover.js-cancel');
		// Drag and drop cards
		this.cardSelector = page.locator('.list-card-details.js-card-details');
		this.listSelector = page.locator('.u-fancy-scrollbar.js-no-higher-edits.js-list-sortable.ui-sortable');
        // Add description in a card.
        this.shadowTextBtn = page.locator('[class="js-description-fake-text-area hide-on-edit js-edit-desc LDTYZ4htfrP9Xl"]')
        this.descriptionTextInput = page.locator('#ak-editor-textarea');
		this.descriptionTextSaveBtn = page.getByRole('button', {name: 'Save'});
        // Selector for add properties in a card
        this.addPropertiesBtn = page.locator('.js-sidebar-action-text');
        // Add member in card.
        this.boardMemberBtn = page.locator('.full-name');
        this.closeMemberWindowBtn = page.locator('.pop-over-header-close-btn.icon-sm.icon-close');
        this.membersInCardIcon = page.locator('[class="member js-member-on-card-menu"]');
        // Add Label in card.
        this.labelColorBtn = page.locator('[data-testid="card-label"]');
        this.closeLabelWindowBtn = page.locator('[data-testid="popover-close"]');
        // Add CheckList
        this.checklistNameInput = page.locator('#id-checklist');
        this.checklistNameList = page.locator('.editable.non-empty.checklist-title.js-checklist-title');
        // Add cover in a card.
        this.coverClassBtn = page.locator('.k5qq0MRUdPmpWq');
        this.closeCoverWindowBtn = page.locator('.pop-over-header-close-btn.icon-sm.icon-close');
        this.coverInterface = page.locator('.window-cover.js-card-cover-box.js-stickers-area.is-covered');
        // Add attachment in a card.
        this.attachmentBtn = page.locator('.Sc6pkrxVPpi79Q');
        this.linkInput = page.locator('#url-uid1');
        this.linkNameInput = page.locator('#displayText-uid2');
        this.attachConfirmBtn = page.locator('.css-178ag6o');
        this.attachmentList = page.locator('.u-clearfix.js-attachment-list.ui-sortable');
        // Copy a card in another list
        this.copyCardNameInput = page.locator('textarea.js-autofocus');
        this.targetBoard = page.locator('select.js-select-board');
        this.targetList = page.locator('select.js-select-list');
        this.targetPosition = page.locator('select.js-select-position');
        this.confirmCopyCardBtn = page.getByText('Create card');
        this.cardWindowCloseBtn = page.locator('[aria-label="Close dialog"]');
        // Cards Filter
        this.filterIconBtn = page.getByTestId('filter-popover-button');
        this.labelValueInput = page.locator('.css-pl72xp');
        this.labelValueInput1 = page.locator('[id="aria-context"]');
        this.keywordInput = page.locator('input.nch-textfield__input')
        this.filterWindowCloseBtn = page.getByTestId('popover-close');
        this.memberValueCheck= page.locator('.WiVSCg76W3ENQE');
        this.cardsCount= page.getByTestId('filter-popover-button-card-count');
    }

	async chooseBoard(boardName) {
		await this.loadPageOfBoards;
        await this.enterBoardBtn.getByText(boardName).first().click();
	};

	async createCards(boardName, listName, cardsNameArray) {
        await this.chooseBoard(boardName) 
        await this.locatorList.filter({has: this.page.getByText(listName)})
                .getByText('Add a card').click();
		for (let index = 0; index < cardsNameArray.length; index++) {
            await this.cardNameInput.fill(cardsNameArray[index]);
            await this.cardNameInput.press('Enter');    
        }
		await this.cancelAddCardsBtn.click();
	};

	async moveCard(cardName, listName) {
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
        await this.cardSelector.getByText(cardName).dragTo(this.page.locator( '.list-cards.u-fancy-scrollbar.js-list-cards.js-sortable.ui-sortable').nth(listPosition(listName)));
	};

    async addDescriptionInCard(boardName, cardName, descriptionText) {
        await this.chooseBoard(boardName);
        await this.cardSelector.getByText(cardName).click();
        await this.page.waitForTimeout(5000);
        const descriptionInput = await this.page.isVisible('[class="js-description-fake-text-area hide-on-edit js-edit-desc LDTYZ4htfrP9Xl"]');
            if (!descriptionInput) {
                await this.descriptionTextInput.fill(descriptionText);
                await this.descriptionTextSaveBtn.click();
            } else {
                await this.shadowTextBtn.click();
                await this.descriptionTextInput.fill(descriptionText);
                await this.descriptionTextSaveBtn.click();
            }
	};
    async addMember(boardName, cardName, memberName) {
        await this.chooseBoard(boardName);
        await this.cardSelector.getByText(cardName).click();
        await this.addPropertiesBtn.getByText('Member').click();
        await this.boardMemberBtn.getByText(memberName).click();
        await this.closeMemberWindowBtn.click();
	};

    async addLabel(boardName, cardName, labelColor) {
        await this.chooseBoard(boardName);
        await this.cardSelector.getByText(cardName).click();
        await this.addPropertiesBtn.getByText('Labels').click();
        await this.labelColorBtn.and(this.page.locator(`[data-color="${labelColor}"]`)).click();
        await this.closeLabelWindowBtn.click();
    };

    async addChecklists(boardName, cardName, checklistName) {
        await this.chooseBoard(boardName);
        await this.cardSelector.getByText(cardName).click();
        await this.addPropertiesBtn.getByText('Checklist').click();
        await this.checklistNameInput.fill(checklistName);
        await this.checklistNameInput.press('Enter');
    };

    async addCovers(boardName, cardName, coverImageNumber) {
        await this.chooseBoard(boardName);
        await this.cardSelector.getByText(cardName).click();
        await this.addPropertiesBtn.getByText('Cover').click();
        await this.coverClassBtn.nth(coverImageNumber).click();
        await this.closeCoverWindowBtn.click();
    };
    async addAttachment(boardName, cardName, attachmentLink, linkName) {
        await this.chooseBoard(boardName);
        await this.cardSelector.getByText(cardName).click();
        await this.attachmentBtn.click();
        await this.linkInput.fill(attachmentLink);
        await this.linkNameInput.waitFor('visible');
        await this.linkNameInput.fill(linkName);
        await this.attachConfirmBtn.getByText('Insert').click({force: true});
    };

    async copyCard(cardName, copyCardName, boardName, listName, cardPosition) {
        await this.chooseBoard(boardName);
        await this.cardSelector.getByText(cardName).click();
        await this.addPropertiesBtn.getByText('Copy').click();
        await this.copyCardNameInput.fill(copyCardName);
        await this.targetBoard.selectOption({label: `${boardName} (current)`});
        await this.targetList.selectOption({label: listName});
        await this.targetPosition.selectOption({label: cardPosition});
        await this.confirmCopyCardBtn.click({force: true});
        await this.cardWindowCloseBtn.click();
    };

    async addLabelOfList(listName, cardName, labelColor) {
        await this.locatorList.filter({has: this.page.getByText(listName)}).getByText(cardName).click();
        await this.addPropertiesBtn.getByText('Labels').click();
        await this.labelColorBtn.and(this.page.locator(`[data-color="${labelColor}"]`)).click();
        await this.closeLabelWindowBtn.click();
        await this.cardWindowCloseBtn.click();
    };
    async addMemberOfList(listName, cardName, memberName) {
        await this.locatorList.filter({has: this.page.getByText(listName)}).getByText(cardName).click();
        await this.addPropertiesBtn.getByText('Member').click();
        await this.boardMemberBtn.getByText(memberName).click();
        await this.closeMemberWindowBtn.click();
        await this.cardWindowCloseBtn.click();
    };

    async cardsFilter(filterCriteria, value) {
        await this.filterIconBtn.click();
        if (filterCriteria === 'label') {
            await this.labelValueInput.click();
            await this.labelColorBtn.and(this.page.locator(`[data-color="${value}"]`)).first().click();
            await await this.filterWindowCloseBtn.click();
        } else if (filterCriteria === 'member') {
            await this.page.getByTitle(value).click();
            await this.filterWindowCloseBtn.click();
        } else if (filterCriteria === 'text') {
            await this.keywordInput.fill(value);
        } else {
            await await this.filterWindowCloseBtn.click();
        }
    };
}

