import { test, expect } from '@playwright/test';
const  credentials = require('../cypress/fixtures/credentials1.json');
const { chromium } = require('@playwright/test');
const { LoginPage } = require('./pages/loginPage.page');
const { BoardsApi } = require('./pages/boardsApi');
const { ListsUi } = require('./pages/listsUi')

test.describe('Archive a list of a board with more than one list', async () => { 
    let browser, context, page, boardsApi, listsUi;

    test.beforeEach (async({ page })=> {
        page = await context.newPage();
        listsUi = new ListsUi(page);
    });

    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
        boardsApi = new BoardsApi();

        const loginPage = new LoginPage(page);
        await loginPage.logIn(credentials.email, credentials.pw);
        await expect(page).toHaveURL(`u/${credentials.userName}/boards`);
    });

    test.afterAll(async () => {
        await browser.close();
    });
    
    test.describe('Archive a list', async () => {
        
        test.beforeAll(async () => {
            // Creating lists whit API.
            const listsApiResponse = await boardsApi.createListsApi(credentials.workSpaceName, credentials.boardName, credentials.key, credentials.token, credentials.listNameArray);
            expect(listsApiResponse.status).toBe(200);   
        });

        test('Archive "In Progress" list', async () => {
            await listsUi.archivedList(credentials.boardName, credentials.listNameArray[1]);
            await expect(listsUi.listBlockLocator).not.toContainText(credentials.listNameArray[1]);
        });

        test.afterAll(async () => {
                // Deleting boards and workspaces
            const boardApiResponse = await boardsApi.deleteBoardApi(credentials.key, credentials.token);
            expect(boardApiResponse.status).toBe(200);  
            const workspaceResponseApi = await boardsApi.workspaceApi.deleteWorkspaceApi(credentials.key, credentials.token);
            expect(workspaceResponseApi.status).toBe(200);
        });
    });
});




