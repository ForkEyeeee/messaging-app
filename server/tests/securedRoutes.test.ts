import request from "supertest";
import expressTest from "express";
import mongoTestingServer from "./mongoConfigTesting";
import securedRoutes from "../routes/secureRoutes";
import routes from "../routes/routes";
import passport from "../auth/auth";

const app = expressTest();
mongoTestingServer();

app.use(expressTest.urlencoded({ extended: false }));
app.use(expressTest.json());
app.use(passport.initialize());

app.use("/", securedRoutes);
app.use("/", routes);

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
    const response = await request(app).post("/signup").send(testUser);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Signup successful");
    expect(response.body.user).toBeDefined();
    expect(response.body.user.username).toBe(testUser.username);
  });
  it("should login if username and password are correct", async () => {
    const response = await request(app).post("/login").send(testUser);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Logged in Successfully`);
  });

  it("should return list of users and token", async () => {
    const test = await request(app).post("/login").send(testUser);
    const response = await request(app)
      .get("/home")
      .set("Authorization", "Bearer " + test.body.token);
    expect(response.status).toBe(200);
    expect(response.body.users).toBeDefined();
    expect(response.body.token).toBeDefined();
  });
});
