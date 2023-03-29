const asyncHandler = require('express-async-handler');
const Item = require('../models/itemModel.js');

// View all items in database
// GET /api/items
// private
const getItems = asyncHandler(async (req, res) => {
    const items = await Item.find();
    res.status(200).send(items);
});

// Add item to database
// POST /api/items
// private
const addItem = asyncHandler(async (req, res) => {
    const { title, category, description, difficulty, time } = req.body;
    if(!title || !category || !description || !difficulty || !time) {
        res.status(400);
        throw new Error("Please include all fields");
    } 
    
    const complete = false;
    const item = await Item.create({
        title,
        category,
        description,
        difficulty,
        time,
        complete,
        owner: req.username
    });
    
    res.status(201).send(item);
});


// Find items based on given filters
// GET /api/items/find/:filter
// private
const findItems = asyncHandler(async (req, res) => {
    const filter = req.params.filter;
    const { search } = req.body;
    if(!filter) {
        res.status(400);
        throw new Error("Please provide a filter to search for");
    }
    
    const items = await Item.find({ [filter]:new RegExp(search) });
    res.status(200).send(items);
});


// Retrieve item from database based on id
// GET /api/items/:id
// private
const getItem = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if(!checkIDValid(id)) {
        res.status(400);
        throw new Error("Given ID does not fit ID format");
    }

    const item = await Item.findById(id);
    if(!item) {
        res.status(404);
        throw new Error("An item with that ID does not exist in the database");
    }
    
    res.status(200).send(item);
});


// Delete item from database based on id
// DELETE /api/items/:id
// private
const deleteItem = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if(!checkIDValid(id)) {
        res.status(400);
        throw new Error("Given ID does not fit ID format")
    }

    const item = await Item.findById(id);
    if(!item) {
        res.status(404);
        throw new Error("An item with that ID does not exist in the database");
    }

    if(item.owner !== req.username) {
        res.status(403);
        throw new Error("Attempt to update an item that belongs to someone else")
    }

    await Item.findByIdAndDelete(id);
    res.status(200).send(item);
});


// update item from database based on id
// PATCH /api/items/:id
// private
const updateItem = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if(!checkIDValid(id)) {
        res.status(400);
        throw new Error("Given ID does not fit ID format")
    }

    const item = await Item.findById(id);
    if(!item) {
        res.status(404);
        throw new Error("An item with that ID does not exist in the database");
    }

    if(item.owner !== req.username) {
        res.status(403);
        throw new Error("Attempt to update an item that belongs to someone else");
    }

    const { title, category, description, difficulty, time, complete } = req.body;
    if(title) item.title = title;
    if(category) item.category = category;
    if(description) item.description = description;
    if(difficulty) item.difficulty = difficulty;
    if(time) item.time = time;
    if(complete) item.complete = complete;

    await Item.findByIdAndUpdate(id, item, { new: true });
    res.status(200).send(item);
});


// check if ID is a valid ObjectID
function checkIDValid(id) {
    return id.match(/^[0-9a-fA-F]{24}$/);
}

module.exports = {
    getItems,
    addItem,
    findItems,
    getItem,
    deleteItem,
    updateItem
};
