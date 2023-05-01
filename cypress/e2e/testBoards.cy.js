/// <reference types= "cypress" />


describe("Boards", () => {
	beforeEach(() => {
        cy.fixture('credentials.json').then((value) => {
            const email = value.email;
            const pw = value.pw;
			const userName = value.userName;
            cy.login(email, pw, userName);
        });
	});

	describe("Create", function () {
		it("Create a new board", () => {
			//creating a board and assertion if it was created.
			cy.fixture('credentials.json').then((value) =>{
                const boardName = value.boardName;
				const userName = value.userName;
                cy.visit('https://trello.com/u/'+userName +'/boards');
                cy.createBoard(boardName);
				cy.get('[class="board-tile-details-name"]')
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
				const userName = value.userName;

				cy.visit('https://trello.com/u/'+userName +'/boards');
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
				const userName = value.userName;
				
				cy.visit('https://trello.com/u/'+userName +'/boards');
                cy.createBoard(boardName);
                cy.boardDelete();
            });
		});
	});
    after(() => {
		cy.logout();
	});
});

