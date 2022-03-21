require('dotenv').config();
const express = require('express');
const logger = require('../logger');
const authRouter = require('./routes/authRoutes');
const posrtsRouter = require('./routes/postsRoutes');
const cors = require('cors');
const app = express();

const PORT = process.env.GATEWAY_PORT;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/posts', posrtsRouter);

app.listen(PORT, () => {
  logger.http((path = `Gateway_server is running on port:${PORT}`));
});
