"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes/routes"));
const secureRoutes_1 = __importDefault(require("./routes/secureRoutes"));
const passport_1 = __importDefault(require("passport"));
require("./auth/auth");
const app = (0, express_1.default)();
app.use(helmet_1.default.contentSecurityPolicy({
    directives: {
        "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
}));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use((0, compression_1.default)());
app.use("/api", routes_1.default);
app.use("/api", passport_1.default.authenticate("jwt", { session: false }), secureRoutes_1.default);
// Set up mongoose connection
mongoose_1.default.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI || process.env.dev_db_url;
main().catch(err => console.log(err));
async function main() {
    await mongoose_1.default.connect(mongoDB);
}
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
//  error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.json({ message: res.locals.message, success: false });
});
module.exports = app;
