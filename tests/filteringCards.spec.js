import { test, expect } from '@playwright/test';
const  credentials = require('../cypress/fixtures/credentials1.json');
const { chromium } = require('@playwright/test');
const { LoginPage } = require('./pages/loginPage.page');
const { BoardsApi } = require('./pages/boardsApi');
const { CardsUi } = require('./pages/cardsUi')

test.describe('Filter just a card for an attribute ', async () => { 
    let browser, context, page, boardsApi, cardsUi;

    test.beforeEach (async()=> {
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
    
    test.describe('Creating cards with an attribute for each one', async () => {
        
        test.beforeAll(async () => {
                // Creating workspace, board, lists and cards whit API.
            const cardsApiResponse = await boardsApi.createListsAndCardsApi(credentials.workSpaceName, credentials.boardName, credentials.key, credentials.token, credentials.cardsNameArray, credentials.listNameArray);
            expect(cardsApiResponse.status).toBe(200);           
        });

        test('Adding an Attribute to all cards', async () => {
            await cardsUi.createCards(credentials.boardName, credentials.listNameArray[0], [credentials.criteriaValue.text])         
            await cardsUi.addLabelOfList(credentials.listNameArray[0], credentials.cardsNameArray[0], credentials.labelColor.green);
            await cardsUi.addLabelOfList(credentials.listNameArray[0], credentials.cardsNameArray[1], credentials.labelColor.orange);
            await cardsUi.addMemberOfList(credentials.listNameArray[0], credentials.cardsNameArray[2], credentials.userName);
            await cardsUi.addLabelOfList(credentials.listNameArray[1], credentials.cardsNameArray[0], credentials.labelColor.red);
            await cardsUi.addLabelOfList(credentials.listNameArray[1], credentials.cardsNameArray[1], credentials.labelColor.blue);
            await cardsUi.addLabelOfList(credentials.listNameArray[1], credentials.cardsNameArray[2], credentials.labelColor.purple);
            await cardsUi.addLabelOfList(credentials.listNameArray[2], credentials.cardsNameArray[2], credentials.labelColor.yellow);
            expect(cardsUi.cardSelector).toHaveCount(10);
        });

        test('filtering card', async () => {
            await cardsUi.chooseBoard(credentials.boardName);            
            await cardsUi.cardsFilter(credentials.filterCriteria.text, credentials.criteriaValue.text);
            expect(cardsUi.cardsCount).toContainText('1');
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




