const searchAsync = require("../utils/routerManager");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

exports.healthCheck = searchAsync(async (req, res, next) => {
  const isConnected = mongoose.connection.readyState === 1;
  console.log("----------DB CONNECTION---------", isConnected);
  const resmsgid = uuidv4();
  const timestamp = new Date().toISOString();

  res.json({
    id: "api.user.health",
    ver: "1.0",
    ts: timestamp,
    params: {
      resmsgid: resmsgid,
      msgid: null,
      err: isConnected ? null : "DB_CONNECTION_ERROR",
      status: isConnected ? "successful" : "failed",
      errmsg: isConnected ? null : "Database connection failed",
    },
    responseCode: isConnected ? "200" : "500",
    result: {},
  });
});
