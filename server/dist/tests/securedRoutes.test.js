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
const app = (0, express_1.default)();
(0, mongoConfigTesting_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(auth_1.default.initialize());
app.use("/", secureRoutes_1.default);
app.use("/", routes_1.default);
// beforeAll(async () => {
//   await mongoTestingServer();
// });
// beforeEach(async () => {});
// afterEach(async () => {});
// describe("GET /home", () => {
//   const testUser = {
//     username: "testUser",
//     password: "testPassword",
//   };
//   const wrongCredentials = {
//     username: "testuser123",
//     password: "testPassword",
//   };
//   it("should return list of users and token", async () => {
// 		const response = await request(app).post("/login").send(testUser);
//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe(`Logged in Successfully`);
//     const response = await request(app).get("/home");
//     expect(response.status).toBe(200);
//     expect(response.body.user).toBeDefined();
//     expect(response.body.token).toBeDefined();
//   });
// });
describe("Navigate to Home Page", () => {
    const testUser = {
        username: "testUser",
        password: "testPassword",
    };
    const wrongCredentials = {
        username: "testuser123",
        password: "testPassword",
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
});
