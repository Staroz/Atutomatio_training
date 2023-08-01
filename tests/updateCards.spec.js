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

    test.describe('Updating information of a card', async () => {
        test.beforeAll(async () => {
                // Creating cards with API
            const cardsApiResponse = await boardsApi.createCardsApi(credentials.workSpaceName, credentials.boardName, credentials.key, credentials.token, credentials.cardsNameArray, credentials.listNameArray);
            expect(cardsApiResponse.status).toBe(200);
        });

        test('Add Description in a card', async () => {
            await cardsUi.addDescriptionInCard(credentials.boardName, credentials.cardsNameArray[0], credentials.descriptionText);
            await expect(cardsUi.descriptionTextInput).toContainText(credentials.descriptionText);
        });
        test('Add member in a card', async () => {
            await cardsUi.addMember(credentials.boardName, credentials.cardsNameArray[0], credentials.userName);
            await expect(cardsUi.membersInCardIcon).toBeVisible();
        });

        test('Add a label', async () => {
            await cardsUi.addLabel(credentials.boardName, credentials.cardsNameArray[0], credentials.labelColor.red);
            await expect(cardsUi.labelColorBtn).toHaveAttribute('data-color', credentials.labelColor.red);
        });

        test('Add a checklist', async () => {
            await cardsUi.addChecklists(credentials.boardName, credentials.cardsNameArray[0], credentials.checklistName);
            await expect(cardsUi.checklistNameList).toContainText(credentials.checklistName);
        });

        test('Add a cover', async () => {
            await cardsUi.addCovers(credentials.boardName, credentials.cardsNameArray[0], credentials.coverImageNumber.Cover2);
            await expect(cardsUi.coverInterface).toBeVisible();
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





