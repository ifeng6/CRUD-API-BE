// imports
const express = require('express');
const connectDB = require('./config/DBConnection.js');
const bodyParser = require('body-parser');
const itemRouter = require('./routes/items');
const userRouter = require('./routes/users');
const errorHandler = require('./middleware/errorHandler.js');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.json());
app.use("/api/items", itemRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);

app.set("view engine", "ejs");

app.get("/api", (req, res) => {
    res.render("index");
});

app.listen(PORT, () => {
    console.log(`Server start on port ${PORT}`)
});
