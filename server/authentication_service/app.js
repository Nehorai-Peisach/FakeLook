const express = require('express');
const app = express();

app.listen(4002, () => {
  console.log(`Connected to ${4002}`);
});

app.get('/', (req, res) => {
  res.send('Connected!');
});
