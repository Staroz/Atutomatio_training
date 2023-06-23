/// <reference types= "cypress" />

describe("Test for create and move cards in Trello", function() {
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

    describe("Manage of Cards", function () {
        before(function() {
            //Creating workspace, board,and list with API.
            cy.workSpaceCreateApi(this.credentials.key, this.credentials.token, this.credentials.workSpaceName);
            cy.boardCreateApi(this.credentials.key, this.credentials.token, this.credentials.boardName);
            cy.createListsApi(this.credentials.key, this.credentials.token, this.credentials.listNameArray); 
        }); 
        it("Create Cards", function () {
				cy.visit(`/u/" + ${this.credentials.userName} + "/boards`);
                cy.createCards(this.credentials.boardName, this.credentials.cardsNameArray);
                cy.get('[class="list-card-title js-card-name"]').then(($title)=>{
                    for (let index = 0; index < this.credentials.cardsNameArray.length; index++) {
                        expect($title[index].textContent).contain(this.credentials.cardsNameArray[index]);
                    };
                });
		});

        it("Move cards through the lists", function () {
            cy.visit(`/u/" + ${this.credentials.userName} + "/boards`);
            cy.joinBoard(this.credentials.userName, this.credentials.boardName);
            cy.moveCard(this.credentials.cardsNameArray[0], this.credentials.listNameArray[1]);
            cy.get('[class="u-fancy-scrollbar js-no-higher-edits js-list-sortable ui-sortable"]')
                .contains('[class="list js-list-content"]', this.credentials.listNameArray[1])
                .children().should('contain.text', this.credentials.cardsNameArray[0]);
            cy.moveCard(this.credentials.cardsNameArray[0], this.credentials.listNameArray[2]);
            cy.get('[class="u-fancy-scrollbar js-no-higher-edits js-list-sortable ui-sortable"]')
                .contains('[class="list js-list-content"]', this.credentials.listNameArray[2])
                .children().should('contain.text', this.credentials.cardsNameArray[0]);
            cy.moveCard(this.credentials.cardsNameArray[1], this.credentials.listNameArray[1]);
            cy.get('[class="u-fancy-scrollbar js-no-higher-edits js-list-sortable ui-sortable"]')
                .contains('[class="list js-list-content"]', this.credentials.listNameArray[1])
                .children().should('contain.text', this.credentials.cardsNameArray[1]);
        });
	});
});
