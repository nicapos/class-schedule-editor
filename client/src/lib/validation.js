const regexUser = {
  email: /(^\w?([,.-]\w)?)*@[\w*.]+\w{2,}$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
  phoneNumber: /^\d{7,13}$/,
  fullName: /[a-zA-Z ]{3,}/,
};

const regexClass = {
  className: /^[a-zA-Z0-9\[\]\-\"\'\'\s]{2,50}$/,
  startTime: /^(?:[01]\d|2[0-3]):[0-5]\d$/,
  endTime:  /^(?:[01]\d|2[0-3]):[0-5]\d$/,
  location: /^[a-zA-Z0-9\[\]\-\"\'\'\s]{0,50}$/,
};

const regexOptions = {
  ...regexUser,
  ...regexClass
};

/**
 * Validates a field value based on the regex above
 * @param {string} fieldName
 * @param {string} value
 * @returns
 */
export function validate(fieldName, value) {
  return regexOptions[fieldName].test(value);
}

export function validateTimeRange(start, end, minMins = 10) {
  const startTime = new Date(`2024-01-01T${start}`);
  const endTime = new Date(`2024-01-01T${end}`);

  // Ensure start time is before end time
  if (startTime >= endTime) {
      return false;
  }

  // Calculate time difference
  const timeDiff = endTime.getTime() - startTime.getTime();

  // Ensure time difference is at least 15 minutes
  const minDiff = minMins * 60 * 1000;
  if (timeDiff < minDiff) {
      return false;
  }

  return true;
}
