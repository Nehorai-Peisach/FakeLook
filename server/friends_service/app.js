const express = require('express');
const app = express();

app.listen(4005, () => {
  console.log(`Connected to ${4005}`);
});

app.get('/', (req, res) => {
  res.send('Connected!');
});
