/// <reference types= "cypress" />

describe("Test for create and move cards in Trello", function() {
    before(function() {
        cy.fixture("credentials1.json").as('credentials');
    });
    
    beforeEach(function () {
        cy.login(this.credentials.email, this.credentials.pw, this.credentials.userName);
	});

    after(function() {
        cy.boardDeleteApi(this.credentials.key, this.credentials.token);
        cy.workSpaceDeleteApi(this.credentials.key, this.credentials.token);
        cy.logout(this.credentials.userName);
    });

    describe("Manage of Cards", function () {
        before(function() {
            //Creating workspace, board,and list with API.
            cy.workSpaceCreateApi(this.credentials.key, this.credentials.token, this.credentials.workSpaceName);
            cy.boardCreateApi(this.credentials.key, this.credentials.token, this.credentials.boardName);
            cy.createListsAndCardsApi(this.credentials.key, this.credentials.token, this.credentials.listNameArray, this.credentials.cardsNameArray); 
        }); 
        it("Adding a characteristic at all cards", function () {
				cy.joinBoard(this.credentials.userName, this.credentials.boardName);
                cy.addLabelsAllCards( this.credentials.listNameArray[0], this.credentials.cardsNameArray[0], this.credentials.labelColor.red);
                cy.addLabelsAllCards( this.credentials.listNameArray[0], this.credentials.cardsNameArray[1], this.credentials.labelColor.yellow);
                cy.addLabelsAllCards( this.credentials.listNameArray[0], this.credentials.cardsNameArray[2], this.credentials.labelColor.green);
                cy.addLabelsAllCards( this.credentials.listNameArray[1], this.credentials.cardsNameArray[0], this.credentials.labelColor.orange);
                cy.addLabelsAllCards( this.credentials.listNameArray[1], this.credentials.cardsNameArray[1], this.credentials.labelColor.blue);
                cy.addLabelsAllCards( this.credentials.listNameArray[1], this.credentials.cardsNameArray[2], this.credentials.labelColor.purple);
                cy.addMemberOfList(this.credentials.listNameArray[2], this.credentials.cardsNameArray[2], this.credentials.userName)
                cy.get('.list-card-details.js-card-details').should($value=> {
                    expect($value).to.have.length(9);
                })
		});
        it("Create Cards", function () {
            cy.joinBoard(this.credentials.userName, this.credentials.boardName);
            cy.cardsFilter(this.credentials.filterCriteria.member, this.credentials.criteriaValue.memberMyself)
            cy.get('.NiH9mJY3iVeTAl').should('contain.text', '1');
        });
	});
});
