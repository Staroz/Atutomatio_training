import { getWSId, getId } from "./functions";

//LOGIN AND LOGOUT
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
    cy.get('[class="OUdAuicP657Tka"]').click();
    cy.get('[data-testid="account-menu-logout"]').click();
});

// HANDLING WORKSPACES AND BOARD WITH UI.
Cypress.Commands.add('createWorkSpace', (workSpaceName)=> {
    // I did triple-click for a bug in this button, the "force:true" method does not work.
    cy.get('[data-testid="header-create-menu-button"]').dblclick().click();
    cy.get('[data-testid="header-create-team-button"]').click();
    cy.get('[data-testid="header-create-team-name-input"]').type(workSpaceName)
    cy.get('div [class=" css-1og2rpm"]').click(); 
    cy.contains('Education').click({force: true});
    cy.wait(1500);
    cy.get('[data-testid="header-create-team-submit-button"]').click();
    cy.get('[data-testid="show-later-button"]').click(); 
});

Cypress.Commands.add('deleteWorkSpace', (workSpaceName) => {
    cy.get('[data-testid="home-team-settings-tab"]').click();
    cy.get('[data-testid="delete-workspace-button"]').click();
    cy.get('[id="confirmWorkspaceName"]').type(workSpaceName);
    cy.wait(1500);
    cy.get('[data-testid="delete-workspace-confirm-button"]').click();
});

Cypress.Commands.add('createBoard', (boardName)=>{
    cy.get('[data-testid="header-create-menu-button"]').dblclick().click();
    cy.get('[data-testid="header-create-board-button"]').click();
    cy.get('[data-testid="create-board-title-input"]').type(boardName);
    cy.get('[data-testid="create-board-submit-button"]').click();
});

Cypress.Commands.add('modifyBoardName', (boardName, newBoardName)=> {
    cy.get('[class="board-tile-details-name"]').contains(boardName).click();
    cy.get('[data-testid="board-name-display"]').type(newBoardName+'{enter}');
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

//MANAGEMENT WORKSPACES AND BOARD WITH API
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
    });


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

Cypress.Commands.add('getWorkSpacedId', function (key,token, workSpaceName) {
    cy.request({
        url: `${Cypress.env('urlApi')}/members/me/organizations?key=${key}&token=${token}`,
        method: "GET",
    }).then((response) => {
        expect(response.status).to.eq(200);
        let workSpaceId = getWSId(response.body, workSpaceName);
        cy.wrap(workSpaceId).as('workSpaceId');
    });
});

Cypress.Commands.add('workSpaceDeleteApi', function(key, token) {
    cy.request({
    url: `${Cypress.env('urlApi')}/organizations/${this.workSpaceId}?key=${key}&token=${token}`,
    method: 'DELETE',
    }).then(response=>{
            expect(response.status).to.eq(200);
        });
});

Cypress.Commands.add('workSpaceCreateApi', function(key, token, workSpaceName) {
    cy.request({
        url: `${Cypress.env('urlApi')}/organizations/?displayName=${workSpaceName}&key=${key}&token=${token}`,
        method: 'POST',
        }).then(function(response){
            expect(response.status).to.eq(200);
            const workSpaceId = response.body.id;
            cy.wrap(workSpaceId).as('workSpaceId');
            });
});