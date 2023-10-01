"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const mongoConfigTesting_1 = __importDefault(require("./mongoConfigTesting"));
const routes_1 = __importDefault(require("routes/routes"));
const appTest = (0, express_1.default)();
(0, mongoConfigTesting_1.default)();
appTest.use(express_1.default.urlencoded({ extended: false }));
appTest.use(express_1.default.json());
appTest.use("/", routes_1.default);
// beforeEach(async () => {});
// afterEach(async () => {});
describe("POST /signup", () => {
    test("signup returns json", function (done) {
        (0, supertest_1.default)(appTest)
            .post("/signup")
            .send({
            username: "example@example.com",
            password: "password",
        })
            .set("Accept", "application/json")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
            if (!res.body.success) {
                throw new Error(`Expected success to be true, got ${res.body.success}`);
            }
            if (res.body.data.userId !== "7f43e3a0-cbc9-4dc5-9892-e61250bba7c9") {
                throw new Error(`Expected userId to be '7f43e3a0-cbc9-4dc5-9892-e61250bba7c9', got ${res.body.data.userId}`);
            }
            if (!res.body.data.token) {
                throw new Error("Expected token to exist");
            }
            if (!res.body.data.startTime) {
                throw new Error("Expected startTime to exist");
            }
        })
            .end(done);
    });
});
// describe("GET /login", function () {
//   it("responds with json", async function () {
//     const response = await request(appTest)
//       .post("/login")
//       .send({
//         username: "example@example.com",
//         password: "password",
//       })
//       .set("Accept", "application/json");
//     // expect(response.headers["Content-Type"]).toMatch(/json/);
//     expect(response.status).toEqual(200);
//     // expect(response.body.user.username).toEqual("foo@bar.com");
//   });
// });
// describe("protectedRoutes", () => {});
