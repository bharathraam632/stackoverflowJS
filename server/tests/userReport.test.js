const supertest = require("supertest");
const Question = require("../models/questions");
const User = require("../models/users");

jest.mock("../models/questions");
jest.mock("../models/users");
let server;
const { default: mongoose } = require("mongoose");

describe("POST /reportQuestion", () => {
  beforeEach(() => {
    server = require("../server");
  });
  afterEach(async () => {
    server.close();
    await mongoose.disconnect();
  });
  it("should report a question successfully", async () => {
    const reqBody = {
      qid: "questionId",
      userName: "testUser",
    };

    // Mock question object
    const mockQuestion = {
      reportedBy: ["testUser2"],
      save: jest.fn().mockResolvedValueOnce(),
    };

    // Mock user object
    const mockUser = {
      userUpVotedQuestion: [],
      userDownVotedQuestion: [],
      save: jest.fn().mockResolvedValueOnce(),
    };

    // Mock findById method of Question model to return the mockQuestion
    Question.findById.mockResolvedValueOnce(mockQuestion);
    Question.findByIdAndUpdate.mockResolvedValueOnce({
      reportedBy: "testUser",
    });

    // Mock findOne method of User model to return the mockUser
    User.findOne.mockResolvedValueOnce(mockUser);

    const response = await supertest(server)
      .post("/question/reportQuestion")
      .send(reqBody);

    expect(Question.findById).toHaveBeenCalledWith("questionId");
    expect(User.findOne).toHaveBeenCalledWith({ userName: "testUser" });
    expect(response.body).toEqual({
      message: "The question has been reported successfully.",
      reportStatus: 1,
    });
  });
  it("should unreport a question successfully", async () => {
    const reqBody = {
      qid: "questionId",
      userName: "testUser2",
    };

    // Mock question object
    const mockQuestion = {
      reportedBy: ["testUser2"],
      save: jest.fn().mockResolvedValueOnce(),
    };

    // Mock user object
    const mockUser = {
      userUpVotedQuestion: [],
      userDownVotedQuestion: [],
      save: jest.fn().mockResolvedValueOnce(),
    };

    // Mock findById method of Question model to return the mockQuestion
    Question.findById.mockResolvedValueOnce(mockQuestion);
    Question.findByIdAndUpdate.mockResolvedValueOnce({
      reportedBy: "testUser2",
    });

    // Mock findOne method of User model to return the mockUser
    User.findOne.mockResolvedValueOnce(mockUser);

    const response = await supertest(server)
      .post("/question/reportQuestion")
      .send(reqBody);

    expect(Question.findById).toHaveBeenCalledWith("questionId");
    expect(User.findOne).toHaveBeenCalledWith({ userName: "testUser2" });
    expect(response.body).toEqual({
      message: "The question has been unreported.",
      reportStatus: -1,
    });
  });
  it("should delete a question successfully", async () => {
    const reqBody = {
      qid: "questionId",
      userName: "testUser2",
    };

    // Mock question object
    const mockQuestion = {
      reportedBy: [
        "testUser1",
        "testUser3",
        "testUser4",
        "testUser5",
        "testUser6",
        "testUser7",
        "testUser8",
        "testUser9",
        "testUser12",
        "testUser10",
        "testUser11",
      ],
      save: jest.fn().mockResolvedValueOnce(),
    };

    // Mock user object
    const mockUser = {
      userUpVotedQuestion: [],
      userDownVotedQuestion: [],
      save: jest.fn().mockResolvedValueOnce(),
    };

    // Mock findById method of Question model to return the mockQuestion
    Question.findById.mockResolvedValueOnce(mockQuestion);
    Question.findByIdAndUpdate.mockResolvedValueOnce({
      reportedBy: "testUser2",
    });
    Question.findByIdAndDelete.mockResolvedValueOnce({
      reportedBy: "testUser2",
    });

    // Mock findOne method of User model to return the mockUser
    User.findOne.mockResolvedValueOnce(mockUser);

    const response = await supertest(server)
      .post("/question/reportQuestion")
      .send(reqBody);

    expect(Question.findById).toHaveBeenCalledWith("questionId");
    expect(User.findOne).toHaveBeenCalledWith({ userName: "testUser2" });
    expect(Question.findByIdAndDelete).toHaveBeenCalledWith("questionId");
    expect(response.body).toEqual({
      message: "The question has been deleted as it was reported by 10 users.",
      reportStatus: 1,
    });
  });
});

