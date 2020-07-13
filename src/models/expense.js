const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: String,
        default: "uncategorized",
        validate(value) {
            const options = ["home-utilities", "personal-family-care", "groceries", "restaurants-dining", "health", "insurance", "transportation", "shopping-entertainment", "travel", "education", "giving", "business-expenses", "finance", "cash-checks-misc", "uncategorized"]
            if (!options.includes(value)) {
                throw new Error('Category must be one of the provided categories');
            }
        }
    },
    note: {
        type: String,
        trim: true,
        maxlength: 50
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Expense = new mongoose.model('Expense', expenseSchema);

module.exports = Expense;