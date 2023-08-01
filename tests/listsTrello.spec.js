import { test, expect } from '@playwright/test';
const  credentials = require('../cypress/fixtures/credentials1.json');
const { chromium } = require('@playwright/test');
const { LoginPage } = require('./pages/loginPage.page');
const { BoardsApi } = require('./pages/boardsApi');
const { ListsUi } = require('./pages/listsUi');

test.describe('Testing lists in Trello', async () => { 
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

    test.describe('Create lists', async () => {
        test.beforeAll(async () => {
                // Created workspace and board whit API.
            const boardApiResponse = await boardsApi.createBoardApi(credentials.workSpaceName, credentials.boardName, credentials.key, credentials.token);
            expect(boardApiResponse.status).toBe(200);    
        });
        
        test('Create', async () => {
            await listsUi.createLists(credentials.boardName, credentials.listNameArray);
            await expect(listsUi.locatorList).toContainText(credentials.listNameArray);
        });

        test.afterEach(async () => {
                // Deleting workspace and board whit API.
            const boardApiResponse = await boardsApi.deleteBoardApi(credentials.key, credentials.token);
            expect(boardApiResponse.status).toBe(200);
            const workspaceResponseApi = await boardsApi.workspaceApi.deleteWorkspaceApi(credentials.key, credentials.token);
            expect(workspaceResponseApi.status).toBe(200);
        });
    });
    
    test.describe('Delete lists of a board', async () => {
        test.beforeAll(async () => {
            // Creating lists whit API.
            const listsApiResponse = await boardsApi.createListsApi(credentials.workSpaceName, credentials.boardName, credentials.key, credentials.token, credentials.listNameArray);
            expect(listsApiResponse.status).toBe(200);   
        });

        test('delete', async () => {
            await listsUi.deleteLists(credentials.boardName);
            await expect(listsUi.addListBtn).toContainText('Add a list');
        });

        test.afterEach(async () => {
                // Deleting workspace and board whit API.
            const boardApiResponse = await boardsApi.deleteBoardApi(credentials.key, credentials.token);
            expect(boardApiResponse.status).toBe(200); 
            const workspaceResponseApi = await boardsApi.workspaceApi.deleteWorkspaceApi(credentials.key, credentials.token);
            expect(workspaceResponseApi.status).toBe(200); 
        });
    });
});





