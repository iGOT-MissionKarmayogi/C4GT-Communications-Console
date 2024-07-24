require("dotenv").config();

// express
const express = require("express");
let app = express();

// required modules
const bodyParser = require("body-parser");
const cors = require("cors");

//To enable cors
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB Connection
const connectDB = require("./db");

// Routes
const userSearchRoutes = require("./routes/userSearchRoutes");
const healthRoutes = require("./routes/healthCheckRoute");

app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// listen to PORT
app.listen(process.env.APPLICATION_PORT || 3000, () => {
  console.log("Environment : " + process.env.APPLICATION_ENV);
  console.log(
    "Application is running on the port :" + process.env.APPLICATION_PORT
  );
});

// Routes in the application
app.use("/user/v1", userSearchRoutes);
app.use("/health", healthRoutes);
