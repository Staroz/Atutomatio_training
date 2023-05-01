/// <reference types= "cypress" />

describe("Boards manipulation whit API", function() {
	before('Create a new Board in Trello', function() {
        cy.fixture('credentials.json').then(function(value) {
            const token = value.token;
            const key = value.key;
			const boardName = value.boardName;
            
            cy.boardCreateApi(key, token, boardName);
        });
    });
    
    it('Update board name', function() {
        
        cy.fixture('credentials.json').then(function(value) {
            const token = value.token;
            const key = value.key;
            const newBoardName = value.newBoardName;
            
            cy.boardUpdateApi(key, token, newBoardName);
        });
    });
    
    after('Delete the Board created',()=>{
        cy.fixture('credentials.json').then(function(value) {
            const token = value.token;
            const key = value.key;
            
            cy.boardDeleteApi(key, token);
        });
    });
});

