const express = require('express');
const router = express.Router();
const { 
    getItems,
    addItem,
    findItems,
    getItem,
    deleteItem,
    updateItem } = require('../controllers/itemController.js');
const validateToken = require('../middleware/tokenValidationHandler.js');

router.use(validateToken);

router.get("/", getItems);

router.post("/", addItem);

router.get("/find/:filter", findItems);

router.get("/:id", getItem);

router.delete("/:id", deleteItem);

router.patch("/:id", updateItem);

module.exports = router;
