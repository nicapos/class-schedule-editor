const path = require("path");

const regex = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
  phoneNumber: /^\d{7,13}$/,
  fullName: /[a-zA-Z ]{3,}/,
};

function getValidator(key) {
  if (!regex.hasOwnProperty(key))
    throw Error(`Key '${key}' does not exist for validator`);

  return (value) => regex[key].test(value);
}

function checkFileType(file, callback) {
  const fileTypes = /jpeg|jpg|png|json/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) return callback(null, true);
  return callback(null, false);
}

module.exports = { getValidator, checkFileType };
