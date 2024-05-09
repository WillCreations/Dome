const express = require("express");
const { createMessage, getMessages } = require("../controllers/messageControl");

const router = express.Router();

//GET all chats
router.get("/:chatId", getMessages);

//POST or create chat
router.post("/", createMessage);

module.exports = router;
