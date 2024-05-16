var Tag = require("../models/tags");
let Question = require("../models/questions");

const addTag = async (tname) => {
  let tag = await Tag.findOne({ name: tname }).exec();
  if (!tag) {
    try {
      const newTag = new Tag({ name: tname });
      tag = await newTag.save();
    } catch (error) {
      console.error("Error saving new tag:", error);
      throw error;
    }
  }

  return tag ? tag._id : null;
};

const getQuestionsByOrder = async (order, search = "") => {
  // complete the function
  if (order == "unanswered") {
    const questions = await Question.find({ answers: { $size: 0 } }).populate("tags").exec();
    const filteredQuestions = questions.filter(
      (question) => question.answers.length === 0
    );
    filteredQuestions.sort((a, b) => {
      const dateA = new Date(a.ask_date_time);
      const dateB = new Date(b.ask_date_time);
      return dateB - dateA;
    });
    return filteredQuestions;
  } else if (order === "active") {
    const questions = await Question.find({}).populate("answers").populate("tags").exec();
    const questionsWithLatestAnswerTime = questions.map((question) => {
      const latestAnswerTime = question.answers.reduce((latestTime, answer) => {
        if (answer.ans_date_time > latestTime) {
          return answer.ans_date_time;
        }
        return latestTime;
      }, null);
      return { ...question.toObject(), latestAnswerTime };
    });
    questionsWithLatestAnswerTime.sort((a, b) => {
      if (b.latestAnswerTime > a.latestAnswerTime) {
        return 1;
      } else if (b.latestAnswerTime < a.latestAnswerTime) {
        return -1;
      } else {
        if (a.ask_date_time > b.ask_date_time) {
          return -1;
        } else if (a.ask_date_time < b.ask_date_time) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    return questionsWithLatestAnswerTime;
  } else {
    const questions = await Question.find({}).populate("tags").exec();

    questions.sort((a, b) => {
      const dateA = new Date(a.ask_date_time);
      const dateB = new Date(b.ask_date_time);
      return dateB - dateA;
    });
    if(search!=""){
      return filterQuestionsBySearch(questions, search);
    }
    return questions;
  }
  
};

const parseTags = (search) => {
  return (search.match(/\[([^\]]+)\]/g) || []).map((word) => word.slice(1, -1));
};

const parseKeyword = (search) => {
  return search.replace(/\[([^\]]+)\]/g, " ").match(/\b\w+\b/g) || [];
};

const checkTagInQuestion = (q, taglist) => {
  for (let tag of taglist) {
    for (let tid of q.tags) {
      if (tag.toLowerCase() === tid.name.toLowerCase()) {
        return true;
      }
    }
  }

  return false;
};
const checkKeywordInQuestion = (q, keywordlist) => {
  for (let w of keywordlist) {
    if (
      q.title.toLowerCase().includes(w.toLowerCase()) ||
      q.text.toLowerCase().includes(w.toLowerCase())
    ) {
      return true;
    }
  }

  return false;
};
const filterQuestionsBySearch = (qlist, search) => {
  // complete the function return [];
  let searchTags = parseTags(search);
  let searchKeyword = parseKeyword(search);
  const res = qlist.filter((q) => {
    if (searchKeyword.length == 0 && searchTags.length == 0) {
      return true;
    } else if (searchKeyword.length == 0) {
      return checkTagInQuestion(q, searchTags);
    } else if (searchTags.length == 0) {
      return checkKeywordInQuestion(q, searchKeyword);
    } else {
      return (
        checkKeywordInQuestion(q, searchKeyword) ||
        checkTagInQuestion(q, searchTags)
      );
    }
  });
  return res;
};

const getQuestionByIdHandler = async (qid) => {
  let questions = await Question.find({ _id: qid }).populate("Question").exec();
  // questions=questions.find((q) => q.qid == qid);
  // let question = await Question.findOneAndUpdate(
  //   { _id: qid },
  //   { $inc: { views: 1 } },
  //   { new: true }
  // ).exec();
  return questions;
};

module.exports = {
  addTag,
  getQuestionsByOrder,
  filterQuestionsBySearch,
  getQuestionByIdHandler,
};
