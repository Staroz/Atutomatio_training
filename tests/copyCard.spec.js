import { test, expect } from '@playwright/test';
const  credentials = require('../cypress/fixtures/credentials1.json');
const { chromium } = require('@playwright/test');
const { LoginPage } = require('./pages/loginPage.page');
const { BoardsApi } = require('./pages/boardsApi');
const { CardsUi } = require('./pages/cardsUi')

test.describe('Copy a cards in another list', async () => { 
    let browser, context, page, boardsApi, cardsUi;

    test.beforeEach (async({ page })=> {
        page = await context.newPage();
        cardsUi = new CardsUi(page);
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
    
    test.describe('Copy a card', async () => {
        
        test.beforeAll(async () => {
                // Creating workspace, board, lists and cards whit API.
            const cardsApiResponse = await boardsApi.createCardsApi(credentials.workSpaceName, credentials.boardName, credentials.key, credentials.token, credentials.cardsNameArray, credentials.listNameArray);
            expect(cardsApiResponse.status).toBe(200);
        });

        test('Copy Card 01 to In Progress list', async () => {
            await cardsUi.copyCard(credentials.cardsNameArray[0], credentials.copiedCardInfo.copyCardName, credentials.boardName, credentials.listNameArray[1], credentials.copiedCardInfo.positionOfCard);
            await expect(cardsUi.listBlockLocator.filter({hasText: credentials.listNameArray[1]})).toContainText(credentials.copiedCardInfo.copyCardName);
        });

        test.afterAll(async () => {
                // Deleting boards and workspaces with API
            const boardApiResponse = await boardsApi.deleteBoardApi(credentials.key, credentials.token);
            expect(boardApiResponse.status).toBe(200);  
            const workspaceResponseApi = await boardsApi.workspaceApi.deleteWorkspaceApi(credentials.key, credentials.token);
            expect(workspaceResponseApi.status).toBe(200);
        });
    });
});




