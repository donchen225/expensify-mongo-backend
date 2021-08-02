const Account = require("../models/account");

// @route   DELETE /accounts/:id
// @desc    Delete account with given id
// @access  Private
exports.delete = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        await account.remove();
        res.json({ success: true });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}

// @route   GET /accounts
// @desc    Get all accounts linked with plaid of currently authenticated user
// @access  Private
exports.fetchAll = async (req, res) => {
    try {
        const accounts = await Account.find({ ownerId: req.user.id });
        if (accounts) {
            res.send(accounts);
        } else {
            throw new Error("User has no linked accounts");
        }
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}