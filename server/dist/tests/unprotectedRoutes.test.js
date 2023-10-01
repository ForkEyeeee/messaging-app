"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const mongoConfigTesting_1 = __importDefault(require("./mongoConfigTesting"));
const appTest = (0, express_1.default)();
(0, mongoConfigTesting_1.default)();
appTest.use(express_1.default.urlencoded({ extended: false }));
appTest.use(express_1.default.json());
beforeEach(async () => { });
afterEach(async () => { });
describe("GET /login", function () {
    it("responds with json", async function () {
        const response = await (0, supertest_1.default)(appTest)
            .get("/login")
            .set("Accept", "application/json")
            .send({
            username: "exampl34322e@example.com",
            password: "password",
        });
        // expect(response.headers["Content-Type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body.user.username).toEqual("foo@bar.com");
    });
});
// describe("protectedRoutes", () => {});
