const http = require("http");
const express = require("express");
const path = require("path");

// importing the socket.io library
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);

// creating an instance of socketio server
// similar to how we create an instance of express
// we need to provide the constructor a raw http server
const io = new socketio.Server(server);

const publicDir = path.join(__dirname, "../public");
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.send("Realtime Chat App");
});

let count = 0;

io.on("connection", (socket) => {
  // socket conatins info only about this newly created connection
  console.log("New WebSocket connection");

  // IMP -
  // socket.emit() -> emits to only a particular client
  // io.emit() -> emits to all the clients

  // emitting an event for the client from the server
  // whatever I provide to emit() after event name is passed to the event handler
  // transferring data from server to client
  socket.emit("countUpdated", count);

  // transferring data from client to server
  socket.on("increment", () => {
    count++;

    // send updated count to the client
    // socket.emit("countUpdated", count);

    // send updated count to all the clients
    io.emit("countUpdated", count);
  });
});

module.exports = server;
