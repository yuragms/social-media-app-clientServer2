import mongoose from "mongoose";
const MessageShema = mongoose.Schema(
  {
    chatId: {
      type: Array,
    },
    senderId: {
      type: Array,
    },
    text: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);
const MessageModel = mongoose.model("Message", MessageShema);
export default MessageModel;
