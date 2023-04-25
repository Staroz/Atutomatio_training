/// <reference types= "cypress" />

import { loginPage } from "../pageObjects/LoginPage"

describe('login con POM', function() {

    beforeEach(()=>{
        loginPage.visit();

    });

    it('login erroneo', function () {
        loginPage.login('asdf', 'asdf')
        loginPage.validateLoginPage();
    });

    it.only('login bueno', function () {
        cy.log(Cypress.env());
        loginPage.validateLoginPage();
        loginPage.login(Cypress.env("credentials").user, Cypress.env("credentials").password)
        
    });


})