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

const sendMessageBtn = document.getElementById("send-message-btn");
const messageInput = document.getElementById("message-input");

document.getElementById("message-form").addEventListener("submit", (e) => {
  e.preventDefault();

  sendMessageBtn.disabled = true;

  const message = e.target.message.value;
  socket.emit("sendMessage", message, ({ timestamp, status }) => {
    sendMessageBtn.disabled = false;
    messageInput.value = "";
    messageInput.focus();

    console.log("Message Status", status, "Timestamp", timestamp);
  });
});

const locationBtn = document.getElementById("location-btn");

locationBtn.addEventListener("click", (e) => {
  locationBtn.disabled = true;

  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const { latitude, longitude } = coords;

    socket.emit("sendCoords", { latitude, longitude }, () => {
      locationBtn.disabled = false;

      console.log("Location shared.");
    });
  });
});
