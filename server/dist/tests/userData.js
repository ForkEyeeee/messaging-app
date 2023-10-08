"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userData = [
    {
        _id: new mongoose_1.default.Types.ObjectId("6517c7d6d949e4b87f7b6b51"),
        username: "example@example.com",
        password: "password",
        firstname: "John",
        lastname: "Doe",
        about: "Hello! I am John Doe, an avid traveler and photographer.",
        phone: 1234213110,
        messages: [
            new mongoose_1.default.Types.ObjectId("651bc2e5ff87ebc66275a4e1"),
            new mongoose_1.default.Types.ObjectId("651bc2e5ff87ebc66275a4e2"),
            new mongoose_1.default.Types.ObjectId("651bc2e5ff87ebc66275a4e3"),
            new mongoose_1.default.Types.ObjectId("651bc2e5ff87ebc66275a4e7"),
            new mongoose_1.default.Types.ObjectId("651bc2e5ff87ebc66275a4e9"),
        ],
        __v: 0,
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("6517c7d8d949e4b87f7b6b53"),
        username: "example2@example.com",
        password: "password2",
        firstname: "Jane",
        lastname: "Doe",
        about: "Hi! I'm Jane Doe, a software developer and tech enthusiast.",
        phone: 9876543210,
        messages: [
            new mongoose_1.default.Types.ObjectId("651bc2e5ff87ebc66275a4e4"),
            new mongoose_1.default.Types.ObjectId("651bc2e5ff87ebc66275a4e5"),
            new mongoose_1.default.Types.ObjectId("651bc2e5ff87ebc66275a4e6"),
            new mongoose_1.default.Types.ObjectId("651bc2e5ff87ebc66275a4e8"),
            new mongoose_1.default.Types.ObjectId("651bc2e5ff87ebc66275a4ea"),
        ],
        __v: 0,
    },
];
exports.default = userData;
