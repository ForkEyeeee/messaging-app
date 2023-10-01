import request from "supertest";
import expressTest from "express";
import mongoTestingServer from "./mongoConfigTesting";
import routes from "../routes/routes";

const app = expressTest();

mongoTestingServer();

app.use(expressTest.urlencoded({ extended: false }));
app.use(expressTest.json());
app.use("/", routes);

// beforeEach(async () => {});

// afterEach(async () => {});

describe("POST /signup", () => {
  it("should create a new user and return a successful signup message", async () => {
    const newUser = {
      username: "testUser",
      password: "testPassword",
    };
    const response = await request(app).post("/signup").send(newUser);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Signup successful");
    expect(response.body.user).toBeDefined();
    expect(response.body.user.username).toBe(newUser.username);
  });

  it("should not create a user if username already exists", async () => {
    const duplicateUser = {
      username: "existingUser",
      password: "testPassword",
    };
    const response = await request(app).post("/signup").send(duplicateUser);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      `Username, ${duplicateUser.username}, already exists.`
    );
  });
});
