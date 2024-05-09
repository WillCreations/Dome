const { model, models, Schema } = require("mongoose");

const messageSchema = new Schema(
  {
    senderId: String,
    chatId: String,
    text: String,
  },
  { timestamps: true }
);

const Message = models.Chats || model("Message", messageSchema);

module.exports = Message;
