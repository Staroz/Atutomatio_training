// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
    
Cypress.Commands.add('login', () => {
    cy.visit('https://trello.com');
    cy.get('.Buttonsstyles__ButtonGroup-sc-1jwidxo-3 > [href="/login"]').click();
    cy.get('#user').type(Cypress.env("credentials").email);
    cy.get('#login').click();
    cy.origin('https://id.atlassian.com', function () {
        cy.get('#password').type(Cypress.env("credentials").pw);
        cy.get('#login-submit').click();
        });
});

Cypress.Commands.add('logout', ()=> {
    cy.wait(1500);
    cy.reload();
    cy.get('.DweEFaF5owOe02').click();
    cy.get('[data-testid="account-menu-logout"]').click();
});


// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })