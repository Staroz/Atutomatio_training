const { defineConfig } = require("cypress");


module.exports = defineConfig({
  defaultCommandTimeout: 15000,
  viewportWidth: 1200,
  viewportHeight: 660,
  experimentalModifyObstructiveThirdPartyCode: true,
  env: {
    urlApi: 'https://api.trello.com/1'
  },
  e2e: {
    experimentalSessionAndOrigin: true,
    baseUrl: "https://trello.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    excludeSpecPattern:[
      "**/1-getting-started/*.js",
      "**/2-advanced-examples/*.js"
    ],
  },
});

