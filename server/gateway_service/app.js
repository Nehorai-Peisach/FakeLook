require('dotenv').config();
const express = require('express');
const logger = require('../logger');
const authRouter = require('./routes/authRoutes');
const postsRouter = require('./routes/postsRoutes');
const friendsRouter = require('./routes/friendsRoutes');
const cors = require('cors');
const app = express();

const PORT = process.env.GATEWAY_PORT;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/friends', friendsRouter);

app.listen(PORT, () => {
  logger.http((path = `Gateway_server is running on port:${PORT}`));
});
