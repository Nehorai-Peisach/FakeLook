require('dotenv').config();
const express = require('express');
const logger = require('../logger');
const authRouter = require('./routes/authRoutes');
const postsRouter = require('./routes/postsRoutes');
const friendsRouter = require('./routes/friendsRoutes');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

const PORT = process.env.GATEWAY_PORT;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/posts', authenticateToken, postsRouter);
app.use('/api/friends', authenticateToken, friendsRouter);

app.listen(PORT, () => {
  logger.http((path = `Gateway_server is running on port:${PORT}`));
});

function authenticateToken(req, res, next) {
  const token = req.body.token;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    delete req.body.token;
    next();
  });
}
// function authenticateToken(req, res, next) {
//   const token = req.headers.authorization.split(/\s+/).pop() || null;
//   if (token === null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) {
//       console.log(err);
//       return res.sendStatus(403);
//     }
//     // delete req.body.token;
//     next();
//   });
// }
