const express = require("express");
const router = new express.Router();

const Account = require('../controllers/account');
const auth = require('../middlewares/auth');

// @route DELETE /accounts/:id
// @desc Delete account with given id
// @access Private
router.delete("/accounts/:id", auth, Account.delete);

// @route GET /accounts
// @desc Get all accounts linked with plaid of currently authenticated user
// @access Private
router.get("/accounts", auth, Account.fetchAll);

module.exports = router;