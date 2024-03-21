const multer = require("multer");
const path = require("path");
const { checkFileType } = require("../utils/validation");

function checkFileType(file, cb) {
  const filetypes = /json/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype === 'application/json';

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: JSON files only!');
  }
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (_req, file, cb) => checkFileType(file, cb),
});

module.exports = upload;
