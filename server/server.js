// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// const MONGO_URL = "mongodb://127.0.0.1:27017/fake_so";
// const MONGO_URL = "mongodb://mongodb:27017/fake_so";
// const CLIENT_URL = "http://localhost:3000";
// const port = 8000;
const { MONGO_URL } = require('../server/config');
const { CLIENT_URL } = require('../server/config');
const { port } = require('../server/config');

mongoose.connect(MONGO_URL);

const app = express();

app.use(
    cors({
        credentials: true,
        origin: [CLIENT_URL],
    })
);

app.use(express.json());

app.get("", (req, res) => {
    res.send("hello world");
    res.end();
});
const questionController = require("./controller/question");
const tagController = require("./controller/tag");
const answerController = require("./controller/answer");
const userController = require("./controller/user");

app.use("/question", questionController);
app.use("/tag", tagController);
app.use("/answer", answerController);
app.use("/user", userController);

let server = app.listen(port, () => {
    console.log(`Server starts at http://localhost:${port}`);
});

process.on("SIGINT", () => {
    server.close();
    mongoose.disconnect();
    console.log("Server closed. Database instance disconnected");
    process.exit(0);
});

module.exports = server
//server
