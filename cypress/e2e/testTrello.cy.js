/// <reference types= "cypress" />

describe('Boards', function(){

    before(()=> {
        cy.login();
    });
    it('Create new board, modify board title, and delete board', () => {
        //creating a board and assertion if it was created.
        cy.createBoard();
        cy.get('[class="js-board-editing-target board-header-btn-text"]').should('have.text', 'Test 01');
        //Modify board title
        cy.get('[class="js-board-editing-target board-header-btn-text"]').type('Test 02{enter}');
        cy.get('[class="js-board-editing-target board-header-btn-text"]').should('have.text', 'Test 02');
        //Delete the board
        cy.deleteBoard();
        cy.contains('Test 02').should('not.exist');
    });

    after(()=> {
        cy.logout();
    })
});