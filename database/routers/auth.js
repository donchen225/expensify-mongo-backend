const express = require('express');
const router = new express.Router();
const { check } = require('express-validator');

const Auth = require('../controllers/auth');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

// @route   POST api/users
// @desc    Signup user and create new user profile
// @access  Public
router.post('/users', [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty().isLength({ min: 6 }).withMessage('Must be at least 8 chars long'),
    check('firstName').not().isEmpty().withMessage('Your first name is required'),
    check('lastName').not().isEmpty().withMessage('Your last name is required')
], validate, Auth.register);

// @route   POST api/users/login
// @desc    Login user
// @access  Public
router.post('/users/login', [
    check('email').isEmail().withMessage('Enter a valid email addresss'),
    check('password').not().isEmpty()
], validate, Auth.login);

// @route   POST /auth/google
// @desc    Authorize Google 
// @access  Private
router.post('/auth/google', Auth.googleAuth);

// ===EMAIL VERIFICATION
// @route GET api/verify/:token
// @desc Verify user
// @access Public
router.get('/verify/:token', Auth.verify);

// @route POST api/resend
// @desc Resend Verification Token
// @access Public
router.post('/auth/resend', Auth.resendToken);

// @route   POST api/auth/remove
// @desc    Remove user's current session token from user's tokens array
// @access  Public
router.post('/auth/remove', Auth.removeAuthToken);

// @route   POST api/users/logout
// @desc    Remove currently authenticated user's current session token from user's tokens array 
// @access  Private
router.post('/users/logout', auth, Auth.logout);

// @route   POST api/users/logoutAll
// @desc    Remove all of user's session tokens from user's tokens array
// @access  Private
router.post('/users/logoutAll', auth, Auth.logoutAll);

module.exports = router;