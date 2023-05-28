import { test, expect } from '@playwright/test';
const  credentials = require('../cypress/fixtures/credentials1.json');
const { chromium } = require('@playwright/test');
import { UiHandling } from './pages/UiHandling.page';
import { ApiCommands } from './pages/apiCommands.page';
import { LoginPage } from './pages/loginPage.page';
const axios = require('axios');


test.describe('Test suite', async () => {

    let browser, context, page;

    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
        const loginPage = new LoginPage(page);

        await loginPage.gotoPage();
        await loginPage.enterEmail(credentials.email);
        await loginPage.enterPassword(credentials.pw);
        await expect(page).toHaveURL(`u/${credentials.userName}/boards`);
    });


    test.afterAll(async () => {
        await browser.close();
    });

    test.describe('create a new board', async () => {
        test('create a board whit UI', async () => {
        const uiHandling = new UiHandling(page);
        await uiHandling.createBoard(credentials.boardName);
        await expect(uiHandling.currentBoardName).toHaveText(credentials.boardName);

        });
        test.afterEach(async () => {
            // Board delete whit API
            const apiCommands = new ApiCommands();
            
            const responseID = await apiCommands.getId(credentials.boardName, credentials.key, credentials.token);
            expect(responseID.status).toBe(200);
            const apiResponse = await apiCommands.deleteBoardApi(credentials.key, credentials.token)
            expect(apiResponse.status).toBe(200);
        });
    });
    
    test.describe('Update board name', async () => {
        test.beforeAll(async () => {
            // Board created whit API
            const apiCommands = new ApiCommands();
            const apiResponse = await apiCommands.createBoardApi(credentials.boardName, credentials.key, credentials.token);
            expect(apiResponse.status).toBe(200);
        });
        
        test('Update board name with UI', async () => {
            const uiHandling = new UiHandling(page);
            
            await uiHandling.loadPageOfBoards;
            await uiHandling.updateBoardName(credentials.boardName, credentials.newBoardName);
            await expect(uiHandling.currentBoardName).toContainText(credentials.newBoardName);
        });
        test.afterEach(async () => {
            // Board deleted whit API
            const apiCommands = new ApiCommands();

            const responseID = await apiCommands.getId(credentials.newBoardName, credentials.key, credentials.token);
            expect(responseID.status).toBe(200);
            const apiResponse = await apiCommands.deleteBoardApi(credentials.key, credentials.token)
            expect(apiResponse.status).toBe(200);
        });

    });

    test.describe('Delete a Board in Trello', async () => {
        test.beforeAll(async () => {
            const apiCommands = new ApiCommands();

            const apiResponse = await apiCommands.createBoardApi(credentials.boardName, credentials.key, credentials.token);
            expect(apiResponse.status).toBe(200);
        });

        test('Delete a board with UI', async () => {
            const uiHandling = new UiHandling(page);

            await uiHandling.loadPageOfBoards;
            await uiHandling.deleteBoard(credentials.boardName);
            await expect(uiHandling.confirmDeletedBoardTitle).toContainText(`${credentials.boardName} is closed.`);
        });
    });    
});





