export function validateEmail(email) {
  const validEmailRegex = /(^\w?([,.-]\w)?)*@\w*.\w{2,}$/;
  return validEmailRegex.test(email);
}

export function validatePassword(password){
  const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
  return validPasswordRegex.test(password);
}

export function validatePhoneNumber(phoneNumber){
  const validPhoneNumRegex = /^\d{7,13}$/;
  return validPhoneNumRegex.test(phoneNumber);
}

export function validateFullName(fullName){
  const validFullNameRegex = /[a-zA-Z ]{3,}/;
  return validFullNameRegex.test(fullName);
}

export function validateAndUploadDP(files) {
  var fileInput = files[0]; // Access the first file in the array
  const maxFileSize = 5 * 1024 * 1024; // 5 MB 

  // Check file size
  if (fileInput.size > maxFileSize) {
      alert('File size is too large. Maximum allowed size is 5MB.');
      return false;
  }
}