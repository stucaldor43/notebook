module.exports = {
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testEnvironment: "./__test-utils__/custom-jest-environment.js"
}