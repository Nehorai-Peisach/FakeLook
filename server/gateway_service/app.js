const express = require('express');
const app = express();

app.listen(4001, () => {
  console.log(`Connected to ${4001}`);
});

app.get('/', (req, res) => {
  res.send('Connected!');
});
