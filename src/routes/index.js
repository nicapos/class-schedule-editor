const { Router } = require("express");
const multer = require("multer");
const { pool } = require("../db");

const authController = require("../controllers/auth.controller");

const router = Router();
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.get("/api/", (req, res) => {
  res.send("Hello World!");
});

router.post(
  "/auth/register",
  upload.single("avatar"),
  authController.registerUser
);

router.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  const findQuery =
    "SELECT full_name, photo_url, email, user_type FROM users WHERE email = $1 and password = $2;";
  const values = [email, password];

  pool.query(findQuery, values, (error, result) => {
    if (error) {
      console.error("Error executing query", error);
      return res.status(400).json({ error });
    } else {
      res.status(200).json({ data: result.rows[0] });
    }
  });
});

router.get("/user", (req, res) => {});

router.post("/user", (req, res) => {});

router.post("/media", (req, res) => {});

module.exports = router;
