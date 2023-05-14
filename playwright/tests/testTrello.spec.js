import { test, expect } from '@playwright/test';
const  credentials = require('../fixtures/credentials1.json');
const { chromium } = require('@playwright/test');

test.describe('Test suite', async () => {
    let browser, context, page;

    test.beforeAll(async () => {
    
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
        
        await page.goto('https://trello.com/');
        await page.getByTestId('bignav').getByRole('link', { name: 'Log in' }).click();
        await page.getByPlaceholder('Enter email').click();
        await page.getByPlaceholder('Enter email').fill(credentials.email);
        await page.getByRole('button', { name: 'Continue' }).click();
        await page.getByPlaceholder('Enter password').fill(credentials.pw);
        await page.getByRole('button', { name: 'Log in' }).click();
        await Promise.all([
        page.waitForNavigation(),
        page.click('#login-submit')
        ]);
        await expect(page).toHaveURL(credentials.userName);
    });

    test.afterEach(async () => {
        await page.locator('[class="frrHNIWnTojsww GDunJzzgFqQY_3 bxgKMAm3lq5BpA HAVwIqCeMHpVKh SEj5vUdI3VvxDc"]').click({force: true});
        await page.locator('[class="board-menu-navigation-item-link js-open-more"]').click();
        await page.locator('[class="board-menu-navigation-item-link js-close-board"]').click({force: true});
        await page.locator('[class="js-confirm full nch-button nch-button--danger"]').click(); 
        await page.locator('[data-testid="close-board-delete-board-button"]').click();
        await page.locator('[data-testid="close-board-delete-board-confirm-button"]').click();
        await expect(page.getByText(credentials.boardName)).not.toBeVisible();
    });

    test.afterAll(async () => {
        await browser.close();
    });

    test('create a new board', async () => {
        await page.locator('[data-testid="create-board-tile"]').click();
        await page.getByTestId('create-board-title-input').click();
        await page.getByTestId('create-board-title-input').fill(credentials.boardName);
        await page.getByTestId('create-board-submit-button').click();
        await expect(page.getByRole('link', {name: credentials.boardName})).toBeVisible();
    });
    
    test('Update board name', async () => {
        await page.locator('[data-testid="create-board-tile"]').click();
        await page.locator('[data-testid="create-board-title-input"]').click();
        await page.getByTestId('create-board-title-input').fill(credentials.boardName);
        await page.getByTestId('create-board-submit-button').click();
        await page.locator('[data-testid="board-name-display"]').click();
        await page.locator('[data-testid="board-name-input"]').fill(credentials.newBoardName);
        await page.locator('[data-testid="board-name-input"]').press('Enter');
        await expect(page.locator('[data-testid="board-name-display"]')).toContainText(credentials.newBoardName);
    })
});




