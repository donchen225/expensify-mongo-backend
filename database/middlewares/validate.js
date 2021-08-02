const { validationResult } = require('express-validator');

// This middleware is used to check if the express-validator middleware returns an error.
// If so, it recreates the error object using the param and msg keys and returns the error.
module.exports = (req, res, next) => {
    console.log("validate middleware is called");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = {}; errors.array().map((err) => error[err.param] = err.msg);
        return res.status(422).json({error});
    }
    next();
};