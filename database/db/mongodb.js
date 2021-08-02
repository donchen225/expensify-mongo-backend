const { MongoClient } = require('mongodb');
const mongoURL = require('../../configs/keys').mongoUrl;

const databaseName = 'minty';

MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
   if (error) {
       return console.log('unable to connect to database!');
   }
   const db = client.db(databaseName);
});