describe("POST /reportQuestionStatus", () => {
  beforeEach(() => {
    server = require("../server");
  });
  afterEach(async () => {
    server.close();
    await mongoose.disconnect();
  });
  it("should get a question report status successfully", async () => {
    const reqBody = {
      qid: "questionId",
      userName: "testUser",
    };

    // Mock question object
    const mockQuestion = {
      reportedBy: ["testUser2"],
      save: jest.fn().mockResolvedValueOnce(),
    };

    // Mock user object
    const mockUser = {
      userUpVotedQuestion: [],
      userDownVotedQuestion: [],
      save: jest.fn().mockResolvedValueOnce(),
    };

    // Mock findById method of Question model to return the mockQuestion
    Question.findById.mockResolvedValueOnce(mockQuestion);

    // Mock findOne method of User model to return the mockUser
    User.findOne.mockResolvedValueOnce(mockUser);

    const response = await supertest(server)
      .post("/question/reportQuestionStatus")
      .send(reqBody);

    expect(Question.findById).toHaveBeenCalledWith("questionId");
    expect(User.findOne).toHaveBeenCalledWith({ userName: "testUser" });
    expect(response.body).toEqual({
      message: "The question has not yet been reported by the user.",
      reportStatus: -1,
    });
  });

  it("should get a question report status of already reported successfully", async () => {
    const reqBody = {
      qid: "questionId",
      userName: "testUser2",
    };

    // Mock question object
    const mockQuestion = {
      reportedBy: ["testUser2"],
      save: jest.fn().mockResolvedValueOnce(),
    };

    // Mock user object
    const mockUser = {
      userUpVotedQuestion: [],
      userDownVotedQuestion: [],
      save: jest.fn().mockResolvedValueOnce(),
    };

    // Mock findById method of Question model to return the mockQuestion
    Question.findById.mockResolvedValueOnce(mockQuestion);

    // Mock findOne method of User model to return the mockUser
    User.findOne.mockResolvedValueOnce(mockUser);

    const response = await supertest(server)
      .post("/question/reportQuestionStatus")
      .send(reqBody);

    expect(Question.findById).toHaveBeenCalledWith("questionId");
    expect(User.findOne).toHaveBeenCalledWith({ userName: "testUser" });
    expect(response.body).toEqual({
      message: "The question has been reported by user.",
      reportStatus: 1,
    });
  });
});

describe("POST /getReportCounts", () => {
  beforeEach(() => {
    server = require("../server");
  });
  afterEach(async () => {
    server.close();
    await mongoose.disconnect();
  });
  it("should get a question report counts", async () => {
    const reqBody = {
      qid: "questionId",
      userName: "testUser",
    };

    // Mock question object
    const mockQuestion = {
      reportedBy: ["testUser2"],
      save: jest.fn().mockResolvedValueOnce(),
    };

    // Mock user object
    const mockUser = {
      userUpVotedQuestion: [],
      userDownVotedQuestion: [],
      save: jest.fn().mockResolvedValueOnce(),
    };

    // Mock findById method of Question model to return the mockQuestion
    Question.findById.mockResolvedValueOnce(mockQuestion);

    // Mock findOne method of User model to return the mockUser
    User.findOne.mockResolvedValueOnce(mockUser);

    const response = await supertest(server)
      .post("/question/getReportCounts")
      .send(reqBody);

    expect(Question.findById).toHaveBeenCalledWith("questionId");
    expect(User.findOne).toHaveBeenCalledWith({ userName: "testUser" });
    expect(response.body).toEqual({
      totalReports: 1,
    });
  });
});
