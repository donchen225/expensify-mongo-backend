const ErrorResponse = require("../utils/errorResponse");

// This middleware will be used to handle different error cases and send them back to the client so that we can display the appropriate error messages on the frontend. The errors thrown are defined by validation applied to the different schemas
module.exports = (err, req, res, next) => {
    console.log("error handler is called");

    let error = { ... err };

    error.message = err.message;

    // Example includes when password isn't long enough, doesn't meet complexity requirement, contains "password", or one or more fields is empty 
    if (err.name === "CastError") {
        const message = `Invalid ${err.path}: ${err.value}.`;
        error = new ErrorResponse(message, 404); 
    }

    // Example includes when email is already taken
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue);
        const message = `An account with that ${field} already exists.`;
        error = new ErrorResponse(message, 400);
    }
    // Example includes when input password doesn't match what is stored in database
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(el => el.message).join('. ');
        error = new ErrorResponse(message, 400);
    }

    if (err.name === "JsonWebTokenError") {
        const message = "Invalid token. Please log in again.";
        error = new ErrorResponse(message, 401);
    }
    // Example includes when JWT session token has expired 
    if (err.name === "TokenExpiredError") {
        const message = "Your token has expired. Please log in again.";
        error = new ErrorResponse(message, 401);
    }

    res.status(error.statusCode || 500).send({
        name: err.name,
        message: error.message || 'Server error'
    });
};
