const express = require('express');
const http = require("http")

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
      origin: '*',
      credentials: true
    }
});
io.on('connection', (socket) => {
  socket.on('startGameWithTheRoom',(data)=>{
    
    socket.join(data.roomNumber);

  })
  socket.on('makeMove',(data)=>{
      socket.local.emit('newMove',data.square);//local - отправляет сообщения всем в комнате кроме меня самого!!!
  })
});

server.listen(3456, ()=>{
    console.log("Server was started!")
});