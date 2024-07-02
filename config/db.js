const mongoose = require("mongoose");
require("dotenv").config();

const Database = () => {
  const dbUrl = process.env.MONGO_URI;
  mongoose.connect(dbUrl);
  const db = mongoose.connection;

  db.on("error", (err) => {
    console.error("Error connecting to the database:", err);
  });

  db.on("connected", () => {
    console.log("Database connected successfully");
  });
};

module.exports.Database = Database;
