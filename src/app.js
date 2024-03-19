const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const swaggerDocs = require("./middleware/docs");
const errorHandler = require('./middleware/errorHandler');

const routes = require("./routes");

const app = express();

dotenv.config();

// serve images saved to uploads
app.use("/uploads", express.static("uploads"));

// handle CORS
app.set("trust proxy", 1);
app.use(require("./middleware/cors"));

// parses incoming request bodies to req.body property
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// parses cookies
app.use(cookieParser());

// handles encrypted and signed cookies
app.use(
  cookieSession({
    name: "cse-session",
    keys: [process.env.SECRET_KEY],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    secure: false,
  })
);

// Add other middlewares here
app.use(errorHandler);

// Register routes
app.use("/", routes);

// Setup DB
const db = require("./models");

// Configure SSL
const fs = require('fs')
var path = require('path');
const key = fs.readFileSync(path.resolve('src/certs/localhost.key'))
const cert = fs.readFileSync(path.resolve('src/certs/localhost.crt'))

const https = require('https')
const server = https.createServer({ key, cert }, app)

// Check if --reset flag is present in the command-line arguments
const hasResetFlag = process.argv.indexOf('--reset') !== -1;

db.sequelize.sync({ force: hasResetFlag })
  .then(() => console.log("Synced db."))
  .catch((err) => console.log("Failed to sync db: " + err.message));


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} (available at https://localhost:${PORT}/)`);

  // Show docs
  swaggerDocs(app, PORT);

  // Check DB connection
  db.sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error));
});