/// <reference types= "cypress" />

describe('Modify', function(){
    
    before(()=> {
        cy.login();
        
        });
    it('Modify a Board', () => {
        cy.get('[title="Test 01"]').click();
        cy.get('[class="js-board-editing-target board-header-btn-text"]').type('Test 02{enter}');
        cy.get('[class="js-board-editing-target board-header-btn-text"]').should('have.text', 'Test 02')
    });
})