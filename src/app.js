const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

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

// Register routes
app.use("/", routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
