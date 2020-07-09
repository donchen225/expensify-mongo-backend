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
})
