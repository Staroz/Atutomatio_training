/// <reference types= "cypress" />

describe("Create lists in a board of Trello", function() {
    before(function() {
        cy.fixture("credentials1.json").as('credentials');
    });
    
    beforeEach(function () {
        cy.login(this.credentials.email, this.credentials.pw, this.credentials.userName);
	});

    after(function() {
        cy.visit('/u/'+this.credentials.userName +'/boards');
        cy.boardDeleteApi(this.credentials.key, this.credentials.token);
        cy.workSpaceDeleteApi(this.credentials.key, this.credentials.token);
        cy.logout();
    });

    describe("Create and delete lists with UI", function () {
        before(function() {
            cy.workSpaceCreateApi(this.credentials.key, this.credentials.token, this.credentials.workSpaceName);
            cy.boardCreateApi(this.credentials.key, this.credentials.token, this.credentials.boardName); }); 
        it("Create lists", function () {
            const listNameArray = [
                this.credentials.listName1, 
                this.credentials.listName2, 
                this.credentials.listName3
            ];
				cy.visit(`/u/" + ${this.credentials.userName} + "/boards`);
                cy.createLists(this.credentials.boardName, listNameArray);
                cy.get('[class="list-header-name-assist js-list-name-assist"]').then(($title)=>{
                    expect($title.text()).to.equal(listNameArray.join(''));
                });
		});

        after(function () {
            cy.visit(`/u/" + ${this.credentials.userName} + "/boards`);
            cy.deleteLists(this.credentials.boardName);
            cy.get('[class="placeholder"]').should('have.text', 'Add a list');
        });
	});
});
