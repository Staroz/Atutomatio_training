const { defineConfig } = require("cypress");


module.exports = defineConfig({
  defaultCommandTimeout: 7000,
  
  viewportWidth: 1200,
  viewportHeight: 660,
  experimentalModifyObstructiveThirdPartyCode: true,
  e2e: {
    experimentalSessionAndOrigin: true,
    baseUrl: 'https://trello.com/home',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    excludeSpecPattern:[
      "**/1-getting-started/*.js",
      "**/2-advanced-examples/*.js"
    ],
    env: {
      credentials: {

      },
    }
  },
});
