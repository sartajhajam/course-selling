const jwt = require('jsonwebtoken');


const {JWT_ADMIN_PASSWORD} = require('../routes/config');


// Middleware to verify JWT token
function adminMiddleware(req, res, next) {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
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
    adminMiddleware: adminMiddleware
}