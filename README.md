# Final Team Project for CS5500 Change1

Login with your Northeastern credentials and read the project description [here](https://northeastern-my.sharepoint.com/:w:/g/personal/j_mitra_northeastern_edu/ETUqq9jqZolOr0U4v-gexHkBbCTAoYgTx7cUc34ds2wrTA?e=URQpeI).

## List of features

All the features you have implemented.

| Feature          | Description                                                                                             | E2E Tests                                  | Component Tests                                        | Jest Tests                        | API End Points                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------ | --------------------------------- | -------------------------------------------------------------------------------- |
| Add Questions    | Add new question                                                                                        | /testing/cypress/e2e/add_questions.cy.js   | /client/cypress/component/new_question.cy.js           | server\tests\newQuestion.test.js  | question/addQuestion                                                             |
| View Questions   | View Existing questions                                                                                 | /testing/cypress/e2e/view_questions.cy.js  | /client/cypress/component/question_page.cy.js          | server\tests\question.test.js     | question/getQuestion, question/getQuestionById/:qid                              |
| Add/View Answers | Add answers to a question                                                                               | /testing/cypress/e2e/answers.cy.js         | /client/cypress/component/answer_page.cy.js            | server\tests\newAnswer.test.js    | answer/addAnswer, question/getQuestionById/:qid                                 |
| Post moderation  | Allows to flag questions that are spam or inappropriate and delete them after certain number of reports | /testing/cypress/e2e/post_moderation.cy.js | /client/cypress/component/report_post_moderation.cy.js | server\tests\userReport.test.js   | question/reportQuestion, question/reportQuestionStatus, question/getReportCounts |
| Search questions | Search existing questions by title, text or tags                                                        | /testing/cypress/e2e/search.cy.js          | /client/cypress/component/search.cy.js                 | server\tests\question.test.js     | question/getQuestion                                                             |
| Voting questions | Allows users to upvote or downvote the questions                                                        | /testing/cypress/e2e/voting.cy.js          | /client/cypress/component/voting.cy.js                 | server\tests\voteQuestion.test.js | question/upVoteQuestion, question/downVoteQuestion, question/getQuestionStatus   |
| Tag questions    | Allows users to associate relevant tags with the questions                                              | /testing/cypress/e2e/tags.cy.js            | /client/cypress/component/tag_page.cy.js               | server\tests\tags.test.js         | tag/getTagsWithQuestionNumber                                                    |
| User Profiles    | Allows user to access profiles of other users                                                           | /testing/cypress/e2e/user_profiles.cy.js   | /client/cypress/component/userProfile.cy.js            | server\tests\userProfile.test.js  | user/getUserProfile                                                              |

## Instructions to generate and view coverage report

1. Navigate to server/
2. Run command : npx jest --coverage --runInBand --no-cache
3. Open /server/coverage/lcov-report/index.html to view the coverage

## Extra Credit Section (if applicable)

### Extra Features:

| Feature     | Description                          | E2E Tests                                   | Component Tests                             | Jest Tests                      | API End Points |
| ----------- | ------------------------------------ | ------------------------------------------- | ------------------------------------------- | ------------------------------- | -------------- |
| User SignUp | Register a new user to the system    | /testing/cypress/e2e/UserRegistration.cy.js | /client/cypress/component/signUp_page.cy.js | server\tests\userSignUp.test.js | user/signUser  |
| User Login  | Login an existing user to the system | /testing/cypress/e2e/UserRegistration.cy.js | /client/cypress/component/login_page.cy.js  | server\tests\userLogin.test.js  | user/loginUser |
