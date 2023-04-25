const { defineConfig } = require("cypress");



module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    excludeSpecPattern:[
      "**/1-getting-started/*.js",
      "**/2-advanced-examples/*.js"
    ],
    env: {
      credentials: {
        user: "username",
        password: "password",
      },
      dates: {
        email: "marcourquidi17@outlook.com",
        pw: "Hijodecain17",
      }
    }
  },
});
