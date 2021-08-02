const express = require('express');
const router = new express.Router();
const { check } = require('express-validator');

const Transaction = require('../controllers/transaction');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

// @route   POST /transactions
// @desc    Create transaction for currently authenticated user
// @access  Private
router.post('/transactions', [
    check('description').not().isEmpty().withMessage('Enter a description'),
    check('amount').not().isEmpty().isNumeric().withMessage('Enter a valid amount'),
    check('date').not().isEmpty().withMessage('Enter a valid date'),
    check('type').not().isEmpty().withMessage('Enter a valid type')
], validate, auth, Transaction.create);

// @route   GET /transactions
// @desc    Retrieve transactions for currently authenticated user
// @access  Private
router.get('/transactions', auth, Transaction.fetchAll);

// @route   GET /transactions/:id
// @desc    Retrieve transaction if transaction belongs to currently authenticated user
// @access  Private
router.get('/transactions/:id', auth, Transaction.fetch);

// @route   PATCH /transactions/:id
// @desc    Update transaction if transaction belongs to currently authenticated user
// @access  Private
router.patch('/transactions/:id', auth, Transaction.update);

// @route   DELETE /transactions/:id
// @desc    Delete transaction if transaction belongs to currently authenticated user
// @access  Private
router.delete('/transactions/:id', auth, Transaction.delete);

module.exports = router;