/// <reference types= "cypress" />

describe("Test for  attachment a link in a card of Trello", function() {
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

    describe("Attach link in a card", function () {
        before(function() {
            //Creating workspace, board, list and card with API.
            cy.workSpaceCreateApi(this.credentials.key, this.credentials.token, this.credentials.workSpaceName);
            cy.boardCreateApi(this.credentials.key, this.credentials.token, this.credentials.boardName);
            cy.createListsApi(this.credentials.key, this.credentials.token, this.credentials.listNameArray); 
            cy.createCardApi(this.credentials.key, this.credentials.token, [this.credentials.cardsNameArray[0]]); 
        });
        it("Attach", function () {
            cy.joinBoard(this.credentials.userName, this.credentials.boardName);
            cy.addAttachment(this.credentials.cardsNameArray[0], this.credentials.attachmentInfo.link, this.credentials.attachmentInfo.linkName );
            cy.get('[class="u-clearfix js-attachment-list ui-sortable"]').should('contain.text', this.credentials.attachmentInfo.linkName);
        });
    });
});
