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

  var slice = file.slice(0,4);      
    var reader = new FileReader();    
    var flag = false;
    reader.readAsArrayBuffer(slice);  
    reader.onload = function(e) {
        var buffer = reader.result;          
        var view = new DataView(buffer);      
        var signature = view.getUint32(0, false).toString(16);  
        switch(signature) {                      
          case "89504E47": file.verified_type = "image/png"; flag = true; break;
          case "FFD8FFEE": file.verified_type = "image/jpeg"; flag = true; break;
          case "FFD8FFEE": file.verified_type = "image/jpeg"; flag = true; break;
          case "FFD8FFE0": file.verified_type = "image/jpeg"; flag = true; break;
        }
        
  if (mimeType && extName && flag) return callback(null, true);
  return callback(null, false);
}

module.exports = { getValidator, checkFileType };

}