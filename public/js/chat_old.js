// as this js file was loaded after the socket.io.js file it has access to io() function.
// using which we can connect to our socket.io server as a client

const socket = io();

// adding an event listner for our "countUpdated" event
// transferring data from server to client
socket.on("countUpdated", (count) => {
  console.log(`New count`, count);
});

document.getElementById("count--btn").addEventListener("click", () => {
  console.log("clicked");
  socket.emit("increment");
});
