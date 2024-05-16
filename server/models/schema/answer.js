const mongoose = require("mongoose");

// Schema for answers
module.exports = mongoose.Schema(
    {
        // define relevant properties.
        text: {type: String},
        ans_by: {type: String},
        ans_date_time: {type: Date},
    },
    { collection: "Answer" }
);
