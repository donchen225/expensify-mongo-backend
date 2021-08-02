const express = require('express');
const router = new express.Router();

const User = require('../controllers/user');
const auth = require('../middlewares/auth');

// @route   GET api/users/me
// @desc    Read profile of currently authenticated user
// @access  Private
router.get('/users/me', auth, User.fetch);

// @route   PATCH api/users/me
// @desc    Update profile of currently authenticated user
// @access  Private
router.patch('/users/me', auth, User.update);

// @route   DELETE api/users/me
// @desc    Delete profile of currently authenticated user
// @access  Private
router.delete('/users/me', auth, User.delete);

module.exports = router;