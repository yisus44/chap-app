const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
  },
});

const users = {};

io.on("connection", (socket) => {
  console.log("A user has connected");

  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });

  socket.on("send-chat-message", function (message) {
    socket.broadcast.emit("chat-message", { message, name: users[socket.id] });
  });

  socket.on("disconnected", function () {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});

console.log("nice");
