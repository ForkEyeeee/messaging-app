import mongoose, { Schema, Document } from "mongoose";

const MessageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "users" },
    recipient: { type: Schema.Types.ObjectId, ref: "users" },
    content: { type: String, required: true, maxlength: 200 },
    time: { type: Date, require: true },
  },
  { collection: "messages" }
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;
