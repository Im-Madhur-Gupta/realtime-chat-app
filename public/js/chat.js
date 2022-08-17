const socket = io();

socket.on("welcomeMessage", (message) => {
  console.log(message);
});

socket.on("goodbyeMessage", (message) => {
  console.log(message);
});

socket.on("newUserMessage", (message) => {
  console.log(message);
});

socket.on("recieveMessage", (message) => {
  console.log(message);
});

socket.on("recieveCoordsLink", (gMapsLink) => {
  window.open(gMapsLink);
});

document.getElementById("message-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const message = e.target.message.value;
  socket.emit("sendMessage", message);
});

document.getElementById("location-btn").addEventListener("click", (e) => {
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const { latitude, longitude } = coords;
    socket.emit("sendCoords", { latitude, longitude });
  });
});
