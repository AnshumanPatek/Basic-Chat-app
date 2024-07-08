const express = require('express');
const { createServer } = require('node:http');
const http = require ("http");
const path = require ("path")

const {Server, Socket} = require("socket.io");


const app = express();
// const server = createServer(app);
const server = http.createServer(app);
const io = new Server(server);

//Socket.io
// connection k baad data socket val mai store hoga 
io.on("connection",(socket)=>{
    // console.log("A new user has connected", socket.id)
    // har socket ka different id hota

    socket.on("user-message",(message)=>{
        console.log("A new User Message", message)
        io.emit("message",message);
    });
})





app.use(express.static(path.resolve("./public")));

app.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
  return res.sendFile("/public/index.html");
});

server.listen(9000, () => {
  console.log('server running at http://localhost:9000');
});