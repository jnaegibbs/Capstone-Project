/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/mocks/fileMock.js",
    "\\.(css|less)$": "identity-obj-proxy",
  },
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ["<rootDir>/mocks/prismaMock.js"],

  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  //setupFiles: ["./jest.polyfills.js"],
  setupFiles: ["./jest.polyfills.js", "<rootDir>/mocks/localStorageMock.js"],
 
};
