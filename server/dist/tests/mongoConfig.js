"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// mongoConfig.js
var mongoose_1 = require("mongoose");
var mongoDb = process.env.dev_db_url;
mongoose_1.default.connect(mongoDb, { useNewUrlParser: true });
var db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
