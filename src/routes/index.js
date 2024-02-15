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

router.post("/auth/login", authController.login);

router.get("/user", (req, res) => {});

router.post("/user", (req, res) => {});

router.post("/media", (req, res) => {});

module.exports = router;
