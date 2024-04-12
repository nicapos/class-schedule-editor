const multer = require("multer");
const path = require("path");
const { checkFileType } = require("../utils/validation");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }//, // 5MB limit
  // fileFilter: (_req, file, cb) => checkFileType(file, cb),
});

module.exports = upload;
