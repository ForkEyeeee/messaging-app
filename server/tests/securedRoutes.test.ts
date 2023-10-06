import request from "supertest";
import expressTest from "express";
import mongoTestingServer from "./mongoConfigTesting";
import securedRoutes from "../routes/secureRoutes";
import routes from "../routes/routes";
import passport from "../auth/auth";
import Message from "../models/message";
import messageData from "./messageData";
import userData from "./userData";
import User from "../models/user";

const app = expressTest();
mongoTestingServer();

app.use(expressTest.urlencoded({ extended: false }));
app.use(expressTest.json());
app.use(passport.initialize());

app.use("/", securedRoutes);
app.use("/", routes);

beforeAll(async () => {
  await Message.insertMany(messageData);
  await User.insertMany(userData);
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
  it("get profile info", async () => {
    const test = await request(app).post("/login").send(testUser);
    const data = await request(app)
      .get(`/user/6517c7d8d949e4b87f7b6b53/profile`)
      .set("Authorization", "Bearer " + test.body.token);
    expect(data.body.user).toBeDefined();
  });
  it("should return messages array", async () => {
    const test = await request(app).post("/login").send(testUser);
    const data = await request(app)
      .get(`/user/651b3a462edfb41fa6ba48e1/chat`)
      .set("Authorization", "Bearer " + test.body.token);
    expect(data.body).toBeDefined();
    expect(200);
  });
  it("should return new message", async () => {
    const test = await request(app).post("/login").send(testUser);
    const data = await request(app)
      .post(`/user/651b3a462edfb41fa6ba48e1/chat`)
      .set("Authorization", "Bearer " + test.body.token)
      .query({ userid: "651b3a462edfb41fa6ba48e1" })
      .send({
        message: "Im there already.",
        recipient: "651b3a462edfb41fa6ba48e1",
      });
    expect(data.body).toBeDefined();
    expect(200);
  });
  it("should update a message content", async () => {
    const test = await request(app).post("/login").send(testUser);
    const response = await request(app)
      .put(`/user/651b3a462edfb41fa6ba48e1/chat`)
      .set("Authorization", "Bearer " + test.body.token)
      .send({
        message: "Take your time Man",
        messageId: "651bc2e5ff87ebc66275a4e4",
      });
    expect(response.status).toBe(200);
    expect(response.body.Message).toBeDefined();
  });
  it("should delete a message", async () => {
    const test = await request(app).post("/login").send(testUser);
    const response = await request(app)
      .delete(`/user/651b3a462edfb41fa6ba48e1/chat`)
      .set("Authorization", "Bearer " + test.body.token)
      .send({
        messageId: "651bc2e5ff87ebc66275a4e4",
      });
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
