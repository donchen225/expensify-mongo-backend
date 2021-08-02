const jwt = require('jsonwebtoken');
const User = require('../models/user');
const keys = require('../../configs/keys');

// This is the authentication middleware that will be called when a protected route needs to be accessed 
module.exports = async (req, res, next) => {
    try {
        // Access user's auth token from request header 
        const token = req.header('Authorization').replace('Bearer ', ''); 
        // console.log("token", token);
        // Verify user's authentication token. It will return payload if token is valid, else return error 
        const decoded = jwt.verify(token, keys.JWT_SECRET);
        // console.log("decoded", decoded);
        // Find user document with given user id and session token in database
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        // console.log("user", user);
        if (!user) {
            throw new Error("User not found");
        }
        // Save user document and session token to req object so that later route handlers can immediately access data
        req.token = token; 
        req.user = user;
        next();
    } catch (e) {
        // send any errors to next routers 
        next(e);
        // res.status(401).send({ error: "Please authenticate." }) // This will run if token is invalid
    }
}
