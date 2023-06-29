/// <reference types= "cypress" />

describe("Copy a cards in another list", function() {
    before(function() {
        cy.fixture("credentials1.json").as('credentials');
    });
    
    beforeEach(function () {
        cy.login(this.credentials.email, this.credentials.pw, this.credentials.userName);
	});

    // after(function() {
    //     //Deleting workspace, board with API and logout.
    //     cy.visit('/u/'+this.credentials.userName +'/boards');
    //     cy.boardDeleteApi(this.credentials.key, this.credentials.token);
    //     cy.workSpaceDeleteApi(this.credentials.key, this.credentials.token);
    //     cy.logout(this.credentials.userName);
    // });

    describe("Copy a card", function () {
        before(function() {
            //Creating workspace, board, list and card with API.
            cy.workSpaceCreateApi(this.credentials.key, this.credentials.token, this.credentials.workSpaceName);
            cy.boardCreateApi(this.credentials.key, this.credentials.token, this.credentials.boardName);
            cy.createListsApi(this.credentials.key, this.credentials.token, this.credentials.listNameArray); 
            cy.createCardApi(this.credentials.key, this.credentials.token, [this.credentials.cardsNameArray[0]]); 
        });
        it("Copy Card 01 to In Progress list", function () {
            cy.joinBoard(this.credentials.userName, this.credentials.boardName);
            cy.copyCard(this.credentials.cardsNameArray[0], this.credentials.copiedCardInfo.copyCardName, this.credentials.boardName, this.credentials.listNameArray[1], this.credentials.copiedCardInfo.positionOfCard);
            cy.get('[data-testid="list"]').contains('[class="list js-list-content"]', this.credentials.listNameArray[1]).children().should('contain.text', this.credentials.copiedCardInfo.copyCardName);
        });
    });
});
