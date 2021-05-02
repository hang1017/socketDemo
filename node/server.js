// demo-server.ts
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIo(server);

let socketSet = new Set();

io.on('connection', function (socket) {
  socketSet.add(socket);
  socket.on('message', function (data) {
    socketSet.forEach(ws => {
      if (ws.connected) {
        ws.send(data);
      } else {
        socketSet.delete(ws);
      }
    })
  });
  socket.on('error', function (err) {
    console.log(err);
  });
});

server.listen(3000);

app.listen(8080, 'localhost', _ => {
  console.log('demo服务器已启动，访问地址http://localhost:8080')
})