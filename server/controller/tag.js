const express = require("express");
const Tag = require("../models/tags");
const Question = require("../models/questions");

const router = express.Router();

const getTagsWithQuestionNumber = async (req, res) => {
    const questions = await Question.find({}).populate("tags");
    const tags = await Tag.find({});

    const result = [];

    for (const tag of tags) {
        let questionCount = 0;
        for (const question of questions) {
            if (question.tags.some(questionTag => questionTag.name === tag.name)) {
                questionCount++;
            }
        }
        result.push({ name: tag.name, qcnt: questionCount });
    }
    res.json(result);
};

// add appropriate HTTP verbs and their endpoints to the router.
router.get("/getTagsWithQuestionNumber", getTagsWithQuestionNumber);

module.exports = router;
