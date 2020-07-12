const express = require('express');
const router = new express.Router();
const Expense = require('../models/expense');
const auth = require('../middleware/auth');

// create expense for currently authenticated user
router.post('/expenses', auth, async (req, res) => {
    const expense = new Expense({
        ...req.body,
        owner: req.user._id
    });
    try {
        await expense.save();
        res.status(201).send(expense);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/expenses', auth, async (req, res) => {
    try {
        // const expenses = await Expense.find({ owner: req.user._id });
        await req.user.populate('expenses').execPopulate();
        res.send(req.user.expenses);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.get('/expenses/:id', auth, async (req, res) => {
    try {
        const expense = await Expense.findOne({ _id: req.params.id, owner: req.user._id });
        if (!expense) {
            res.status(404).send({ error: `Can't find expense`});
        }
        res.send(expense);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.patch('/expenses/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "amount", "date", "category", "note"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }
    try {
        const expense = await Expense.findOne({ _id: req.params.id, owner: req.user._id });
        if (!expense) {
            res.status(404).send();
        }
        updates.forEach((update) => {
            expense[update] = req.body[update]
        })
        await expense.save();
        res.send(expense);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.delete('/expenses/:id', auth, async (req, res) => {
    try {
        const expense = await Expense.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!expense) {
            res.status(404).send();
        }
        res.send(expense);
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;