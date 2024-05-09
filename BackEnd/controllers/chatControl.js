const Chat = require("../database/chatSchema");
const Message = require("../database/messageSchema");

//creatChat
//findUserChats
//findChat

const createChat = async (req, res) => {
  const { userOne, userTwo } = req.body;

  try {
    const chat = await Chat.findOne({
      members: { $all: [userOne, userTwo] },
    });

    if (chat) {
      return res.status(200).json(chat);
    }
    const newChat = new Chat({
      members: [userOne, userTwo],
    });

    const response = await newChat.save();
    res.status(200).json(response);
  } catch (error) {
    comsol.log(error);
    res.status(500).json(error);
  }
};

const findUserChats = async (req, res) => {
  const { id } = req.params;
  try {
    const chats = await Chat.find({
      members: { $in: [id] },
    });

    console.log("chats: ", chats);

    const topChats = await Chat.aggregate([
      {
        $lookup: {
          from: "messages",
          localField: "messageId",
          foreignField: "_id",
          as: "messageDetails",
        },
      },
      {
        $sort: {
          "messageDetails.createdAt": -1,
        },
      },
    ]);

    const newChats = topChats.filter((c) => {
      return c.members.some((m) => m === id);
    });
    console.log("newChats: ", newChats);
    res.status(200).json(newChats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findChat = async (req, res) => {
  const { userOne, userTwo } = req.params;
  try {
    const chat = await Chat.find({
      members: { $all: [userOne, userTwo] },
    });
    res.status(200).json(chat);
  } catch (error) {
    comsol.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createChat, findUserChats, findChat };
