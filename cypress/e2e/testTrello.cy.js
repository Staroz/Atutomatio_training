/// <reference types= "cypress" />


describe('Boards', function(){

    before(()=> {
        cy.login(Cypress.env())

        });
    it('Create a new board', () => {
        cy.get('li[data-testid="home-team-tab-section-6442879b62c449644bea42b0"] span[data-testid="DownIcon"]').click();
        cy.get('[data-testid="home-team-boards-tab"] > .DD3DlImSMT6fgc').click();
        cy.get('.QB_5E6Ho6209bY > .bxgKMAm3lq5BpA').click();
        cy.get('[data-testid="create-board-title-input"]').type('Test 01');
        cy.get('[data-testid="create-board-submit-button"]').click();
        cy.get('[data-testid="board-name-display"]').should('be.visible');

    });


})