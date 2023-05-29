/// <reference types= "cypress" />

describe("Manipulating UI of Trello", function() {
    before(function() {
        cy.fixture("credentials1.json").as('credentials');
    });
    
    beforeEach(function () {
        cy.login(this.credentials.email, this.credentials.pw, this.credentials.userName);
	});

    after(function() {
        cy.visit('/u/'+this.credentials.userName +'/boards');
        cy.logout();
    });

    describe("Create a work space whit UI", function () {
		it("Create WS", function () {
				cy.visit(`/u/" + ${this.credentials.userName} + "/boards`);
				cy.createWorkSpace(this.credentials.workSpaceName);
                cy.get('[data-testid="home-team-tab-name"]').contains(this.credentials.workSpaceName).should('be.visible');
		});

        after(function () {
            cy.getWorkSpacedId(this.credentials.key, this.credentials.token, this.credentials.workSpaceName);
            cy.workSpaceDeleteApi(this.credentials.key, this.credentials.token);
        });
	});

	describe("Create a new board whit UI", function () {
        before(function() {
			cy.workSpaceCreateApi(this.credentials.key, this.credentials.token, this.credentials.workSpaceName);   
        });
        it("Create board", function () {
				cy.visit(`/u/" + ${this.credentials.userName} + "/boards`);
				cy.createBoard(this.credentials.boardName);
				cy.get('[data-testid="board-name-display"]')
                    .should('have.text', this.credentials.boardName);
		});

        after(function () {
            cy.getBoardId(this.credentials.key, this.credentials.token, this.credentials.boardName);
            cy.boardDeleteApi(this.credentials.key, this.credentials.token);
            cy.workSpaceDeleteApi(this.credentials.key, this.credentials.token);
        });
	});

    describe('Update board name whit UI', function () {
		before(function() {
			cy.workSpaceCreateApi(this.credentials.key, this.credentials.token, this.credentials.workSpaceName);
            cy.boardCreateApi(this.credentials.key, this.credentials.token, this.credentials.boardName);   
        });
        it('Update board', function() {
				cy.visit('/u/'+ this.credentials.userName +'/boards');
                cy.modifyBoardName(this.credentials.boardName, this.credentials.newBoardName);
				cy.get('[data-testid="board-name-display"]')
                    .should('have.text', this.credentials.newBoardName);
        });
		
        after(function (){
            cy.getBoardId(this.credentials.key, this.credentials.token, this.credentials.newBoardName);
            cy.boardDeleteApi(this.credentials.key, this.credentials.token);
            cy.workSpaceDeleteApi(this.credentials.key, this.credentials.token);
        });
	});

	describe("Delete a board whit UI", function () {
		before(function() {
            cy.workSpaceCreateApi(this.credentials.key, this.credentials.token, this.credentials.workSpaceName);
            cy.boardCreateApi(this.credentials.key, this.credentials.token, this.credentials.boardName);   
            });
		it("Delete a Board", function() {
			cy.visit('/u/'+this.credentials.userName +'/boards');
            cy.boardDelete(this.credentials.boardName);
            cy.get('[class="board-tile-details-name"]').should('not.exist');
		});

        after(function() {
            cy.workSpaceDeleteApi(this.credentials.key, this.credentials.token);
        });
	});
});
