const credentials = require('../../cypress/fixtures/credentials.json');

exports.WorkspaceUi = class WorkspaceUi {

	/**
	 * @param {import('@playwright/test').Page} page
	 */
	constructor(page, userName) {
		// general locators  
		this.page = page;
		this.loadPageOfBoards = page.goto(`u/${credentials.userName}/boards`);
		// create a workspace
		this.createBtn = page.locator('[data-testid="header-create-menu-button"]');
		this.createWorkspaceBtn = page.locator('[data-testid="header-create-team-button"]');
		this.workspaceNameInput = page.locator('[data-testid="header-create-team-name-input"]');
		this.selectWorkspaceType = page.locator('[class=" css-1og2rpm"]');
        this.selectWorkspaceTypeEducation = page.getByTestId('header-create-team-type-input-education');
        this.continueCreateWorkspaceBtn = page.locator('[data-testid="header-create-team-submit-button"]');
        this.doInvitationLaterBtn = page.locator('[data-testid="show-later-button"]');
		// Delete a workspace
		this.selectWorkspaceBtn = page.locator('[data-testid="home-team-tab-name"]');
		this.settingsWorkspaceBtn = page.locator('[data-testid="home-team-settings-tab"]');
		this.deleteWorkspaceBtn = page.locator('[data-testid="delete-workspace-button"]');
		this.fillWorkspaceNameInput = page.locator('[id="confirmWorkspaceName"]');
        this.confirmDeleteWorkspaceBtn = page.locator('[data-testid="delete-workspace-confirm-button"]');
	}

	async createWorkspace(workspaceName) {
		await this.createBtn.click();
		await this.createWorkspaceBtn.click();
		await this.workspaceNameInput.fill(workspaceName);
		await this.selectWorkspaceType.click();
        await this.selectWorkspaceTypeEducation.getByText('Education').click();
        await this.continueCreateWorkspaceBtn.click();
        await this.doInvitationLaterBtn.click();
	};

	async deleteWorkspace(workspaceName) {
		if (await this.settingsWorkspaceBtn.isVisible()) {
            await this.settingsWorkspaceBtn.click();
        } else {
            await this.selectWorkspaceBtn.getByText(workspaceName).click();
            await this.settingsWorkspaceBtn.click();
        }
		await this.deleteWorkspaceBtn.click();
		await this.fillWorkspaceNameInput.fill(workspaceName);
        await this.confirmDeleteWorkspaceBtn.click();
	};
};
