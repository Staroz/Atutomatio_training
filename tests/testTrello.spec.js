import { test, expect } from '@playwright/test';
const  credentials = require('../cypress/fixtures/credentials1.json');
const { chromium } = require('@playwright/test');
const { BoardsUi } = require('./pages/boardsUi.js');
const { BoardsApi } = require('./pages/boardsApi');
const { LoginPage } = require('./pages/loginPage.page');
const { WorkspaceApi } = require('./pages/workspaceApi')
const axios = require('axios');

test.describe('Test suite', async () => { 
    let browser, context, page, boardsUi, boardsApi, workspaceApi;

    test.beforeEach (async({ page })=> {
        page = await context.newPage();
        boardsUi = new BoardsUi(page);
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

    test.describe('create a new board', async () => {
        test.beforeAll(async () => {
            // Creating workspace whit API
            const workspaceResponseApi = await workspaceApi.createWorkspacesApi(credentials.workSpaceName, credentials.key, credentials.token);
            expect(workspaceResponseApi.status).toBe(200);
        });

        test('create a board whit UI', async () => {
        await boardsUi.createBoard(credentials.boardName);
        await expect(boardsUi.currentBoardName).toHaveText(credentials.boardName);
        });

        test.afterEach(async () => {
            // Deleting board with API
            const responseID = await boardsApi.getId(credentials.boardName, credentials.key, credentials.token);
            expect(responseID.status).toBe(200);
            const apiResponse = await boardsApi.deleteBoardApi(credentials.key, credentials.token)
            expect(apiResponse.status).toBe(200);
        });
    });
    
    test.describe('Update board name', async () => {
        test.beforeAll(async () => {
            // Creating board with API
            const apiResponse = await boardsApi.createBoardApi(credentials.boardName, credentials.key, credentials.token);
            expect(apiResponse.status).toBe(200);
        });
        
        test('Update board name with UI', async () => {
            await boardsUi.loadPageOfBoards;
            await boardsUi.updateBoardName(credentials.boardName, credentials.newBoardName);
            await expect(boardsUi.currentBoardName).toContainText(credentials.newBoardName);
        });

        test.afterEach(async () => {
            // Deleting board with API
            const apiResponse = await boardsApi.deleteBoardApi(credentials.key, credentials.token)
            expect(apiResponse.status).toBe(200);
        });
    });

    test.describe('Delete a Board in Trello', async () => {
        test.beforeAll(async () => {
                // Creating workspace and board with API
            const boardApiResponse = await boardsApi.createBoardApi(credentials.boardName, credentials.key, credentials.token);
            expect(boardApiResponse.status).toBe(200);    
        });

        test('Delete a board with UI', async () => {
            await boardsUi.loadPageOfBoards;
            await boardsUi.deleteBoard(credentials.boardName);
            const workspaceResponseApi = await workspaceApi.deleteWorkspaceApi(credentials.key, credentials.token);
            expect(workspaceResponseApi.status).toBe(200);
            await expect(boardsUi.confirmDeletedBoardTitle).toContainText(`${credentials.boardName} is closed.`);
        });
    });    
});





