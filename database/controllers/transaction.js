const Transaction = require('../models/transaction');

// @route   POST /transactions
// @desc    Create transaction for currently authenticated user
// @access  Private
exports.create = async (req, res) => {
    const transaction = new Transaction({ // No need to send user id in req.body bc user has already been set to req object when auth was called
        ...req.body,
        ownerId: req.user._id // We will add owner property to create association 
    });
    try {
        await transaction.save();
        res.status(201).send(transaction);
    } catch (e) {
        res.status(400).send(e);
    }
}

// @route   GET /transactions
// @desc    Retrieve transactions for currently authenticated user
// @access  Private

// GET /transactions?category=groceries
// GET /transactions?text=console
// GET /transactions?limit=10&skip=20
// GET /transactions?sortBY=date:desc
// GET /transactions?sortBY=amount:desc
// GET /transactions?sortBy=createdAt:desc
exports.fetchAll = async (req, res) => {
    const match = {};
    const sort = {};
    let searchTerm = '';
    if (req.query.category) {
        match.category = req.query.category;
    }
    if (req.query.text) {
        searchTerm = req.query.text
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1; 
    }
    try {
        const transactions = await Transaction
            .find({ ownerId: req.user._id, 
                $or: [
                    { description: { $regex: `${searchTerm}`, $options: "i" } },
                    { note: { $regex: `${searchTerm}`, $options: "i" } } 
                ]
            })
            .populate({
                path: 'transactions',
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort
                }
            });
        res.send(transactions);
    } catch (e) {
        res.status(500).send(e);
    }
}

// @route   GET /transactions/:id
// @desc    Retrieve transaction if transaction belongs to currently authenticated user
// @access  Private
exports.fetch = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ _id: req.params.id, ownerId: req.user._id });
        if (!transaction) {
            res.status(404).send({ error: `Can't find transaction`});
        }
        res.send(transaction);
    } catch (e) {
        res.status(500).send(e);
    }
}

// @route   PATCH /transactions/:id
// @desc    Update transaction if transaction belongs to currently authenticated user
// @access  Private
exports.update = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "amount", "date", "category", "note"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }
    try {
        const transaction = await Transaction.findOne({ _id: req.params.id, ownerId: req.user._id });
        if (!transaction) {
            res.status(404).send();
        }
        updates.forEach((update) => {
            transaction[update] = req.body[update]
        })
        await transaction.save();
        res.send(transaction);
    } catch (e) {
        res.status(400).send(e);
    }
}

// @route   DELETE /transactions/:id
// @desc    Delete transaction if transaction belongs to currently authenticated user
// @access  Private
exports.delete = async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, ownerId: req.user._id })
        if (!transaction) {
            res.status(404).send();
        }
        res.send(transaction);
    } catch (e) {
        res.status(500).send(e);
    }
}