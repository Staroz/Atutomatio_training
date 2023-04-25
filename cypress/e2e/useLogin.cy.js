/// <reference types= "cypress" />

describe('validate that page is loaded ', function(){
    
    before(()=> {
        cy.login(Cypress.env())
        
        });
    it('validate', () => {
        cy.get('.DweEFaF5owOe02').click()
        cy.get('.lzFtVDCea8Z9jO').should('be.visible')
        
    });
})