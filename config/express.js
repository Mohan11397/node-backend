const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const Connection = (app) => {
  app.use(express.json({ extended: true, limit: "10kb" }));
  app.use(express.urlencoded({ extended: false, limit: "10kb" }));

  const corsOptions = {
    origin: "http://localhost:3000", // Your front-end URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 200,
  };
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors(corsOptions));
  app.use(cookieParser());
  //middleware
  app.use((err, req, res, next) => {
    // console.log("path: " + req.path + "method: " + req.method + "error: " + err);
    console.log("err  ", err.stack);
    res.json({ message: "Opps, something went wrong", status: "500" });
  });
};

module.exports.Connection = Connection;
