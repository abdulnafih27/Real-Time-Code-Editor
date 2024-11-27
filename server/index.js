const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

const useSocketMap = {}

const getAllConnectedClients = (roomId) =>{
  return Array.from(io.sockets.adapter.rooms.get(roomId)).map(
    (socketId) => {
      return {
        socketId,
        username : useSocketMap[socketId]
      }
    }
  )
} 

io.on("connection", (socket) => {

  socket.on('join', ({roomId, username}) => {
    useSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId)
    clients.forEach(({socketId}) => {
      io.to(socketId).emit('joined', {
        clients,
        username, 
        socketId : socket.id
      })
    })
  })

  socket.on('code-change', ({roomId, code}) => {
    socket.in(roomId).emit('code-change', {code})
  })
  socket.on('sync-code', ({socketId, code}) => {
    io.to(socketId).emit('code-change' , {code})
  })

  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit("disconnected", {
        socketId : socket.id,
        username : useSocketMap[socket.id]
      })
    })
    delete useSocketMap[socket.id];
    socket.leave()
  })
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
