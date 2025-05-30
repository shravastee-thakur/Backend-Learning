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

function formatMessages(name, text) {
  return {
    name,
    text,
    time: new Date().toLocaleTimeString(),
  };
}

let user = 0;
io.on("connection", (socket) => {
  console.log("User Connected");
  user++;
  socket.emit("newMessage", formatMessages("server", "Welcome"));
  socket.broadcast.emit(
    "userJoined",
    formatMessages("Server", `${user} users connected`)
  );

  socket.on("chatMessage", (text) => {
    const msg = formatMessages(`User-${socket.id.slice(0, 4)}`, text);
    io.emit("newMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
    user--;
    socket.broadcast.emit(
      "userLeft",
      formatMessages("Server", `${user} users connected`)
    );
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Listening on port: http://localhost:${PORT}`);
});
