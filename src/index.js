const express = require('express');
require('./db/mongoose'); 
const userRouter = require('./routers/user');
const expenseRouter = require('./routers/expense');

const app = express();
const port = process.env.PORT || 5000;

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled');
//     } else {
//         next();
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down for maintenance');
// })

app.use(express.json());
app.use(userRouter);
app.use(expenseRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

// const Expense = require('./models/expense');
// const User = require('./models/user');

// const main = async () => {
//     // const expense = await Expense.findById("5f06ec6680ccf7f49e7fa911");
//     // await expense.populate('owner').execPopulate();
//     // console.log(expense.owner);

//     const user = await User.findById('5f06ec0080ccf7f49e7fa90e');
//     await user.populate('expenses').execPopulate();
//     console.log(user.expenses);
// }
// main();