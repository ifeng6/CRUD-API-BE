const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please include a username"]
    },
    password: {
        type: String,
        required: [true, "Please include a password"]
    }
});

module.exports = mongoose.model("User", userSchema);
