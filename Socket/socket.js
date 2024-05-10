const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://271.0.0.1:5173",
      `${process.env.FRONTEND_URL}`,
    ],
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);
  socket.to(socket.id).emit("connection", `${socket.id} just connected  1`);
  // Handle message events

  //track socketwith userId
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });

    console.log("onlineUsers: ", onlineUsers);
    io.emit("getOnlineUsers", onlineUsers);
  });

  //add Message
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find((user) => {
      return user.userId === message?.recepientId;
    });

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });
  // update userChats
  socket.on("updateChat", ({ userChats, user }) => {
    userChats.forEach((c) => {
      const recipientId = c.members.find((m) => m !== user?._id);
      const userr = onlineUsers.find((u) => {
        return u.userId === recipientId;
      });

      if (userr) {
        io.to(userr.socketId).emit("updateChat", c);
      }
    });
  });
  // Handle disconnect events
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => {
      return user.socketId !== socket.id;
    });
    io.emit("getOnlineUsers", onlineUsers);
    console.log(`User ${socket.id} disconnected`);
  });
});

const port = process.env.PORT;

httpServer.listen(port, () => {
  console.log(`socket is Listening on port ${port}`);
});
