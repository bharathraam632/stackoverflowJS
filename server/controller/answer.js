const express = require("express");
const Answer = require("../models/answers");
const Question = require("../models/questions");

const router = express.Router();

// Adding answer
const addAnswer = async (req, res) => {
    const { qid, ans } = req.body;

    const newAnswer = await Answer.create({ text: ans.text, ans_by: ans.ans_by, ans_date_time: ans.ans_date_time});

    await Question.findOneAndUpdate(
        { _id: qid },
        { $push: { answers: { $each: [newAnswer._id], $position: 0 } } },
        { new: true }
    );

    res.json(newAnswer);
};

// add appropriate HTTP verbs and their endpoints to the router.
router.post("/addAnswer", addAnswer);
module.exports = router;
