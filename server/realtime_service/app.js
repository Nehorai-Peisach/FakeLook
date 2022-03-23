require('dotenv').config();
const express = require('express');
const logger = require('../logger');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const PORT = process.env.REALTIME_PORT;
const CLIENT_PORT = process.env.CLIENT_PORT;

const app = express();
const server = http.createServer(app);

app.use(cors());
const io = new Server(server, {
  cors: {
    origin: DOMAIN_NAME + CLIENT_PORT,
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  socket.join('global_room');

  socket.on('new_post', () => {
    socket.to('global_room').emit('check_friends_posts');
  });
});

server.listen(PORT, () => {
  logger.silly(`Connected to ${PORT}`);
});
