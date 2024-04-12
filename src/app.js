const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

const swaggerDocs = require("./middleware/docs");
const errorHandler = require("./middleware/errorHandler");

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

// Check if --reset flag is present in the command-line arguments
const hasResetFlag = process.argv.indexOf("--reset") !== -1;

db.sequelize1
  .sync({ force: hasResetFlag })
  .then(() => console.log("Synced db1."))
  .catch((err) => console.log("Failed to sync db: " + err.message));

db.sequelize2
  .sync({ force: hasResetFlag })
  .then(() => console.log("Synced db1."))
  .catch((err) => console.log("Failed to sync db: " + err.message));


function startServer(port) {
  port = parseInt(port);
  
  app.listen(port, () => {
    console.log(
      `Server is running on port ${port} (available at http://localhost:${port}/)`
    );
  
    // Show docs
    swaggerDocs(app, port);
  
    // Check DB connection
    db.sequelize1
      .authenticate()
      .then(() => console.log("Connection to DB1 has been established successfully."))
      .catch((error) =>
        console.error("Unable to connect to the database:", error)
      );
  
    db.sequelize2
      .authenticate()
      .then(() => console.log("Connection to DB2 has been established successfully."))
      .catch((error) =>
        console.error("Unable to connect to the database:", error)
      );
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use. Trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

const PORT = process.env.PORT || 8080;
startServer(PORT);