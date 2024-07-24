const express = require("express");
const healthCheckController = require("../controllers/healthCheckController");
const router = express.Router();

router.route("/").get(healthCheckController.healthCheck);

module.exports = router;
