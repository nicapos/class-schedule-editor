const { Router } = require("express");
const multer = require("multer");

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const { checkFileType } = require("../utils/validation");

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set your desired destination folder
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname;
    const uniqueFilename = `${Date.now()}-${originalname}`;

    cb(null, uniqueFilename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (_req, file, cb) => {
    checkFileType(file, cb);
  },
});

router.get("/api/", (req, res) => {
  res.send("Hello World!");
});

router.post(
  "/api/auth/register",
  upload.single("avatar"),
  authController.registerUser
);
router.post("/api/auth/login", authController.login);
router.post("/api/auth/logout", authController.logout);

router.get("/api/users", userController.getAllUsers);
router.get("/api/me", userController.getCurrentUser)

module.exports = router;
