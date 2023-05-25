import { test, expect } from '@playwright/test';
const  credentials = require('../cypress/fixtures/credentials1.json');
const { chromium } = require('@playwright/test');
import { Commands } from './pages/commandsUi.page';
import { ApiCommands } from './pages/apiCommands.page';
import { LoginPage } from './pages/loginPage.page';
const axios = require('axios');


test.describe('Test suite', async () => {

    let browser, context, page;

    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
        const userMethod = new LoginPage(page);

        await userMethod.gotoPage();
        await userMethod.enterEmail(credentials.email);
        await userMethod.enterPassword(credentials.pw);
        await expect(page).toHaveURL('');
    });


    test.afterAll(async () => {
        await browser.close();
    });

    test.describe('create a new board', async () => {
        test('create a board whit UI', async () => {
        const userMethod = new Commands(page);
        await userMethod.createBoard(credentials.boardName);
        await expect(userMethod.currentBoardName).toHaveText(credentials.boardName);

        });
        test.afterEach(async () => {
            // Board delete whit API
            const useMethod = new ApiCommands();
            
            const responseID = await useMethod.getId(credentials.boardName, credentials.key, credentials.token);
            expect(responseID.status).toBe(200);
            const apiResponse = await useMethod.deleteBoardApi(credentials.key, credentials.token)
            expect(apiResponse.status).toBe(200);
        });
    });
    
    test.describe('Update board name', async () => {
        test.beforeAll(async () => {
            // Board created whit API
            const userMethod = new ApiCommands();
            const apiResponse = await userMethod.createBoardApi(credentials.boardName, credentials.key, credentials.token);
            expect(apiResponse.status).toBe(200);
        });
        
        test('Update board name with UI', async () => {
            const userMethod = new Commands(page);
            
            await userMethod.pageOfBoards;
            await userMethod.updateBoard(credentials.boardName, credentials.newBoardName);
            await expect(userMethod.currentBoardName).toContainText(credentials.newBoardName);
        });
        test.afterEach(async () => {
            // Board deleted whit API
            const useMethod = new ApiCommands();

            const responseID = await useMethod.getId(credentials.newBoardName, credentials.key, credentials.token);
            expect(responseID.status).toBe(200);
            const apiResponse = await useMethod.deleteBoardApi(credentials.key, credentials.token)
            expect(apiResponse.status).toBe(200);
        });

    });

    test.describe('Delete a Board in Trello', async () => {
        test.beforeAll(async () => {
            const userMethod = new ApiCommands();

            const apiResponse = await userMethod.createBoardApi(credentials.boardName, credentials.key, credentials.token);
            expect(apiResponse.status).toBe(200);
        });

        test('Delete a board with UI', async () => {
            const userMethod = new Commands(page);

            await userMethod.pageOfBoards;
            await userMethod.deleteBoard(credentials.boardName);
            await expect(userMethod.confirmDeletedBoard).toContainText(`${credentials.boardName} is closed.`);
        });
    });    
});





