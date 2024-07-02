const express = require("express");
const { Database } = require("./config/db");
const { Router } = require("./config/routes");
const { Connection } = require("./config/express");
require("dotenv").config();
const app = express();
const path = require("path");

//express connection
Connection(app);
// database connection
Database();

app.get("/download-image", (req, res) => {
  const file = path.resolve(__dirname, "public/uploads/lok_sabha.jpg");
  console.log("Sending file:", file);
  res.download(file); // Set disposition and send it.

  // res.status(200);
});

//Router connection
Router(app);

//middleware
app.use((err, req, res, next) => {
  // console.log("err  ", err.message);
  res.json({
    message: err.message,
    status: err.status ? err.status : 500,
  });
});

app.listen(process.env.PORT, () => {
  console.log("DB connected Successfully and Listening to " + process.env.PORT);
});
