"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const mongoConfigTesting_1 = __importDefault(require("./mongoConfigTesting"));
const routes_1 = __importDefault(require("../routes/routes"));
const auth_1 = __importDefault(require("../auth/auth"));
const app = (0, express_1.default)();
(0, mongoConfigTesting_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(auth_1.default.initialize());
app.use("/", routes_1.default);
// beforeAll(async () => {
//   await mongoTestingServer();
// });
// beforeEach(async () => {});
// afterEach(async () => {});
describe("POST /signup", () => {
    it("should create a new user and return a successful signup message", async () => {
        const newUser = {
            username: "testUser",
            password: "testPassword",
        };
        const response = await (0, supertest_1.default)(app).post("/signup").send(newUser);
        console.log(response);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Signup successful");
        expect(response.body.user).toBeDefined();
        expect(response.body.user.username).toBe(newUser.username);
    });
    it("should not create a user if username already exists", async () => {
        const duplicateUser = {
            username: "testUser",
            password: "testPassword",
        };
        const response = await (0, supertest_1.default)(app).post("/signup").send(duplicateUser);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe(`Username, ${duplicateUser.username}, already exists.`);
    });
});
