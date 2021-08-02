const express = require("express");
const router = new express.Router();

const Plaid = require('../controllers/plaid');
const auth = require('../middlewares/auth');

// @route POST /link/token/create
// @desc Create link token and send back to client 
// @access Private
router.post("/link/token/create", auth, Plaid.createLinkToken);

// @route POST /item/public_token/exchange
// @desc Trades public token for access token and stores credentials in database
// @access Private
router.post("/item/public_token/exchange", auth, Plaid.exchangeToken);

// @route POST /transactions/get
// @desc Fetch transactions from past 30 days from all linked accounts from plaid API
// @access Private
router.post("/transactions/get", auth, Plaid.retrieveTransactions);

module.exports = router;