import request from "supertest";
import app from "../../../app.js";

describe("try login with empty fields", () => {
  test("it should response the GET method and return status ok", () => {
    return request(app)
      .post("/api/login")
      .send({
        identifier: " ",
        password: " ",
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
        expect(response.body.message).toEqual === "invalid";
      });
  });
});

describe("Try login using admin", () => {
  test("It should response status code 200 and return message and user data", () => {
    return request(app)
      .post("/api/login")
      .send({
        identifier: "admin",
        password: "abcd1234",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("Login successfull");
      });
  });
});
describe("Try login with compare password string and hashing", () => {
  test("It should response status code 401 and return message and user data", () => {
    return request(app)
      .post("/api/login")
      .send({
        indentifier: "upin",
        password: "abcd1234",
      })
      .then((response) => {
        expect(response.statusCode).toBe === 401;
        expect(response.body.message).toEqual === "login unsuccessfull";
      });
  });
});
