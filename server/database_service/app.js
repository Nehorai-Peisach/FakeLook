const express = require('express');
const app = express();
const MongoDb = require('./database/database');
const database = new MongoDb();

database
  .connect()
  .then(() => {
    console.log('Database is on!');
    app.listen(4000, () => {
      console.log(`Connected to ${4000}`);
    });
  })
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Connected!');
});
