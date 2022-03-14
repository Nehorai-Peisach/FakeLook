const express = require('express');
const app = express();

app.listen(4004, () => {
  console.log(`Connected to ${4004}`);
});

app.get('/', (req, res) => {
  res.send('Connected!');
});
