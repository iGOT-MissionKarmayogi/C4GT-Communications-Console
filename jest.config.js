module.exports = {
  testMatch: ["**/tests/user.test.js"],
  collectCoverage: true,

  collectCoverageFrom: ["controllers/UserSearchController.js"],
  coverageDirectory: "coverage",
};
