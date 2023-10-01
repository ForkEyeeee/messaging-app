import mongoose from "mongoose";

const usersData = [
  {
    _id: new mongoose.Types.ObjectId("6509cf37a2242a07b711b1a1"),
    username: "user1@example.com",
    password: "$2b$10$fC1WU2njVGEiMwOUipUzbOU464owa1/zc.82Qib/bQhTRfMuoL05W", // Hashed "password1"
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId("6509cf37a2242a07b711b1a2"),
    username: "user2@example.com",
    password: "$2b$10$fC1WU2njVGEiMwOUipUzbOU464owa1/zc.82Qib/bQhTRfMuoL05W", // Hashed "password2"
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId("6509cf37a2242a07b711b1a3"),
    username: "user3@example.com",
    password: "$2b$10$fC1WU2njVGEiMwOUipUzbOU464owa1/zc.82Qib/bQhTRfMuoL05W", // Hashed "password3"
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId("6509cf37a2242a07b711b1a4"),
    username: "user4@example.com",
    password: "$2b$10$fC1WU2njVGEiMwOUipUzbOU464owa1/zc.82Qib/bQhTRfMuoL05W", // Hashed "password4"
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId("6509cf37a2242a07b711b1a5"),
    username: "user5@example.com",
    password: "$2b$10$fC1WU2njVGEiMwOUipUzbOU464owa1/zc.82Qib/bQhTRfMuoL05W", // Hashed "password5"
    __v: 0,
  },
];

export default usersData;
