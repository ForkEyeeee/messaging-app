import request from "supertest";
import expressTest from "express";
import mongoTestingServer from "./mongoConfigTesting";
import routes from "../routes/routes";
import passport from "../auth/auth";

const app = expressTest();
mongoTestingServer();

app.use(expressTest.urlencoded({ extended: false }));
app.use(expressTest.json());
app.use(passport.initialize());

app.use("/", routes);
// beforeAll(async () => {
//   await mongoTestingServer();
// });
// beforeEach(async () => {});

// afterEach(async () => {});

describe("POST /signup", () => {
  const testUser = {
    username: "testUser",
    password: "testPassword",
  };

  const wrongCredentials = {
    username: "testuser123",
    password: "testPassword",
  };

  it("should create a new user and return a successful signup message", async () => {
    const response = await request(app).post("/signup").send(testUser);
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Signup successful");
    expect(response.body.user).toBeDefined();
    expect(response.body.user.username).toBe(testUser.username);
  });

  it("should not create a user if username already exists", async () => {
    const response = await request(app).post("/signup").send(testUser);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      `Username, ${testUser.username}, already exists.`
    );
  });

  it("should login if username and password are correct", async () => {
    const response = await request(app).post("/login").send(testUser);
    expect(response.status).toBe(200);
    console.log(response.body);
    expect(response.body.message).toBe(`Logged in Successfully`);
  });

  it("should not login if username and password are incorrect", async () => {
    const response = await request(app).post("/login").send(wrongCredentials);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(`Invalid credentials`);
  });
});
