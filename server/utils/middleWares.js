const mongoSanitize = require("mongo-sanitize");
const sanitizeInputs = (req, res, next) => {
  req.body = mongoSanitize(req.body);
  next();
};
const validateSignUpFields = (req, res, next) => {
  const { userName, userPassword, userFullName, userEmail, userPhoneNumber } =
    req.body;
  if (
    !userName ||
    !userPassword ||
    !userFullName ||
    !userEmail ||
    !userPhoneNumber
  ) {
    return res
      .status(400)
      .json({ error: "All required fields for sign-up must be provided" });
  }
  next();
};

const validateLoginFields = (req, res, next) => {
  const { userName, userPassword } = req.body;
  if (!userName || !userPassword) {
    return res
      .status(400)
      .json({ error: "Both username and password are required for login" });
  }
  next();
};

const validateUserName = (req, res, next) => {
  const { userName } = req.body;
  if (!userName) {
    return res.status(400).json({ error: "Username is required for login" });
  }
  next();
};


const validateVote = (req, res, next) => {
  const { qid, userName } = req.body;
  if (!userName || !qid) {
    return res
      .status(400)
      .json({ error: "Both QuestionId and UserName are required for vote" });
  }
  next();
};


const validateQuestion = (req, res, next) => {
  const { qid } = req.body;
  if (!qid) {
    return res
      .status(400)
      .json({ error: "QuestionId is required for report count" });
  }
  next();
};


module.exports = {
  sanitizeInputs,
  validateSignUpFields,
  validateLoginFields,
  validateUserName,
  validateVote,
  validateQuestion
};
