const express = require("express");
require("dotenv").config();
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/userRoute");
const chatRoutes = require("./routes/chatRoute");
const messageRoutes = require("./routes/messageRoute");
const connectToDb = require("./database/mongoDb");

const cors = require("cors");
const http = require("http");
// const socketIo = require("socket.io");
const { Server } = require("socket.io");
//express app
const app = express();

//cross origin resourse sharing
app.use(
  cors({
    origin: [
      "http://271.0.0.1:5173",
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ],
  })
);

//create http server
// const httpServer = http.createServer(app);
// const expressServer = app.listen(process.env.PORT, () => {
//   console.log(`Listening on port ${process.env.PORT}`);
// });

const httpServer = http.createServer(app);

// console.log("httpServer: ", httpServer);

//CONNECT TO SOCKET.IO

// const io = socketIo(httpServer);
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://271.0.0.1:5173",
      process.env.FRONTEND_URL,
    ],
  },
});

// const io = socketIo(httpServer, {
//   cors: {
//     origin: ["http://localhost:5173", "http://271.0.0.1:5173"],
//   },
// });

//parse incoming json POST
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.body);
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

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
const webPort = process.env.WEB_PORT;

//listen for request
connectToDb(
  app.listen(port, () => {
    console.log(`express app Listening on port ${port}`);
  })
);

httpServer.listen(webPort, () => {
  console.log(`socket is Listening on port 4500`);
});
