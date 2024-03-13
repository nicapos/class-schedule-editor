const regexFieldNames = {
  email: /(^\w?([,.-]\w)?)*@[\w*.]+\w{2,}$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
  phoneNumber: /^\d{7,13}$/,
  fullName: /[a-zA-Z ]{3,}/,
};

/**
 * Validates a field value based on the regex above
 * @param {string} fieldName
 * @param {string} value
 * @returns
 */
export function validate(fieldName, value) {
  return regexFieldNames[fieldName].test(value);
}
