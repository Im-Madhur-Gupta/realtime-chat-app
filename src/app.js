const express = require("express");
const path = require("path");

const app = express();

const publicDir = path.join(__dirname, "../public");
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.send("Realtime Chat App");
});

module.exports = app;
