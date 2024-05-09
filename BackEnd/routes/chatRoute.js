const express = require("express");
const {
  createChat,
  findUserChats,
  findChat,
} = require("../controllers/chatControl");

const router = express.Router();

//GET all chats
router.get("/:id", findUserChats);

//GET a single chat
router.get("/:userOne/:userTwo", findChat);

//POST or create chat
router.post("/", createChat);

module.exports = router;
