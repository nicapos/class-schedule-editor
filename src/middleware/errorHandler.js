require('dotenv').config();

const errorHandler = (err, req, res, next) => {
    if (process.env.DEBUG_MODE === 'true') {
        // Log the error stack to the console
        console.error(err.stack);
        // Send detailed error message with stack trace
        res.status(500).json({
            message: 'An internal error occurred',
            error: err.message,
            stack: err.stack,
        });
    } else {
        // Send a generic error message
        res.status(500).json({
            message: 'Something went wrong. Please try again later.',
        });
    }
};

module.exports = errorHandler;