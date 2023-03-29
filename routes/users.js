const express = require('express');
const router = express.Router();
const { 
    getUsers, 
    registerUser, 
    loginUser, 
    currentUser } = require('../controllers/userController.js');
const validateToken = require('../middleware/tokenValidationHandler.js');

router.get("/", getUsers);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;
