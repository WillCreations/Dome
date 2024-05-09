const Message = require("../database/messageSchema");
const Chat = require("../database/chatSchema");

const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  try {
    const message = new Message({
      chatId,
      senderId,
      text,
    });

    const response = await message.save();
    await Chat.findByIdAndUpdate(
      response.chatId,
      {
        $push: {
          messageId: response._id,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const message = await Message.find({ chatId });

    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createMessage, getMessages };
