import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

app.use(express.static("public"));

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

function createMessage(text) {
  return {
    text,
    time: new Date().toLocaleTimeString(),
  };
}

let user = 0;
io.on("connection", (socket) => {
  console.log("User Connected");
  user++;
  socket.emit("newMessage", createMessage("Welcome to chat"));
  socket.broadcast.emit("userJoined", createMessage(user + " users connected"));

  socket.on("disconnect", () => {
    console.log("User Disconnected");
    user--;
    socket.broadcast.emit("userLeft", createMessage(user + " users connected"));
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Listening on port: http://localhost:${PORT}`);
});
