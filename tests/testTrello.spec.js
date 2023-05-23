import { test, expect } from '@playwright/test';
const  credentials = require('../cypress/fixtures/credentials1.json');
const { chromium } = require('@playwright/test');
const { Commands } = require('./pages/commandsUi');
const { ApiCommands } = require('./pages/apiCommands');
const { LoginPage } = require('./pages/loginPage');

test.describe('Test suite', async () => {

    let browser, context, page;
    
    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
        const userMethod = new LoginPage(page)
        await userMethod.gotoPage();
        await userMethod.enterEmail(credentials.email);
        await userMethod.enterPassword(credentials.pw);
    });


    test.afterAll(async () => {
        await browser.close();
    });

    test.describe('create a new board', async () => {
        test('create a board whit UI', async () => {
        const userMethod = new Commands(page);
        await userMethod.createBoard(credentials.boardName);

        });
        test.afterEach(async () => {
            // Board delete whit API
            const useMethod = new ApiCommands(page);
            await useMethod.getId(credentials.boardName, credentials.key, credentials.token);
            await useMethod.deleteBoardApi(credentials.key, credentials.token);
        });
    });
    
    test.describe('Update board name', async () => {
        test.beforeAll(async () => {
            // Board created whit API
            const userMethod = new ApiCommands(page);
            await userMethod.createBoardApi(credentials.boardName, credentials.key, credentials.token);
        });
        
        test('Update board name with UI', async () => {
            const userMethod = new Commands(page);
            
            await page.goto('u/staroztesting/boards');
            await userMethod.updateBoard(credentials.newBoardName);

        });
        test.afterEach(async () => {
            // Board deleted whit API
            const useMethod = new ApiCommands(page);
            await useMethod.getId(credentials.newBoardName, credentials.key, credentials.token);
            await useMethod.deleteBoardApi(credentials.key, credentials.token);
        });

    });

    test.describe('Delete a Board in Trello', async () => {
        test.beforeAll(async () => {
            const userMethod = new ApiCommands(page);
            await userMethod.createBoardApi(credentials.boardName, credentials.key, credentials.token);
        });

        test('Delete a board with UI', async () => {
            const userMethod = new Commands(page);
            await page.goto(`u/${credentials.userName}/boards`);
            await userMethod.deleteBoard(credentials.boardName);
        });
    });    
});





