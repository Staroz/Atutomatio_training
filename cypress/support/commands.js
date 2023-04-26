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
    
    cy.get('.DweEFaF5owOe02').click();
    cy.get('[data-testid="account-menu-logout"]').click();
});

Cypress.Commands.add('deleteBoard', () => {
    cy.get('[class="js-board-editing-target board-header-btn-text"]').click();
    cy.get('[class="frrHNIWnTojsww GDunJzzgFqQY_3 bxgKMAm3lq5BpA HAVwIqCeMHpVKh SEj5vUdI3VvxDc"]').click({force: true});
    cy.get('[class="board-menu-navigation-item-link js-open-more"]').click();
    cy.get('[class="board-menu-navigation-item-link js-close-board"]').click();
    cy.get('[class="js-confirm full nch-button nch-button--danger"]').click();
    cy.get('[data-testid="close-board-delete-board-button"]').click();
    cy.get('[data-testid="close-board-delete-board-confirm-button"]').click();
});

Cypress.Commands.add('createBoard', ()=>{
    cy.get('li[data-testid="home-team-tab-section-6442879b62c449644bea42b0"] span[data-testid="DownIcon"]').click();
    cy.get('[data-testid="home-team-boards-tab"] > .DD3DlImSMT6fgc').click();
    cy.get('.QB_5E6Ho6209bY > .bxgKMAm3lq5BpA').click();
    cy.get('[data-testid="create-board-title-input"]').type('Test 01');
    cy.get('[data-testid="create-board-submit-button"]').click();
})
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