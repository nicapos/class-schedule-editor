const { Router } = require("express");
const multer = require("multer");

const authController = require("../controllers/auth.controller");
const { checkFileType } = require("../utils/validation");

const router = Router();
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (_req, file, cb) => {
    checkFileType(file, cb);
  },
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

router.post("/media", (req, res) => {});

module.exports = router;
