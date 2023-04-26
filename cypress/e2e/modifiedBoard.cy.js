/// <reference types= "cypress" />

describe('Modify', function(){
    
    before(()=> {
        cy.login();
        cy.createBoard();
        });
    
    it('Modify board title', () => {
        cy.get('[class="js-board-editing-target board-header-btn-text"]').type('Test 02{enter}');
        cy.get('[class="js-board-editing-target board-header-btn-text"]').should('have.text', 'Test 02');
    });
    after(()=> {
        cy.deleteBoard();
    });
});
