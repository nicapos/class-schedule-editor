const express = require("express");
const { resolve } = require("path");

const routes = require("./routes");

const app = express();

// serve static files generated from frontend build
app.use(express.static(resolve(__dirname, "..", "client", "build")));

// parses incoming request bodies to req.body property
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add other middlewares here

// Register routes
app.use("/", routes);

module.exports = app;
