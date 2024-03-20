const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Define your custom format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create the Winston logger
const logger = createLogger({
  format: combine(
    timestamp(),
    colorize(),
    logFormat
  ),
  transports: [
    new transports.Console(), // For output to the console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // For error logging
    new transports.File({ filename: 'logs/combined.log' }) // For all logs
  ],
});

module.exports = logger;