const express = require('express');
const app = express();

app.listen(4003, () => {
  console.log(`Connected to ${4003}`);
});

app.get('/', (req, res) => {
  res.send('Connected!');
});
