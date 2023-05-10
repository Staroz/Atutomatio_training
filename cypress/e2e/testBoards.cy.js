/// <reference types= "cypress" />

describe("Boards", function() {
    before(function() {
        cy.fixture("credentials1.json").as('credentials');
    });
    
    beforeEach(function () {
        cy.login(this.credentials.email, this.credentials.pw, this.credentials.userName);
	});

	describe("Create", function () {
		it("Create a new board", function () {
				cy.visit(`/u/" + ${this.credentials.userName} + "/boards`);
				cy.createBoard(this.credentials.boardName);
				cy.get('[data-testid="board-name-display"]').
                    should('have.text', this.credentials.boardName);
		});

        after(function () {
            cy.getBoardId(this.credentials.key, this.credentials.token, this.credentials.boardName);
            cy.boardDeleteApi(this.credentials.key, this.credentials.token);
        });
	});

    describe('Modify', function () {
		before(function() {
			cy.boardCreateApi(this.credentials.key, this.credentials.token, this.credentials.boardName);   
        });
        it('Modify the title of the board', function() {
				cy.visit('/u/'+ this.credentials.userName +'/boards');
                cy.modifyBoardName(this.credentials.boardName, this.credentials.newBoardName);
				cy.get('[data-testid="board-name-display"]')
                    .should('have.text', this.credentials.newBoardName);
        });
		
        after(function (){
            cy.getBoardId(this.credentials.key, this.credentials.token, this.credentials.newBoardName);
            cy.boardDeleteApi(this.credentials.key, this.credentials.token);
        });
	});
	describe("Delete", function () {
		before(function() {
            cy.boardCreateApi(this.credentials.key, this.credentials.token, this.credentials.boardName);   
            });
		it("Delete a Board", function() {
			cy.visit('/u/'+this.credentials.userName +'/boards');
            cy.boardDelete(this.credentials.boardName);
		});
	});
    after(() => {
        cy.logout();
	});
});
