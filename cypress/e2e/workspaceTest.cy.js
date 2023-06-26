/// <reference types= "cypress" />

describe("Manipulating Workspaces in Trello", function() {
    before(function() {
        cy.fixture("credentials.json").as('credentials');
    });
    
    beforeEach(function () {
        cy.login(this.credentials.email, this.credentials.pw, this.credentials.userName);
	});

    after(function() {
        cy.logout(this.credentials.userName);
    });

    describe("Create a workspace whit UI", function () {
		it("Create workspace", function () {
				cy.visit(`/u/" + ${this.credentials.userName} + "/boards`);
				cy.createWorkSpace(this.credentials.workSpaceName);
                cy.get('[data-testid="home-team-tab-name"]').contains(this.credentials.workSpaceName).should('be.visible');
		});

        after(function () {
            cy.getWorkSpacedId(this.credentials.key, this.credentials.token, this.credentials.workSpaceName);
            cy.workSpaceDeleteApi(this.credentials.key, this.credentials.token);
        });
	});

	describe("Delete a workspace whit UI", function () {
		before(function() {
            cy.workSpaceCreateApi(this.credentials.key, this.credentials.token, this.credentials.workSpaceName);
            });
		it("Delete workspace", function() {
			cy.visit('/u/'+this.credentials.userName +'/boards');
            cy.deleteWorkSpace(this.credentials.workSpaceName);
            cy.get('[data-testid="home-team-tab-name"]').should('not.exist');
		});
	});
});
