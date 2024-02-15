const path = require("path");

const regex = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  password: /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8,}$/,
  phone_number:
    /^\\+[1-9]{1}[0-9]{0,2}-[2-9]{1}[0-9]{2}-[2-9]{1}[0-9]{2}-[0-9]{4}$/,
  full_name: /^[a-z ,.'-]+$/i,
};

function isValid(key, value) {
  if (!regex.hasOwnProperty(key))
    throw Error(`Key '${key}' does not exist for validator`);

  return !regex[key].test(value);
}

function checkFileType(file, callback) {
  const fileTypes = /jpeg|jpg|png/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) return callback(null, true);
  return callback(null, false);
}

module.exports = { isValid, checkFileType };