const {
  sanitizeInputs,
  validateSignUpFields,
  validateLoginFields,
  validateUserName,
  validateVote,
  validateQuestion
} = require("../utils/middleWares");

describe("Middleware Functions", () => {
  describe("sanitizeInputs", () => {
    test("should sanitize request body", () => {
      const req = { body: { userName: { $gt: 1 } } };
      const next = jest.fn();
      sanitizeInputs(req, {}, next);
      expect(req.body.userName).toEqual({}); // Expecting an empty object
      expect(next).toHaveBeenCalled();
    });
  });

  describe("validateSignUpFields", () => {
    test("should return 400 error if required fields are missing", () => {
      const req = { body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateSignUpFields(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "All required fields for sign-up must be provided",
      });
      expect(next).not.toHaveBeenCalled();
    });

    test("should call next if all required fields are provided", () => {
      const req = {
        body: {
          userName: "test",
          userPassword: "password",
          userFullName: "John Doe",
          userEmail: "test@example.com",
          userPhoneNumber: "1234567890",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateSignUpFields(req, res, next);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe("validateLoginFields", () => {
    test("should return 400 error if username or password is missing", () => {
      const req = { body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateLoginFields(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Both username and password are required for login",
      });
      expect(next).not.toHaveBeenCalled();
    });

    test("should call next if username and password are provided", () => {
      const req = { body: { userName: "test", userPassword: "password" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateLoginFields(req, res, next);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe("validateUserName", () => {
    test("should return 400 error if username is missing", () => {
      const req = { body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateUserName(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Username is required for login",
      });
      expect(next).not.toHaveBeenCalled();
    });

    test("should call next if username is provided", () => {
      const req = { body: { userName: "test" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateUserName(req, res, next);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
  describe('validateVote', () => {
    test('should return 400 error if userName or qid is missing', () => {
      const req = { body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateVote(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Both QuestionId and UserName are required for vote" });
      expect(next).not.toHaveBeenCalled();
    });

    test('should call next if both userName and qid are provided', () => {
      const req = { body: { userName: 'test', qid: '123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateVote(req, res, next);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('validateQuestion', () => {
    test('should return 400 error if qid is missing', () => {
      const req = { body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateQuestion(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "QuestionId is required for report count" });
      expect(next).not.toHaveBeenCalled();
    });

    test('should call next if qid is provided', () => {
      const req = { body: { qid: '123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      validateQuestion(req, res, next);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
