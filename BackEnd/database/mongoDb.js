const mongoose = require("mongoose");

let isConnected = false;
const connectToDb = async (listen) => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    listen;
    console.log("mongodb is connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Mern",
    });
    isConnected = true;
    console.log(isConnected, "Mongodb just connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDb;
