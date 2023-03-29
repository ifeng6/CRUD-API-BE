const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

// Get all registered usernames
// GET /api/users
// public
const getUsers = asyncHandler(async (req, res) => {
    let usernames = [];

    const users = await User.find();
    users.forEach((user) => usernames.push(user.username));

    res.status(200).send(usernames);
});


// Register a new user
// POST /api/users/register
// public
const registerUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        res.status(400);
        throw new Error("Please include both a username and password");
    }

    const userExists = await User.findOne({ username });
    if(userExists) {
        res.status(400);
        throw new Error("Username is taken, please choose another username");
    }

    const user = await User.create({
        username,
        password
    });

    res.status(201).send({ username });
});


// Login a user
// POST /api/users/login
// public
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        res.status(400);
        throw new Error("Please include a username and password");
    }

    const user = await User.findOne({ username });
    if(!user) {
        res.status(400);
        throw new Error("User doesn't exist, please register first");
    }

    if(password !== user.password) {
        res.status(401);
        throw new Error("Incorrect username or password");
    }

    const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"});
    res.status(200).send({ accessToken });
});


// Current logged in user
// GET /api/users/current
// private
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).send(`Current user is ${req.username}`);
});

module.exports = {
    getUsers,
    registerUser,
    loginUser,
    currentUser
};
