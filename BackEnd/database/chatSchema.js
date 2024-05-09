const { model, models, Schema } = require("mongoose");
const { ObjectId } = Schema.Types;

const chatSchema = new Schema(
  {
    members: Array,
    messageId: [{ type: ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);

const Chat = models.Chats || model("Chat", chatSchema);

module.exports = Chat;
