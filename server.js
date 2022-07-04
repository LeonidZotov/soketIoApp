const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.sendFile(`${__dirname}/index.html`);
// });

io.on('connection', (socket) => {
  let roomId = '';
  socket.on('joinRoom', ({ address, room }) => {
    socket.join(room);
    console.log(`${address} joined room ${room}`);
    roomId = room;
  });

  socket.on('chatMessage', (msg) => {
    io.to(roomId).emit('message', msg);
    console.log(`message sent to room: ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('server is running');
});
