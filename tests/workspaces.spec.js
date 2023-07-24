import { test, expect } from '@playwright/test';
const  credentials = require('../cypress/fixtures/credentials1.json');
const { chromium } = require('@playwright/test');
const { LoginPage } = require('./pages/loginPage.page');
const { WorkspaceUi } = require('./pages/workspacesUi');
const { WorkspaceApi } = require('./pages/workspaceApi');


test.describe('Testing workspaces in Trello', async () => { 
    let browser, context, page, workspaceApi, workspaceUi;

    test.beforeEach (async({ page })=> {
        page = await context.newPage();
        workspaceUi = new WorkspaceUi(page);
        workspaceApi = new WorkspaceApi();
    });

    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();

        const loginPage = new LoginPage(page);
        await loginPage.logIn(credentials.email, credentials.pw);
        await expect(page).toHaveURL(`u/${credentials.userName}/boards`);
    });


    test.afterAll(async () => {
        await browser.close();
    });

    test.describe('Create a workspace', async () => {
        test('Create', async () => {
        await workspaceUi.createWorkspace(credentials.workSpaceName);
        await expect(workspaceUi.selectWorkspaceBtn).toContainText([credentials.workSpaceName]);
        });

        test.afterEach(async () => {
            // Deleting workspace with API
            const responseId1 = await  workspaceApi.getWorkspaceId(credentials.workSpaceName, credentials.key, credentials.token);
            expect(responseId1.status).toBe(200);
            const apiResponse = await workspaceApi.deleteWorkspaceApi(credentials.key, credentials.token);
            expect(apiResponse.status).toBe(200);
        });
    });
    
    test.describe('Dele a workspace', async () => {
        test.beforeAll(async () => {
            // Creating workspace with API
            const apiResponse = await workspaceApi.createWorkspacesApi(credentials.workSpaceName, credentials.key, credentials.token);
            expect(apiResponse.status).toBe(200);
        });
        
        test('Delete', async () => {
            await workspaceUi.deleteWorkspace(credentials.workSpaceName);
            await expect(page.locator('.WvATk6EiWx7jhz')).not.toContainText([credentials.workSpaceName]);
        });
    });
});





