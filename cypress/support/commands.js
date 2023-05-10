// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
function getId(arr, boardName) {
	let ans = "";
	for (let index = 0; index < arr.length; index++) {
		const element = arr[index];
		if (element.name === boardName) {
			ans = element.id;
			break;
		} else {
			ans = "ERROR, THIS BOARD NAME DOESN'T EXIT";
		}
	}
	return ans;
}

Cypress.Commands.add('login', (email, pw, userName) => {

    cy.session('trelloLogin', () => {
        cy.visit('/home');
        cy.get('.Buttonsstyles__ButtonGroup-sc-1jwidxo-3 > [href="/login"]').click();
        cy.get('#user').type(email);
        cy.get('#login').click();
        cy.origin('https://id.atlassian.com', {args: {pw}}, ({pw}) => {
            cy.get('#password').type(pw);
            cy.get('#login-submit').click();
            });
        cy.url().should('contains', userName + '/boards')
    });
}); 

Cypress.Commands.add('logout', ()=> {
    cy.get('.DweEFaF5owOe02').click();
    cy.get('[data-testid="account-menu-logout"]').click();
});

Cypress.Commands.add('boardDelete', (boardName) => {
    cy.get('[class="board-tile-details-name"]').contains(boardName).click();
    cy.get('[class="frrHNIWnTojsww GDunJzzgFqQY_3 bxgKMAm3lq5BpA HAVwIqCeMHpVKh SEj5vUdI3VvxDc"]').click({force: true});
    cy.get('[class="board-menu-navigation-item-link js-open-more"]').click();
    cy.get('[class="board-menu-navigation-item-link js-close-board"]').click({force: true});
    cy.get('[class="js-confirm full nch-button nch-button--danger"]').click(); 
    cy.get('[data-testid="close-board-delete-board-button"]').click();
    cy.get('[data-testid="close-board-delete-board-confirm-button"]').click();
});

Cypress.Commands.add('createBoard', (boardName)=>{
    cy.get('[data-testid="create-board-tile"]').contains('Create new board').click();
    cy.get('[data-testid="create-board-title-input"]').type(boardName);
    cy.get('[data-testid="create-board-submit-button"]').click();
});

Cypress.Commands.add('modifyBoardName', (boardName, newBoardName)=> {
    cy.get('[class="board-tile-details-name"]').contains(boardName).click();
    cy.get('[data-testid="board-name-display"]').type(newBoardName+'{enter}');
        
});

Cypress.Commands.add('boardCreateApi', function(key, token, boardName) {
    cy.request({
        url: `${Cypress.env('urlApi')}/boards/?name=${boardName}&key=${key}&token=${token}`,
        method: 'POST',
        }).then(function(response){
            expect(response.status).to.eq(200);
            const id = response.body.id;
            cy.wrap(id).as('id');
            });
});

Cypress.Commands.add('boardUpdateApi', function(key, token, newBoardName) {

    cy.request({
        url: `${Cypress.env('urlApi')}/boards/${this.id}?&key=${key}&token=${token}&name=${newBoardName}`,
        method: 'PUT'
    }).then(response => {
        expect(response.status).to.eq(200);
        });
});

Cypress.Commands.add('boardDeleteApi', function(key, token) {

        cy.request({
        url: `${Cypress.env('urlApi')}/boards/${this.boardId}?key=${key}&token=${token}`,
        method: 'DELETE',
        }).then(response=>{
                expect(response.status).to.eq(200);
            });
    })


    Cypress.Commands.add('getBoardId', function (key,token, boardName) {
        cy.request({
            url: `${Cypress.env('urlApi')}/members/me/boards?key=${key}&token=${token}`,
            method: "GET",
        }).then((response) => {
            expect(response.status).to.eq(200);
            let boardId = getId(response.body, boardName);
            cy.wrap(boardId).as('boardId');
        });
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