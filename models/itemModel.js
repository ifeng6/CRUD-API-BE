const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please include a title"]
    },
    category: {
        type: String,
        required: [true, "Please include a category"]
    },
    description: {
        type: String,
        required: [true, "Please include a description"]
    },
    difficulty: {
        type: String,
        required: [true, "Please include a difficulty"]
    },
    time: {
        type: String,
        required: [true, "Please include a time estimate"]
    },
    complete: {
        type: Boolean,
        required: [true, "Please include a status of completion"]
    },
    owner: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Item", itemSchema);
