const express = require("express");
const UserSearchController = require("../controllers/UserSearchController");
const router = express.Router();

router.route("/search").post(UserSearchController.userSearch);

module.exports = router;
