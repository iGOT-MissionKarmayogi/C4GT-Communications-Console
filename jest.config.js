module.exports = {
  testMatch: ["**/tests/userSearch.test.js", "**/tests/userModel.test.js"],
  collectCoverage: true,

  collectCoverageFrom: [
    "controllers/UserSearchController.js",
    "models/**/*.js",
  ],
  coverageDirectory: "coverage",
};
