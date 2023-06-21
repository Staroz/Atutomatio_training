import { test, expect } from '@playwright/test';
const  credentials = require('../cypress/fixtures/credentials1.json');
const { chromium } = require('@playwright/test');
const { LoginPage } = require('./pages/loginPage.page');
const { WorkspaceApi } = require('./pages/workspaceApi');
const { BoardsApi } = require('./pages/boardsApi');
const { CardsUi } = require('./pages/cardsUi')
const axios = require('axios');


test.describe('Testing cards in Trello', async () => { 
    let browser, context, page, boardsApi, workspaceApi, cardsUi;

    test.beforeEach (async({ page })=> {
        page = await context.newPage();
        cardsUi = new CardsUi(page);
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

    test.describe('Create cards in a board', async () => {
        test.beforeAll(async () => {
            // Creating workspace, board and lists whit API.
        const workspaceResponseApi = await workspaceApi.createWorkspacesApi(credentials.workSpaceName, credentials.key, credentials.token);
        expect(workspaceResponseApi.status).toBe(200);
        const boardApiResponse = await boardsApi.createBoardApi(credentials.boardName, credentials.key, credentials.token);
        expect(boardApiResponse.status).toBe(200);    
        const listApiResponse = await boardsApi.createListsApi( credentials.key, credentials.token, credentials.listNameArray);
        expect(listApiResponse.status).toBe(200);  
        });
        
        test('Create', async () => {
            await cardsUi.loadPageOfBoards;
            await cardsUi.createCards(credentials.boardName, credentials.listNameArray[0], credentials.cardsNameArray);
            await expect(cardsUi.listBlockLocator.filter({hasText: credentials.listNameArray[0]})).toContainText(credentials.cardsNameArray[0]);
        });

    });
    
    test.describe('Updating information of a card', async () => {
        
        test('Add Description in a card', async () => {
            await cardsUi.loadPageOfBoards;
            await cardsUi.enterBoardBtn.getByText(credentials.boardName).first().click();
            await cardsUi.addDescriptionInCard(credentials.cardsNameArray[0], credentials.descriptionText);
            await expect(cardsUi.descriptionTextInput).toContainText(credentials.descriptionText);
        });
        test('Add member in a card', async () => {
            await cardsUi.loadPageOfBoards;
            await cardsUi.enterBoardBtn.getByText(credentials.boardName).first().click();
            await cardsUi.addMember(credentials.cardsNameArray[0], credentials.userName);
            await expect(cardsUi.membersInCardIcon).toBeVisible();
        });

        test('Add a label', async () => {
            await cardsUi.loadPageOfBoards;
            await cardsUi.enterBoardBtn.getByText(credentials.boardName).first().click();
            await cardsUi.addLabel(credentials.cardsNameArray[0], credentials.labelColor.red);
            await expect(cardsUi.labelColorBtn).toHaveAttribute('data-color', credentials.labelColor.red);
        });

        test('Add a checklist', async () => {
            await cardsUi.loadPageOfBoards;
            await cardsUi.enterBoardBtn.getByText(credentials.boardName).first().click();
            await cardsUi.addChecklists(credentials.cardsNameArray[0], credentials.checklistName);
            await expect(cardsUi.checklistNameList).toContainText(credentials.checklistName);
        });

        test('Add a cover', async () => {
            await cardsUi.loadPageOfBoards;
            await cardsUi.enterBoardBtn.getByText(credentials.boardName).first().click();
            await cardsUi.addCovers(credentials.cardsNameArray[0], credentials.coverImageNumber.Cover2);
            await expect(cardsUi.coverInterface).toBeVisible();
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





