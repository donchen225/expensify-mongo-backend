const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/expense-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

// db.expenses.createIndex({"description": "text"})