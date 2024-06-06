const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'cypress-university-tests',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
    baseUrl: "https://www.saucedemo.com/",
    viewportWidth: 1920,
    viewportHeight: 1080,
    watchForFileChanges: false,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
