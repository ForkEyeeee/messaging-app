"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var MessageSchema = new mongoose_1.Schema({
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: "users" },
    recipient: { type: mongoose_1.Schema.Types.ObjectId, ref: "users" },
    content: { type: String, required: true, maxlength: 200 },
    time: { type: Date, require: true },
}, { collection: "messages" });
var Message = mongoose_1.default.model("Message", MessageSchema);
exports.default = Message;
