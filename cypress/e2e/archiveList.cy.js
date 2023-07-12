/// <reference types= "cypress" />

describe("Archive a list of a board, with more than one list", function() {
    before(function() {
        cy.fixture("credentials1.json").as('credentials');
    });
    
    beforeEach(function () {
        cy.login(this.credentials.email, this.credentials.pw, this.credentials.userName);
	});

    after(function() {
        //Deleting workspace, board with API and logout.
        cy.visit('/u/'+this.credentials.userName +'/boards');
        cy.boardDeleteApi(this.credentials.key, this.credentials.token);
        cy.workSpaceDeleteApi(this.credentials.key, this.credentials.token);
        cy.logout(this.credentials.userName);
    });

    describe("Archive a list", function () {
        before(function() {
            //Creating workspace, board, list with API.
            cy.workSpaceCreateApi(this.credentials.key, this.credentials.token, this.credentials.workSpaceName);
            cy.boardCreateApi(this.credentials.key, this.credentials.token, this.credentials.boardName);
            cy.createListsApi(this.credentials.key, this.credentials.token, this.credentials.listNameArray); 
        });
        it("Archive", function () {
            cy.visit('/u/'+this.credentials.userName +'/boards');
            cy.archiveList(this.credentials.boardName, this.credentials.listNameArray[1]);
            cy.get('.list.js-list-content').should('not.contain.text' , this.credentials.listNameArray[1]);
        });
    });
});
