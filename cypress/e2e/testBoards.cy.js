/// <reference types= "cypress" />


describe("Boards", () => {
	beforeEach(() => {
        cy.fixture('example.json').then((value) => {
            const email = value.email;
            const pw = value.pw;
            cy.login(email, pw);
        });
	});

	describe("Create", function () {
		it("Create a new board", () => {
			//creating a board and assertion if it was created.
			cy.fixture('example.json').then((value) =>{
                const nameBoard = value.nameBoard;
                cy.visit('https://trello.com/u/marcourquidi17/boards');
                cy.createBoard(nameBoard);
			    cy.get('[class="js-board-editing-target board-header-btn-text"]')
                    .should("have.text", nameBoard);
                });
            });

		after(() => {
			cy.deleteBoard();
		});
	});

	describe('Modify', ()=>{
	    it('Modify title board', ()=>{
            cy.fixture('example.json').then((value) =>{
                const newNameBoard = value.newNameBoard;
                const nameBoard = value.nameBoard;

	            cy.visit('https://trello.com/u/marcourquidi17/boards');
                cy.createBoard(nameBoard);
                cy.modifyNameBoard(newNameBoard);
	            cy.get('[class="js-board-editing-target board-header-btn-text"]')
                    .should('have.text', newNameBoard);
            });
	    });
	    after(()=> {
	        cy.deleteBoard();
	    });
	});
	describe("Delete", () => {
		
		it("Delete a Board", () => {
            cy.fixture('example.json').then((value) =>{
                const nameBoard = value.newNameBoard;
			    cy.visit('https://trello.com/u/marcourquidi17/boards');
                cy.createBoard(nameBoard);
                cy.deleteBoard();
            });
		});
	});
    after(() => {
		cy.logout();
	});
});

