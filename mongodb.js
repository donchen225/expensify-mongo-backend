// CRUD create read update delete
const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'expense-manager';

// const id = new ObjectID();
// console.log(id.id.length);
// console.log(id.getTimestamp());
// console.log(id.toHexString().length);

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
   if (error) {
       return console.log('unable to connect to database!');
   }
   const db = client.db(databaseName);

//    db.collection('users').insertOne({
//        _id: id,
//        name: 'Max',
//        age: 25
//    }, (error, result) => {
//         if (error) {
//             return console.log('unable to insert user');
//         } 
//         console.log(result.ops);
//    })
//    db.collection('users').insertMany([
//         {
//             name: 'Will',
//             age: 26
//         }, {
//             name: 'Chan',
//             age: 28
//         }
//     ], (error, result) => {
//         if (error) {
//             return console.log('unable to insert documents');
//         }
//         console.log(result.ops);
//     })
    // db.collection('users').findOne({ _id: new ObjectID("5f03f8db3ae193aed9773037") }, (error, user) => {
    //     if (error) {
    //         return console.log('unable to fetch');
    //     }
    //     console.log(user);
    // })
    // db.collection('users').find({ age: 24 }).toArray( (error, users) => {
    //     console.log(users);
    // }) 
    // db.collection('users').find({ age: 24 }).count( (error, count) => {
    //     console.log(count);
    // })
//    db.collection('users').updateOne({ 
//        _id: new ObjectID("5f03f8db3ae193aed9773037")
//    }, {
//        $inc: {
//             age: -2
//        }
//    }).then((result) => {
//        console.log(result);
//    }).catch((error) => {
//        console.log(error);
//    })
//    db.collection('users').deleteMany({
//        age: 26
//    }).then((result) => {
//        console.log(result);
//    }).catch((error) => {
//        console.log(error);
//    })
    // db.collection('users').deleteOne({
    //     name: "Max"
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })
});

