"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const usersData = [
    {
        _id: new mongoose_1.default.Types.ObjectId("6509cf37a2242a07b711b1a1"),
        username: "user1@example.com",
        password: "$2b$10$fC1WU2njVGEiMwOUipUzbOU464owa1/zc.82Qib/bQhTRfMuoL05W",
        __v: 0,
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("6509cf37a2242a07b711b1a2"),
        username: "user2@example.com",
        password: "$2b$10$fC1WU2njVGEiMwOUipUzbOU464owa1/zc.82Qib/bQhTRfMuoL05W",
        __v: 0,
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("6509cf37a2242a07b711b1a3"),
        username: "user3@example.com",
        password: "$2b$10$fC1WU2njVGEiMwOUipUzbOU464owa1/zc.82Qib/bQhTRfMuoL05W",
        __v: 0,
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("6509cf37a2242a07b711b1a4"),
        username: "user4@example.com",
        password: "$2b$10$fC1WU2njVGEiMwOUipUzbOU464owa1/zc.82Qib/bQhTRfMuoL05W",
        __v: 0,
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("6509cf37a2242a07b711b1a5"),
        username: "user5@example.com",
        password: "$2b$10$fC1WU2njVGEiMwOUipUzbOU464owa1/zc.82Qib/bQhTRfMuoL05W",
        __v: 0,
    },
];
exports.default = usersData;
