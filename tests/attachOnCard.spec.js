import { test, expect } from '@playwright/test';
const  credentials = require('../cypress/fixtures/credentials1.json');
const { chromium } = require('@playwright/test');
const { LoginPage } = require('./pages/loginPage.page');
const { WorkspaceApi } = require('./pages/workspaceApi');
const { BoardsApi } = require('./pages/boardsApi');
const { CardsUi } = require('./pages/cardsUi')


test.describe('Testing cards in Trello (Attachment)', async () => { 
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
    
    test.describe('Add attachment in a card', async () => {
        
        test.beforeAll(async () => {
            // Creating workspace, board, lists and cards whit API.
        const workspaceResponseApi = await workspaceApi.createWorkspacesApi(credentials.workSpaceName, credentials.key, credentials.token);
        expect(workspaceResponseApi.status).toBe(200);
        const boardApiResponse = await boardsApi.createBoardApi(credentials.boardName, credentials.key, credentials.token);
        expect(boardApiResponse.status).toBe(200);    
        const listApiResponse = await boardsApi.createListsApi( credentials.key, credentials.token, credentials.listNameArray);
        expect(listApiResponse.status).toBe(200);
        const cardsApiResponse = await boardsApi.createCardsApi( credentials.key, credentials.token, credentials.cardsNameArray);
        expect(cardsApiResponse.status).toBe(200);
        });

        test('Attach a link in a card', async () => {
            await cardsUi.loadPageOfBoards;
            await cardsUi.enterBoardBtn.getByText(credentials.boardName).first().click();
            await cardsUi.addAttachment(credentials.cardsNameArray[0], credentials.attachmentInfo.link, credentials.attachmentInfo.linkName );
            await expect(cardsUi.attachmentList).toContainText(credentials.attachmentInfo.linkName);
            
        });

        test.afterAll(async () => {
            // Deleting boards and workspaces
        const boardApiResponse = await boardsApi.deleteBoardApi(credentials.key, credentials.token);
        expect(boardApiResponse.status).toBe(200);  
        const workspaceResponseApi = await workspaceApi.deleteWorkspaceApi(credentials.key, credentials.token);
        expect(workspaceResponseApi.status).toBe(200);
        });
    });
});





