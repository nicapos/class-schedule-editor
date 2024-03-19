function timeToDecimal(timeString) {
  // Split the time string into hours and minutes
  const [hoursStr, minutesStr] = timeString.split(':');
  
  // Convert hours and minutes to numbers
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  
  // Calculate the decimal value
  const decimalValue = hours + (minutes / 60);
  
  return decimalValue;
}

module.exports = { timeToDecimal }