const jwt = require('jsonwebtoken');


const { JWT_USER_PASSWORD } = require('../routes/config');


// Middleware to verify JWT token
function userMiddleware(req, res, next) {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_USER_PASSWORD);
    if (decoded) {
         req.userId = decoded.userId;
        next();
    } else {
        res.status(403).json({
            message: "Invalid Credentials"
        });
    }
}

module.exports = {
    userMiddleware: userMiddleware
}