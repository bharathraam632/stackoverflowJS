// Unit tests for getUserProfile in controller/user.js

const supertest = require("supertest");

const User = require("../models/users");
const { default: mongoose } = require("mongoose");

User.findOne = jest.fn();

let server;
describe("POST /getUserProfile", () => {
  beforeEach(() => {
    server = require("../server");
  });
  afterEach(async () => {
    server.close();
    await mongoose.disconnect();
  });

  it("should return user object", async () => {
    User.findOne.mockResolvedValueOnce({ userName: "user1" });

    const response = await supertest(server)
      .post("/user/getUserProfile")
      .send({ userName: "user1" });

    expect(response.status).toBe(200);
    // Asserting the response body
    expect(response.body).toHaveProperty('user');
    expect(User.findOne).toHaveBeenCalled();
  });

  it("no user object found", async () => {
    User.findOne.mockResolvedValueOnce();

    const response = await supertest(server)
      .post("/user/getUserProfile")
      .send({ userName: "user1" });

    expect(User.findOne).toHaveBeenCalled();
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });

  
  it("catch errors", async () => {
    User.findOne = jest.fn().mockRejectedValueOnce(new Error('Database error'));
    const response = await supertest(server)
      .post("/user/getUserProfile")
      .send({ userName: "test" });

    expect(User.findOne).toHaveBeenCalled();
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });
});
