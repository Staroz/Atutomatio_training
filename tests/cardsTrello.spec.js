import { test, expect } from '@playwright/test';
const  credentials = require('../cypress/fixtures/credentials1.json');
const { chromium } = require('@playwright/test');
const { LoginPage } = require('./pages/loginPage.page');
const { BoardsApi } = require('./pages/boardsApi');
const { CardsUi } = require('./pages/cardsUi')


test.describe('Testing cards in Trello', async () => { 
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

    test.describe('Create cards in a board', async () => {
        test.beforeAll(async () => {
                // Creating workspace, board and lists whit API.
            const listsApiResponse = await boardsApi.createListsApi(credentials.workSpaceName, credentials.boardName, credentials.key, credentials.token, credentials.listNameArray);
            expect(listsApiResponse.status).toBe(200);
        });
        
        test('Create', async () => {
            await cardsUi.createCards(credentials.boardName, credentials.listNameArray[0], credentials.cardsNameArray);
            await expect(cardsUi.listBlockLocator.filter({hasText: credentials.listNameArray[0]})).toContainText(credentials.cardsNameArray[0]);
        });

        test.afterAll(async () => {
                // Deleting boards and workspaces
            const boardApiResponse = await boardsApi.deleteBoardApi(credentials.key, credentials.token);
            expect(boardApiResponse.status).toBe(200);  
            const workspaceResponseApi = await boardsApi.workspaceApi.deleteWorkspaceApi(credentials.key, credentials.token);
            expect(workspaceResponseApi.status).toBe(200);
    });
    });
    
    test.describe('Moving cards for the lists', async () => {
        
        test.beforeAll(async () => {
                // Creating workspace, board, lists and cards whit API.
            const cardsApiResponse = await boardsApi.createCardsApi(credentials.workSpaceName, credentials.boardName, credentials.key, credentials.token, credentials.cardsNameArray, credentials.listNameArray);
            expect(cardsApiResponse.status).toBe(200);
        });
        
        test('Moving cards for the lists', async () => {
            await cardsUi.chooseBoard(credentials.boardName);
            await cardsUi.moveCard(credentials.cardsNameArray[0], credentials.listNameArray[1],);
            await cardsUi.moveCard(credentials.cardsNameArray[0], credentials.listNameArray[2],);
            await expect(cardsUi.locatorList.filter({hasText: credentials.listNameArray[2]})).toContainText(credentials.cardsNameArray[0]);
            await cardsUi.moveCard(credentials.cardsNameArray[1], credentials.listNameArray[1],);
            await expect(cardsUi.listBlockLocator.filter({hasText: credentials.listNameArray[1]})).toContainText(credentials.cardsNameArray[1]);
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





