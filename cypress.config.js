const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://marsair.recruiting.thoughtworks.net/ViniciusEstevesCelestino',
    viewportHeight: 720,
    viewportWidth: 1280,
    // If were in a CI - retries: 3
  },
})
