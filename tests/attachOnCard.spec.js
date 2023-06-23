import { test, expect } from '@playwright/test';
const  credentials = require('../cypress/fixtures/credentials.json');
const { chromium } = require('@playwright/test');
const { LoginPage } = require('./pages/loginPage.page');
const { WorkspaceApi } = require('./pages/workspaceApi');
const { BoardsApi } = require('./pages/boardsApi');
const { CardsUi } = require('./pages/cardsUi')


test.describe('Testing cards in Trello', async () => { 
    let browser, context, page, boardsApi, workspaceApi, cardsUi;

    test.beforeEach (async({ page })=> {
        page = await context.newPage();
        cardsUi = new CardsUi(page);
    });

    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
        boardsApi = new BoardsApi();
        workspaceApi = new WorkspaceApi();

        const loginPage = new LoginPage(page);
        await loginPage.logIn(credentials.email, credentials.pw);
        await expect(page).toHaveURL('');
    });

    test.afterAll(async () => {
        await browser.close();
    });

    test.skip('Create cards in a board', async () => {
        test.beforeAll(async () => {
            // Creating workspace, board and lists whit API.
        const workspaceResponseApi = await workspaceApi.createWorkspacesApi(credentials.workSpaceName, credentials.key, credentials.token);
        expect(workspaceResponseApi.status).toBe(200);
        const boardApiResponse = await boardsApi.createBoardApi(credentials.boardName, credentials.key, credentials.token);
        expect(boardApiResponse.status).toBe(200);    
        const listApiResponse = await boardsApi.createListsApi( credentials.key, credentials.token, credentials.listNameArray);
        expect(listApiResponse.status).toBe(200);  
        });
        
        test('Create', async () => {
            await cardsUi.loadPageOfBoards;
            await cardsUi.createCards(credentials.boardName, credentials.listNameArray[0], credentials.cardsNameArray);
            await expect(cardsUi.listBlockLocator.filter({hasText: credentials.listNameArray[0]})).toContainText(credentials.cardsNameArray[0]);
        });

    });
    
    test.describe('Add attachment in a card', async () => {
        
        test('Attach a link in a card', async () => {
            await cardsUi.loadPageOfBoards;
            await cardsUi.enterBoardBtn.getByText(credentials.boardName).first().click();
            await cardsUi.addAttachment(credentials.cardsNameArray[0], credentials.attachmentInfo.link, credentials.attachmentInfo.linkName );
            await expect(cardsUi.attachmentList).toContainText([credentials.attachmentInfo.linkName]);
        });

        // test.afterAll(async () => {
        //     // Deleting boards and workspaces
        // const boardApiResponse = await boardsApi.deleteBoardApi(credentials.key, credentials.token);
        // expect(boardApiResponse.status).toBe(200);  
        // const workspaceResponseApi = await workspaceApi.deleteWorkspaceApi(credentials.key, credentials.token);
        // expect(workspaceResponseApi.status).toBe(200);
        // });
    });
});





