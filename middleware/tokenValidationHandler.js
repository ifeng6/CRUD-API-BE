const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]; // get token: ex. Bearer token...
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                res.status(401);
                throw new Error("Invalid or expired token");
            }
            req.username = decoded.username;
            next();
        });
    }

    if(!token) {
        res.status(401);
        throw new Error("Missing token");
    }
});

module.exports = validateToken;
