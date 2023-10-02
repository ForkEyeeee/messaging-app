import mongoose, { Schema, Document } from "mongoose";

const MessageSchema = new Schema(
  {
    content: { type: String, required: true, maxlength: 200 },
    time: { type: Date, require: true },
  },
  { collection: "messages" }
);

const User = mongoose.model("Message", MessageSchema);

export default User;
