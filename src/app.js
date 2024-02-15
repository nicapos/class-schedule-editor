const express = require("express");
const { resolve } = require("path");
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');

const routes = require("./routes");

const app = express();

// serve static files generated from frontend build
app.use(express.static(resolve(__dirname, "..", "client", "build")));

// enable CORS
const corsOptions = { origin: 'http://localhost:3000' };
app.use(cors(corsOptions));

// parses incoming request bodies to req.body property
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// parses cookies
app.use(cookieParser());

// handles encrypted and signed cookies
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SECRET_KEY],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  httpOnly: true,
  secure: false,
}));

// Add other middlewares here

// Register routes
app.use("/", routes);

module.exports = app;
