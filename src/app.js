const express = require("express");
const { resolve } = require("path");
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const routes = require("./routes");

const app = express();

app.set('trust proxy', 1);

// serve static files generated from frontend build
// app.use(express.static(resolve(__dirname, "..", "client", "build")));

// serve images saved to uploads
app.use('/uploads', express.static('uploads'));

const corsMiddleware = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  
  // Allow additional headers if needed
  // res.setHeader('Access-Control-Allow-Headers', 'Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  next();
};
app.use(corsMiddleware);

// parses incoming request bodies to req.body property
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// parses cookies
app.use(cookieParser());

// handles encrypted and signed cookies
app.use(cookieSession({
  name: 'cse-session',
  keys: [process.env.SECRET_KEY],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  httpOnly: true,
  secure: false,
}));

// Add other middlewares here

// Register routes
app.use("/", routes);

module.exports = app;
