const http = require("http");
const express = require("express");
const path = require("path");
const Filter = require("bad-words");

const app = express();

const socketio = require("socket.io");
const server = http.createServer(app);
const io = new socketio.Server(server);

const publicDir = path.join(__dirname, "../public");
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.send("Realtime Chat App");
});

io.on("connection", (socket) => {
  socket.emit("welcomeMessage", "Welcome to the chat app");

  // telling all users except the one on the current socket that a user has connected
  socket.broadcast.emit("newUserMessage", "New user has joined");

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();

    let status = "REJECTED";
    if (!filter.isProfane(message)) {
      io.emit("recieveMessage", message);
      status = "SENT";
    }

    callback({ timestamp: Date.now(), status }); // acknowledging the event
  });

  socket.on("sendCoords", ({ latitude, longitude }, callback) => {
    console.log(latitude);
    console.log(longitude);
    io.emit(
      "recieveCoordsLink",
      `https://www.google.com/maps?q=${latitude},${longitude}`
    );
    callback(); // acknowledging the event
  });

  // following will run when the client of this particular socket disconnects
  socket.on("disconnect", () => {
    // because the current client has already disconnected so we dont have to broadcast a message
    // io.emit() gets the job done.
    io.emit("goodbyeMessage", "A user has left the chat");
  });
});

module.exports = server;
