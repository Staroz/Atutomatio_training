/// <reference types="Cypress" />

import {Before, Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";

describe("Manipulate of boards of Trello with API", function() {
    Before(function(){
        cy.fixture('credentials1.json').as('credentials');
    })
    Given( "I created a new board in Trello", function() {
        cy.boardCreateApi(this.credentials.key, this.credentials.token, this.credentials.boardName);
    })
    
    When("I modify the name of this Board whit API", function() {
        
        cy.boardUpdateApi(this.credentials.key, this.credentials.token, this.credentials.newBoardName);
    })
    
    Then("I should delete this board", function() {
        cy.getBoardId(this.credentials.key, this.credentials.token, this.credentials.newBoardName)
        cy.boardDeleteApi(this.credentials.key, this.credentials.token);
    })
})