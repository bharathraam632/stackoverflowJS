const express = require("express");
const Question = require("../models/questions");
const User = require("../models/users");
const { addTag, getQuestionsByOrder } = require("../utils/question");
const { validateQuestion, validateVote } = require("../utils/middleWares");

const router = express.Router();

// To get Questions by Filter
const getQuestionsByFilter = async (req, res) => {
  const { order, search } = req.query;
  const sortedQuestions = await getQuestionsByOrder(order, search);
  res.json(sortedQuestions);
};

// To get Questions by Id
const getQuestionById = async (req, res) => {
  const { qid } = req.params;
  const question = await Question.findOneAndUpdate(
    { _id: qid }, // query
    { $inc: { views: 1 } }, // update
    { new: true } // options: return the updated document
  ).populate("answers");

  // let filteredQusetion = questions.filter((question) => question._id === qid);
  res.json(question);
};

// To add Question
const addQuestion = async (req, res) => {
  const { title, text, tags, asked_by, ask_date_time } = req.body;
  const tagsId = await Promise.all(
    tags.map(async (tag) => {
      return addTag(tag);
    })
  );
  // Create a new question object
  const newQuestion = new Question({
    title: title,
    text: text,
    asked_by: asked_by,
    ask_date_time: ask_date_time,
    answers: [],
    tags: tagsId,
    views: 0,
  });

  const newQuest = await Question.create(newQuestion);

  res.json(newQuest);
};

const upVoteQuestion = async (req, res) => {
  const { qid, userName } = req.body;
  try {
    // Find the question by ID
    const question = await Question.findById(qid);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Find the user by userName
    const user = await User.findOne({ userName: userName });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user has already upvoted the post
    if (user.userUpVotedQuestion.includes(qid)) {
      // Remove the upvote
      user.userUpVotedQuestion.pull(qid);
      await user.save();
      question.votes -= 1;
    } else if (user.userDownVotedQuestion.includes(qid)) {
      // Remove the downvote and add upvote
      user.userDownVotedQuestion.pull(qid);
      user.userUpVotedQuestion.push(qid);
      await user.save();
      question.votes += 2;
    } else {
      // Add upvote
      user.userUpVotedQuestion.push(qid);
      await user.save();
      question.votes += 1;
    }

    // Save the updated question
    await question.save();
    let voteStatus = 0;
    if (user.userUpVotedQuestion.includes(qid)) {
      voteStatus = 1;
    } else if (user.userDownVotedQuestion.includes(qid)) {
      voteStatus = -1;
    }
    // Return the total votes count
    res.json({ totalVotes: question.votes, voteStatus: voteStatus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const downVoteQuestion = async (req, res) => {
  const { qid, userName } = req.body;
  try {
    // Find the question by ID
    const question = await Question.findById(qid);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Find the user by userName
    const user = await User.findOne({ userName: userName });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user has already downvoted the post
    if (user.userDownVotedQuestion.includes(qid)) {
      // Remove the downvote
      user.userDownVotedQuestion.pull(qid);
      await user.save();
      question.votes += 1;
    } else if (user.userUpVotedQuestion.includes(qid)) {
      // Remove the upvote and add downvote
      user.userUpVotedQuestion.pull(qid);
      user.userDownVotedQuestion.push(qid);
      await user.save();
      question.votes -= 2;
    } else {
      // Add downvote
      user.userDownVotedQuestion.push(qid);
      await user.save();
      question.votes -= 1;
    }

    // Save the updated question
    await question.save();

    // Return the total votes count
    let voteStatus = 0;
    if (user.userUpVotedQuestion.includes(qid)) {
      voteStatus = 1;
    } else if (user.userDownVotedQuestion.includes(qid)) {
      voteStatus = -1;
    }

    // Return the total votes count
    res.json({ totalVotes: question.votes, voteStatus: voteStatus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getQuestionStatus = async (req, res) => {
  const { qid, userName } = req.body;

  try {
    const user = await User.findOne({ userName: userName });
    const question = await Question.findById(qid);
    if (user.userDownVotedQuestion.includes(qid)) {
      res.json({ voteStatus: -1, totalVotes: question.votes });
    } else if (user.userUpVotedQuestion.includes(qid)) {
      res.json({ voteStatus: 1, totalVotes: question.votes });
    } else {
      res.json({ voteStatus: 0, totalVotes: question.votes });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const reportQuestion = async (req, res) => {
  try {
    const { qid, userName } = req.body;

    const question = await Question.findById(qid);
    const user = await User.findOne({ userName: userName });

    if (!question) {
      return res.status(400).json({ message: "Question does not exist" });
    }
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    if (question.reportedBy.includes(userName)) {
      await Question.findByIdAndUpdate(qid, {
        $pull: { reportedBy: userName },
      });
      return res
        .status(200)
        .json({
          message: "The question has been unreported.",
          reportStatus: -1
        });
    }

    question.reportedBy.push(userName);
    await question.save();

    if (question.reportedBy.length >= 10) {
      await Question.findByIdAndDelete(qid);
      return res
        .status(200)
        .json({
          message:
            "The question has been deleted as it was reported by 10 users.",
            reportStatus: 1
        });
    }

    return res
      .status(200)
      .json({ message: "The question has been reported successfully.",
      reportStatus: 1
    });
  } catch (error) {
    console.error("Error reporting question:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const reportQuestionStatus = async (req, res) => {
  try {
    const { qid, userName } = req.body;

    const question = await Question.findById(qid);
    const user = await User.findOne({ userName: userName });

    if (!question) {
      return res.status(400).json({ message: "Question does not exist" });
    }
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    if (question.reportedBy.includes(userName)) {
      return res
        .status(200)
        .json({
          message: "The question has been reported by user.",
          reportStatus: 1
        });
    }
    return res
      .status(200)
      .json({ message: "The question has not yet been reported by the user.",
      reportStatus: -1
    });
  } catch (error) {
    console.error("Error fetching reporting status:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getReportCount = async (req, res) => {
  try {
    const { qid } = req.body;
    const question = await Question.findById(qid);
    
    if (!question) {
      return res.status(400).json({ message: "Question does not exist" });
    } else {
      return res.status(200).json({ totalReports: question.reportedBy.length });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


// add appropriate HTTP verbs and their endpoints to the router
router.get("/getQuestion", getQuestionsByFilter);
router.get("/getQuestionById/:qid", getQuestionById);
router.post("/addQuestion", addQuestion);
router.post("/upVoteQuestion", validateVote, upVoteQuestion);
router.post("/downVoteQuestion", validateVote, downVoteQuestion);
router.post("/getQuestionStatus", validateVote, getQuestionStatus);
router.post("/reportQuestion", validateVote, reportQuestion);
router.post("/reportQuestionStatus", validateVote, reportQuestionStatus);
router.post("/getReportCounts", validateQuestion, getReportCount);

module.exports = router;
