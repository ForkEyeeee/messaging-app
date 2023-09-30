import request from "supertest";
import expressTest from "express";
import mongoTestingServer from "./mongoConfigTesting";

const appTest = expressTest();

mongoTestingServer();

appTest.use(expressTest.urlencoded({ extended: false }));
appTest.use(expressTest.json());

beforeEach(async () => {});

afterEach(async () => {});

describe("unprotectedRoutes", () => {});

describe("protectedRoutes", () => {});
