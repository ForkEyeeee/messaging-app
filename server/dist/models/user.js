"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, maxlength: 50 },
    password: { type: String, required: true, maxlength: 20 },
    firstname: { type: String, required: false, maxlength: 20 },
    lastname: { type: String, required: false, maxlength: 20 },
    about: { type: String, required: false, maxlength: 200 },
    phone: { type: Number, required: false, maxlength: 20 },
    messages: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "messages" }],
}, { collection: "users" });
UserSchema.pre("save", async function (next) {
    const hash = await bcrypt_1.default.hash(this.password, 10);
    this.password = hash;
    next();
});
UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    return bcrypt_1.default.compare(password, user.password);
};
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
