import { test, expect } from '@playwright/test';
const  credentials = require('../cypress/fixtures/credentials1.json');
const { chromium } = require('@playwright/test');
const { LoginPage } = require('./pages/loginPage.page');
const { WorkspaceApi } = require('./pages/workspaceApi');
const { BoardsApi } = require('./pages/boardsApi');
const { ListsUi } = require('./pages/listsUi')

test.describe('Archive a list of a board with more than one list', async () => { 
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
    
    test.describe('Archive a list', async () => {
        
        test.beforeAll(async () => {
            // Creating workspace, board, and lists  whit API.
        const workspaceResponseApi = await workspaceApi.createWorkspacesApi(credentials.workSpaceName, credentials.key, credentials.token);
        expect(workspaceResponseApi.status).toBe(200);
        const boardApiResponse = await boardsApi.createBoardApi(credentials.boardName, credentials.key, credentials.token);
        expect(boardApiResponse.status).toBe(200);    
        const listApiResponse = await boardsApi.createListsApi( credentials.key, credentials.token, credentials.listNameArray);
        expect(listApiResponse.status).toBe(200);

        });

        test('Archive "In Progress" list', async () => {
            await listsUi.loadPageOfBoards;
            await listsUi.archivedList(credentials.boardName, credentials.listNameArray[1]);
            await expect(listsUi.listBlockLocator).not.toContainText(credentials.listNameArray[1]);
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




