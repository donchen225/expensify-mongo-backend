const express = require('express');
const router = new express.Router();
const { check } = require('express-validator');

const Password = require('../controllers/password');
const validate = require('../middlewares/validate');

// @route POST api/auth/recover
// @desc Recover Password - Generate password reset token and send password reset email
// @access Public
router.post('/auth/recover', [
    check('email').isEmail().withMessage('Enter a valid email address')
], validate, Password.recover);

// @route GET api/auth/reset/:token
// @desc Validate password reset token and show the password reset view
// @access Public
router.get('/auth/reset/:token', Password.reset);

// @route POST api/auth/reset/:token
// @desc Reset Password
// @access Public
router.post('/auth/reset/:token', [
    check('password').not().isEmpty().isLength({ min: 8 }).withMessage('Must be at least 8 chars long'),
    check('confirmPassword', 'Passwords do not match').custom((value, { req }) => (value === req.body.password))
], validate, Password.resetPassword);

module.exports = router;