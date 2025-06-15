const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.mongodb_URL;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connect to MongoDB server");
});

db.on("disconnected", () => {
  console.log("MongoDB server Disconneted");
});

db.on("error", (error) => {
  console.log(error);
});

module.exports = db;
