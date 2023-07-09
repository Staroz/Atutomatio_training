/// <reference types= "cypress" />

describe("Test for update information of cards in Trello", function() {
    before(function() {
        cy.fixture("credentials1.json").as('credentials');
    });
    
    beforeEach(function () {
        cy.login(this.credentials.email, this.credentials.pw, this.credentials.userName);
	});

    after(function() {
        //Deleting workspace, board with API and logout.
        cy.boardDeleteApi(this.credentials.key, this.credentials.token);
        cy.workSpaceDeleteApi(this.credentials.key, this.credentials.token);
        cy.logout(this.credentials.userName);
    });

    describe("Updating information of a card", function () {
        before(function() {
            //Creating workspace, board, list and card with API.
            cy.workSpaceCreateApi(this.credentials.key, this.credentials.token, this.credentials.workSpaceName);
            cy.boardCreateApi(this.credentials.key, this.credentials.token, this.credentials.boardName);
            cy.createListsApi(this.credentials.key, this.credentials.token, this.credentials.listNameArray); 
            cy.createCardApi(this.credentials.key, this.credentials.token, [this.credentials.cardsNameArray[0]]); 
        });
        it("Add description in a card", function () {
            cy.joinBoard(this.credentials.userName, this.credentials.boardName);
            cy.addDescriptionInCard(this.credentials.cardsNameArray[0], this.credentials.descriptionText);
            cy.get('[class="current markeddown hide-on-edit js-desc js-show-with-desc"]').should('contain.text', this.credentials.descriptionText);
        });
        it("Join a Member", function () {
            cy.joinBoard(this.credentials.userName, this.credentials.boardName);
            cy.addMember(this.credentials.cardsNameArray[0], this.credentials.userName);
            cy.get('[class="member js-member-on-card-menu"]').should('be.visible');
        });

        it("add Label", function () {
            cy.joinBoard(this.credentials.userName, this.credentials.boardName);
            cy.addLabels(this.credentials.cardsNameArray[0], this.credentials.labelColor.green);
            cy.get('[data-testid="card-label"]').should('have.attr', 'data-color', this.credentials.labelColor.green);
        });
        it("add Checklist", function () {
            cy.joinBoard(this.credentials.userName, this.credentials.boardName);
            cy.addChecklists(this.credentials.cardsNameArray[0], this.credentials.checklistName);
            cy.get('[class="checklist"]').should('contain.text', this.credentials.checklistName)
        });

        it("add Cover", function () {
            cy.joinBoard(this.credentials.userName, this.credentials.boardName);
            cy.addCovers(this.credentials.cardsNameArray[0], this.credentials.coverImageNumber.Cover3);
            cy.get('[class="window-cover js-card-cover-box js-stickers-area is-covered"]').should('contain.text', ' Cover')
        });
    });
});
