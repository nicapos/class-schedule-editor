const path = require("path");
const fs = require("fs"); 

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

const fileTypes = ["jpeg", "jpg", "png", "json"];

// function checkFileType(file, callback) {
//   const extName = path.extname(file.originalname).toLowerCase().substr(1);
//   const mimeType = file.mimetype.split('/')[1];

//   if (!fileTypes.includes(extName) || !fileTypes.includes(mimeType)) {
//     return callback(null, false);
//   }

//   // Read first 4 bytes of the buffer to check the signature
//   const buffer = file.buffer.slice(0, 4);
//   const signature = buffer.toString('hex');
//   let verifiedType = null;

//   switch(signature) {
//     case "89504e47":
//       verifiedType = "image/png";
//       break;
//     case "ffd8ffe0":
//     case "ffd8ffe1":
//     case "ffd8ffe2":
//     case "ffd8ffe3":
//     case "ffd8ffe8":
//       verifiedType = "image/jpeg";
//       break;
//     default:
//       break;
//   }

//   if (verifiedType) {
//     file.verifiedType = verifiedType;
//     callback(null, true);
//   } else {
//     callback(null, false);
//   }
// }

// module.exports = { getValidator, checkFileType };
module.exports = { getValidator};
