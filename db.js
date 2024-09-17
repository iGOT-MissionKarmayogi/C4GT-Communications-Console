const mongoose = require("mongoose");

const mongoDBUri = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBUri);
    console.log("MongoDB CONNECTED");
  } catch (error) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = connectDB;
