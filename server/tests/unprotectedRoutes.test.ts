import request from "supertest";
import unprotectedRoutes from "../routes/unprotectedRoutes";
import expressTest from "express";
import mongoTestingServer from "./mongoConfigTesting";

const appTest = expressTest();

mongoTestingServer();

appTest.use(expressTest.urlencoded({ extended: false }));
appTest.use(expressTest.json());
appTest.use("/", unprotectedRoutes);

beforeEach(async () => {});

afterEach(async () => {});

describe("unprotectedRoutes", () => {});

describe("protectedRoutes", () => {});
