const express = require("express");
require("dotenv").config();
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/userRoute");
const chatRoutes = require("./routes/chatRoute");
const messageRoutes = require("./routes/messageRoute");
const connectToDb = require("./database/mongoDb");

const cors = require("cors");

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

const port = process.env.PORT;

//listen for request
connectToDb(
  app.listen(port, () => {
    console.log(`express app Listening on port ${port}`);
  })
);
