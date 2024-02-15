export function validateEmail(email) {
  const validEmailRegex = /(^\w?([,.-]\w)?)*@[\w*.]+\w{2,}$/;
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