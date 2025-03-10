import { Server} from "socket.io";
import express from 'express';
import { createServer } from 'http';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express()
const server = createServer(app)
const io = new Server(server);

// track online users
let counter = 0;
const __dirname = dirname(fileURLToPath(import.meta.url))

  // to show it in console
// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       // console.log('message: ' + msg);
//     });
//   });

  // to broadcast
  io.on('connection', (socket) => {

    console.log('A user connected');
    counter++; // Increment online users count
    io.emit('update online users', onlineUsers); // Broadcast the updated count

    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });

      // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    counter--; // Decrement online users count
    io.emit('update online users', onlineUsers); // Broadcast the updated count
  });
  });

  
  
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });
  
  server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
  });
  