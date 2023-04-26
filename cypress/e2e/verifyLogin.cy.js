/// <reference types= "cypress" />

describe('Validate', function(){
    
    before(()=> {
        cy.login();
        
        });
    it('Validate that the new page is loaded', () => {
        cy.get('.DweEFaF5owOe02').click();
        cy.get('.lzFtVDCea8Z9jO').should('contain', 'staroz');
    });
});