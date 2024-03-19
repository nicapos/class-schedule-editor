const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  if (process.env.NODE_ENV === 'development') {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

module.exports = errorHandler;