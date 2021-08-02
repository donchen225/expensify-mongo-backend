const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    ownerId: { 
        type: mongoose.Schema.Types.ObjectId, // Each transaction will store the user id that created it. 
        required: true,
        ref: 'User' // This will create a reference from this owner field to the User model. This will create relationship btw 2 models and provide helper functions that will make it possible to easily fetch entire user profile of a given expense id 
    },
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
    type: {
        type: String,
        required: true,
        validate(value) {
            const options = ["expense", "income"];
            if (!options.includes(value)) {
                throw new Error('Type must be either expense or income');
            }
        }
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
    }
}, {
    timestamps: true
})

const Transaction = new mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;