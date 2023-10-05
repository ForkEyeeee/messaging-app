"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const mongoConfigTesting_1 = __importDefault(require("./mongoConfigTesting"));
const secureRoutes_1 = __importDefault(require("../routes/secureRoutes"));
const routes_1 = __importDefault(require("../routes/routes"));
const auth_1 = __importDefault(require("../auth/auth"));
const message_1 = __importDefault(require("../models/message"));
const messageData_1 = __importDefault(require("./messageData"));
const userData_1 = __importDefault(require("./userData"));
const user_1 = __importDefault(require("../models/user"));
const app = (0, express_1.default)();
(0, mongoConfigTesting_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(auth_1.default.initialize());
app.use("/", secureRoutes_1.default);
app.use("/", routes_1.default);
beforeAll(async () => {
    await message_1.default.insertMany(messageData_1.default);
    await user_1.default.insertMany(userData_1.default);
});
describe("Navigate to Home Page", () => {
    const testUser = {
        _id: "651b3a462edfb41fa6ba48e1",
        username: "testUser",
        password: "testPassword",
        messages: [],
        __v: 0,
    };
    it("should create a new user and return a successful signup message", async () => {
        const response = await (0, supertest_1.default)(app).post("/signup").send(testUser);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Signup successful");
        expect(response.body.user).toBeDefined();
        expect(response.body.user.username).toBe(testUser.username);
    });
    it("should login if username and password are correct", async () => {
        const response = await (0, supertest_1.default)(app).post("/login").send(testUser);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe(`Logged in Successfully`);
    });
    it("should return list of users and token", async () => {
        const test = await (0, supertest_1.default)(app).post("/login").send(testUser);
        const response = await (0, supertest_1.default)(app)
            .get("/home")
            .set("Authorization", "Bearer " + test.body.token);
        expect(response.status).toBe(200);
        expect(response.body.users).toBeDefined();
        expect(response.body.token).toBeDefined();
    });
    it("get profile info", async () => {
        const test = await (0, supertest_1.default)(app).post("/login").send(testUser);
        const data = await (0, supertest_1.default)(app)
            .get(`/profile/user/`)
            .set("Authorization", "Bearer " + test.body.token)
            .query({ userid: "651b3a462edfb41fa6ba48e1" });
        expect(data.body.user).toBeDefined();
    });
    it("should return messages array", async () => {
        const test = await (0, supertest_1.default)(app).post("/login").send(testUser);
        const data = await (0, supertest_1.default)(app)
            .get(`/chat/user`)
            .set("Authorization", "Bearer " + test.body.token)
            .query({ userid: "651b3a462edfb41fa6ba48e1" });
        expect(data.body.error).toBe("Clicked user or messages not found");
        expect(404);
    });
    it("should return new message", async () => {
        const test = await (0, supertest_1.default)(app).post("/login").send(testUser);
        console.log("token " + test.body.token);
        const data = await (0, supertest_1.default)(app)
            .post(`/chat/user`)
            .set("Authorization", "Bearer " + test.body.token)
            .query({ userid: "651b3a462edfb41fa6ba48e1" })
            .send({
            message: "Im there already.",
            recipient: "651b3a462edfb41fa6ba48e1",
        });
        console.log(data.body);
        expect(data.body).toBeDefined();
        expect(200);
    });
});
