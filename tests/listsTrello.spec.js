import { test, expect } from '@playwright/test';
const  credentials = require('../cypress/fixtures/credentials1.json');
const { chromium } = require('@playwright/test');
const { LoginPage } = require('./pages/loginPage.page');
const { WorkspaceApi } = require('./pages/workspaceApi');
const { BoardsApi } = require('./pages/boardsApi');
const { ListsUi } = require('./pages/listsUi');
const axios = require('axios');

test.describe('Testing lists in Trello', async () => { 
    let browser, context, page, boardsApi, workspaceApi, listsUi;

    test.beforeEach (async({ page })=> {
        page = await context.newPage();
        listsUi = new ListsUi(page);
    });

    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
        boardsApi = new BoardsApi();
        workspaceApi = new WorkspaceApi();

        const loginPage = new LoginPage(page);
        await loginPage.logIn(credentials.email, credentials.pw);
        await expect(page).toHaveURL(`u/${credentials.userName}/boards`);
    });

    test.afterAll(async () => {
        await browser.close();
    });

    test.describe('Create lists', async () => {
        test.beforeAll(async () => {
            // Creating workspace and board whit API.
        const workspaceResponseApi = await workspaceApi.createWorkspacesApi(credentials.workSpaceName, credentials.key, credentials.token);
        expect(workspaceResponseApi.status).toBe(200);
        const boardApiResponse = await boardsApi.createBoardApi(credentials.boardName, credentials.key, credentials.token);
        expect(boardApiResponse.status).toBe(200);    
        });
        
        test('Create', async () => {
        await listsUi.loadPageOfBoards;
        await listsUi.createLists(credentials.boardName, credentials.listNameArray);
        await expect(listsUi.locatorList).toContainText(credentials.listNameArray);
        });
    });
    
    test.describe('Delete lists of a board', async () => {
        
        test('delete', async () => {
            await listsUi.loadPageOfBoards;
            await listsUi.deleteLists(credentials.boardName);
            await expect(listsUi.addListBtn).toContainText('Add a list');
        });

        test.afterEach(async () => {
                // Deleting workspace and board whit API.
            const workspaceResponseApi = await workspaceApi.deleteWorkspaceApi(credentials.key, credentials.token);
            expect(workspaceResponseApi.status).toBe(200);
            const boardApiResponse = await boardsApi.deleteBoardApi(credentials.key, credentials.token);
            expect(boardApiResponse.status).toBe(200);  
        });
    });
});





