const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 8000,
    env: {
      adminUser: "",
      adminPassword: "",
      totemUser: "",
      totemPassword: "",
      totemClientUrl: "http://localhost:5173",
      totemId: "",
      gridfsFileId: "",
    },
  },
})

