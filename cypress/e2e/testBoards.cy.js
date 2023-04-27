/// <reference types= "cypress" />

const newNameBoard = "Test 02";
const nameBoard = "Test 01";


describe("Boards", () => {
	beforeEach(() => {
		cy.login();
	});

	describe("Create", function () {
		it("Create a new board", () => {
			//creating a board and assertion if it was created.
			cy.visit('https://trello.com/u/marcourquidi17/boards');
            cy.createBoard(nameBoard);
			cy.get('[class="js-board-editing-target board-header-btn-text"]')
                .should("have.text", nameBoard);
		});

		after(() => {
			cy.deleteBoard();
		});
	});

	describe('Modify', ()=>{
	    it('Modify title board', ()=>{
	        cy.visit('https://trello.com/u/marcourquidi17/boards');
            cy.createBoard(nameBoard);
            cy.modifyNameBoard(newNameBoard);
	        cy.get('[class="js-board-editing-target board-header-btn-text"]')
                .should('have.text', newNameBoard);
	    });
	    after(()=> {
	        cy.deleteBoard();
	    });
	});
	describe("Delete", () => {
		
		it("Delete a Board", () => {
			cy.visit('https://trello.com/u/marcourquidi17/boards');
            cy.createBoard(nameBoard);
            cy.deleteBoard();
		});
	});
    after(() => {
		cy.logout();
	});
});

