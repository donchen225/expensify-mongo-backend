const plaid = require("plaid");
const keys = require('./keys');

// Initialize the Plaid client
const client = new plaid.Client({
    clientID: keys.PLAID_CLIENT_ID,
    secret: keys.PLAID_SECRET,
    env: plaid.environments.development
});

module.exports = client;