import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  password: string;
  isValidPassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true, maxlength: 20 },
    password: { type: String, required: true, maxlength: 20 },
    firstname: { type: String, required: false, maxlength: 15 },
    lastname: { type: String, required: false, maxlength: 15 },
    about: { type: String, required: false, maxlength: 200 },
    phone: { type: Number, required: false, maxlength: 11 },
    messages: [{ type: Schema.Types.ObjectId, ref: "messages" }],
  },
  { collection: "users" }
);

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password: string) {
  const user = this as IUser;
  return bcrypt.compare(password, user.password);
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
