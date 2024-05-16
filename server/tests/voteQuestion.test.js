const supertest = require("supertest");
const Question = require("../models/questions");
const User = require("../models/users");

jest.mock("../models/questions");
jest.mock("../models/users");
let server;
const { default: mongoose } = require("mongoose");

describe("POST /upVoteQuestion", () => {
  beforeEach(() => {
    server = require("../server");
  });
  afterEach(async () => {
    server.close();
    await mongoose.disconnect();
  });
  it("should upvote a question successfully", async () => {
    const reqBody = {
      qid: "questionId",
      userName: "testUser",
    };

    // Mock question object
    const mockQuestion = {
      votes: 5,
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
      .post("/question/upVoteQuestion")
      .send(reqBody);

    expect(Question.findById).toHaveBeenCalledWith("questionId");
    expect(User.findOne).toHaveBeenCalledWith({ userName: "testUser" });
    expect(mockUser.userUpVotedQuestion).toEqual(["questionId"]);
    expect(mockUser.save).toHaveBeenCalled();
    expect(mockQuestion.votes).toBe(6);
    expect(mockQuestion.save).toHaveBeenCalled();
    expect(response.body).toEqual({ totalVotes: 6, voteStatus: 1 });
  });

  it("should handle case when user has already upvoted the question", async () => {
    const reqBody = {
      qid: "questionId",
      userName: "testUser",
    };

    const mockQuestion = {
      votes: 5,
      save: jest.fn().mockResolvedValueOnce(),
    };

    const mockUser = {
      userUpVotedQuestion: ["questionId"],
      userDownVotedQuestion: [],
      save: jest.fn().mockResolvedValueOnce(),
    };

    mockUser.userUpVotedQuestion.pull = jest.fn();
    Question.findById.mockResolvedValueOnce(mockQuestion);
    User.findOne.mockResolvedValueOnce(mockUser);

    const response = await supertest(server)
      .post("/question/upVoteQuestion")
      .send(reqBody);

    expect(Question.findById).toHaveBeenCalledWith("questionId");
    expect(User.findOne).toHaveBeenCalledWith({ userName: "testUser" });
    expect(response.body).toEqual({ totalVotes: 4, voteStatus: 1 });
  });

  it("should handle case when user has already downvoted the question", async () => {
    const reqBody = {
      qid: "questionId",
      userName: "testUser",
    };

    const mockQuestion = {
      votes: 5,
      save: jest.fn().mockResolvedValueOnce(),
    };

    const mockUser = {
      userUpVotedQuestion: [],
      userDownVotedQuestion: ["questionId"],
      save: jest.fn().mockResolvedValueOnce(),
    };

    mockUser.userDownVotedQuestion.pull = jest.fn();
    Question.findById.mockResolvedValueOnce(mockQuestion);
    User.findOne.mockResolvedValueOnce(mockUser);

    const response = await supertest(server)
      .post("/question/upVoteQuestion")
      .send(reqBody);

    expect(Question.findById).toHaveBeenCalledWith("questionId");
    expect(User.findOne).toHaveBeenCalledWith({ userName: "testUser" });
    expect(response.body).toEqual({ totalVotes: 7, voteStatus: 1 });
  });

  it("question not found", async () => {
    const reqBody = {
      qid: "questionId",
      userName: "testUser",
    };

    Question.findById.mockResolvedValueOnce(undefined);

    const res = await supertest(server)
      .post("/question/upVoteQuestion")
      .send(reqBody);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error");
  });

  
  it("user not found", async () => {
    const reqBody = {
      qid: "questionId",
      userName: "testUser",
    };

    Question.findById.mockResolvedValueOnce({userName: "testUser"});
    User.findOne.mockResolvedValueOnce(undefined);

    const res = await supertest(server)
      .post("/question/upVoteQuestion")
      .send(reqBody);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error");
  });
});

describe("POST /downVoteQuestion", () => {
  beforeEach(() => {
    server = require("../server");
  });
  afterEach(async () => {
    server.close();
    await mongoose.disconnect();
  });
  it("should downVote a question successfully", async () => {
    const reqBody = {
      qid: "questionId",
      userName: "testUser",
    };

    // Mock question object
    const mockQuestion = {
      votes: 5,
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
      .post("/question/downVoteQuestion")
      .send(reqBody);

    expect(Question.findById).toHaveBeenCalledWith("questionId");
    expect(User.findOne).toHaveBeenCalledWith({ userName: "testUser" });
    expect(mockUser.userDownVotedQuestion).toEqual(["questionId"]);
    expect(mockUser.save).toHaveBeenCalled();
    expect(mockQuestion.votes).toBe(4);
    expect(mockQuestion.save).toHaveBeenCalled();
    expect(response.body).toEqual({ totalVotes: 4, voteStatus: -1 });
  });

  it("should handle case when user has already upvoted the question", async () => {
    const reqBody = {
      qid: "questionId",
      userName: "testUser",
    };

    const mockQuestion = {
      votes: 5,
      save: jest.fn().mockResolvedValueOnce(),
    };

    const mockUser = {
      userUpVotedQuestion: ["questionId"],
      userDownVotedQuestion: [],
      save: jest.fn().mockResolvedValueOnce(),
    };

    mockUser.userUpVotedQuestion.pull = jest.fn();
    Question.findById.mockResolvedValueOnce(mockQuestion);
    User.findOne.mockResolvedValueOnce(mockUser);

    const response = await supertest(server)
      .post("/question/downVoteQuestion")
      .send(reqBody);

    expect(Question.findById).toHaveBeenCalledWith("questionId");
    expect(User.findOne).toHaveBeenCalledWith({ userName: "testUser" });
    expect(response.body).toEqual({ totalVotes: 3, voteStatus: 1 });
  });

  it("should handle case when user has already downvoted the question", async () => {
    const reqBody = {
      qid: "questionId",
      userName: "testUser",
    };

    const mockQuestion = {
      votes: 5,
      save: jest.fn().mockResolvedValueOnce(),
    };

    const mockUser = {
      userUpVotedQuestion: [],
      userDownVotedQuestion: ["questionId"],
      save: jest.fn().mockResolvedValueOnce(),
    };

    mockUser.userDownVotedQuestion.pull = jest.fn();
    Question.findById.mockResolvedValueOnce(mockQuestion);
    User.findOne.mockResolvedValueOnce(mockUser);

    const response = await supertest(server)
      .post("/question/downVoteQuestion")
      .send(reqBody);

    expect(Question.findById).toHaveBeenCalledWith("questionId");
    expect(User.findOne).toHaveBeenCalledWith({ userName: "testUser" });
    expect(response.body).toEqual({ totalVotes: 6, voteStatus: -1 });
  });
  it("question not found", async () => {
    const reqBody = {
      qid: "questionId",
      userName: "testUser",
    };

    Question.findById.mockResolvedValueOnce(undefined);

    const res = await supertest(server)
      .post("/question/downVoteQuestion")
      .send(reqBody);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error");
  });

  
  it("user not found", async () => {
    const reqBody = {
      qid: "questionId",
      userName: "testUser",
    };

    Question.findById.mockResolvedValueOnce({userName: "testUser"});
    User.findOne.mockResolvedValueOnce(undefined);

    const res = await supertest(server)
      .post("/question/downVoteQuestion")
      .send(reqBody);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error");
  });
});

describe("POST /getQuestionStatus", () => {
  beforeEach(() => {
    server = require("../server");
  });
  afterEach(async () => {
    server.close();
    await mongoose.disconnect();
  });
  it("get question vote status", async () => {
    const reqBody = {
      qid: "questionId",
      userName: "testUser",
    };

    // Mock question object
    const mockQuestion = {
      votes: 5,
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
      .post("/question/getQuestionStatus")
      .send(reqBody);

    expect(Question.findById).toHaveBeenCalledWith("questionId");
    expect(User.findOne).toHaveBeenCalledWith({ userName: "testUser" });
    expect(response.body).toEqual({ totalVotes: 5, voteStatus: 0 });
  });

  it("get question vote status already upvoted", async () => {
    const reqBody = {
      qid: "questionId",
      userName: "testUser",
    };

    // Mock question object
    const mockQuestion = {
      votes: 5,
      save: jest.fn().mockResolvedValueOnce(),
    };

    // Mock user object
    const mockUser = {
      userUpVotedQuestion: ["questionId"],
      userDownVotedQuestion: [],
      save: jest.fn().mockResolvedValueOnce(),
    };

    // Mock findById method of Question model to return the mockQuestion
    Question.findById.mockResolvedValueOnce(mockQuestion);

    // Mock findOne method of User model to return the mockUser
    User.findOne.mockResolvedValueOnce(mockUser);

    const response = await supertest(server)
      .post("/question/getQuestionStatus")
      .send(reqBody);

    expect(Question.findById).toHaveBeenCalledWith("questionId");
    expect(User.findOne).toHaveBeenCalledWith({ userName: "testUser" });
    expect(response.body).toEqual({ totalVotes: 5, voteStatus: 1 });
  });
  it("get question vote status already downvoted", async () => {
    const reqBody = {
      qid: "questionId",
      userName: "testUser",
    };

    // Mock question object
    const mockQuestion = {
      votes: 5,
      save: jest.fn().mockResolvedValueOnce(),
    };

    // Mock user object
    const mockUser = {
      userUpVotedQuestion: [],
      userDownVotedQuestion: ["questionId"],
      save: jest.fn().mockResolvedValueOnce(),
    };

    // Mock findById method of Question model to return the mockQuestion
    Question.findById.mockResolvedValueOnce(mockQuestion);

    // Mock findOne method of User model to return the mockUser
    User.findOne.mockResolvedValueOnce(mockUser);

    const response = await supertest(server)
      .post("/question/getQuestionStatus")
      .send(reqBody);

    expect(Question.findById).toHaveBeenCalledWith("questionId");
    expect(User.findOne).toHaveBeenCalledWith({ userName: "testUser" });
    expect(response.body).toEqual({ totalVotes: 5, voteStatus: -1 });
  });
});
