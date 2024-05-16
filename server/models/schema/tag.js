const mongoose = require("mongoose");

module.exports = mongoose.Schema(
    {
        // add relevant properties.
        name: {type: String},

    },
    { collection: "Tag" }
);
