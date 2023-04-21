/// <reference types= "cypress" />


describe('created a new board', function(){
    ('login trello', function() {
        cy.visit('https://trello.com')
        cy.get('.Buttonsstyles__ButtonGroup-sc-1jwidxo-3 > [href="/login"]').click()
        cy.get('#user').type('marcourquidi17@outlook.com')
        cy.get('#login').click()
        cy.origin('https://id.atlassian.com',()=>{
            cy.get('#password').type('Hijodecain17')
            cy.get('#login-submit').click()
            })
        });
})