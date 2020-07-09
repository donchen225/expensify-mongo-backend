const express = require('express');
const router = new express.Router();
const Expense = require('../models/expense');

router.post('/expenses', async (req, res) => {
    const expense  = new Expense(req.body);
    try {
        await expense.save();
        res.status(201).send(expense);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get('/expenses', async (req, res) => {
    try {
        const expenses = await Expense.find({})
        res.send(expenses);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/expenses/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const expense = await Expense.findById(_id);
        if (!expense) {
            res.status(404).send();
        }
        res.send(expense);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.patch('/expenses/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "amount", "date", "category", "note"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }
    try {
        const expense = await Expense.findById(req.params.id);
        updates.forEach((update) => {
            expense[update] = req.body[update]
        })
        await expense.save();
        // const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!expense) {
            res.status(404).send();
        }
        res.send(expense);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/expenses/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const expense = await Expense.findByIdAndDelete(_id)
        if (!expense) {
            res.status(404).send();
        }
        res.send(expense);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;