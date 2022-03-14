const express = require('express');
const app = express();

app.listen(4006, () => {
  console.log(`Connected to ${4006}`);
});

app.get('/', (req, res) => {
  res.send('Connected!');
});
