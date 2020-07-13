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

// retrieve expenses for currently authenticated user
// GET /expenses?category=groceries
// GET /expenses?text=console
// GET /expenses?limit=10&skip=20
// GET /expenses?sortBY=date:desc
// GET /expenses?sortBY=amount:desc
// GET /expenses?sortBy=createdAt:desc
router.get('/expenses', auth, async (req, res) => {
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
        // const expenses = await Expense.find({ owner: req.user._id, $text: { $search: `${searchTerm}`, $caseSensitive: false }})
        const expenses = await Expense
            .find({ owner: req.user._id, 
                $or: [
                    { description: { $regex: `${searchTerm}`, $options: "i" } },
                    { note: { $regex: `${searchTerm}`, $options: "i" } } 
                ]
            })
            .populate({
                path: 'expenses',
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort
                }
            });
        // await req.user.populate({
        //     path: 'expenses',
        //     match,
        //     options: {
        //         limit: parseInt(req.query.limit),
        //         skip: parseInt(req.query.skip),
        //         sort
        //     }
        // }).execPopulate();
        // res.send(req.user.expenses);
        res.send(expenses);
    } catch (e) {
        res.status(500).send(e);
    }
})

// retrieve expense if expense belongs to currently authenticated user
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

// update expense if expense belongs to currently authenticated user
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

// delete expense if expense belongs to currently authenticated user
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