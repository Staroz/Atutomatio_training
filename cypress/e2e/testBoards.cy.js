/// <reference types= "cypress" />


describe("Boards", () => {
	beforeEach(() => {
        cy.fixture('credentials.json').then((value) => {
            const email = value.email;
            const pw = value.pw;
            cy.login(email, pw);
        });
	});

	describe("Create", function () {
		it("Create a new board", () => {
			//creating a board and assertion if it was created.
			cy.fixture('credentials.json').then((value) =>{
                const boardName = value.boardName;
                cy.visit('https://trello.com/u/marcourquidi17/boards');
                cy.createBoard(boardName);
			    cy.get('[class="js-board-editing-target board-header-btn-text"]')
                    .should("have.text", boardName);
                });
            });

		after(() => {
			cy.boardDelete();
		});
	});

	describe('Modify', ()=>{
	    it('Modify board title', ()=>{
            cy.fixture('credentials.json').then((value) =>{
                const newBoardName = value.newBoardName;
                const boardName = value.boardName;

	            cy.visit('https://trello.com/u/marcourquidi17/boards');
                cy.createBoard(boardName);
                cy.modifyBoardName(newBoardName);
	            cy.get('[class="js-board-editing-target board-header-btn-text"]')
                    .should('have.text', newBoardName);
            });
	    });
	    after(()=> {
	        cy.boardDelete();
	    });
	});
	describe("Delete", () => {
		
		it("Delete a Board", () => {
            cy.fixture('credentials.json').then((value) =>{
                const boardName = value.newBoardName;
			    cy.visit('https://trello.com/u/marcourquidi17/boards');
                cy.createBoard(boardName);
                cy.boardDelete();
            });
		});
	});
    after(() => {
		cy.logout();
	});
});

