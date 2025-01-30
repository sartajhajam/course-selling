const { Router } = require('express');
const userRouter = Router();
const {userModel} = require('../db');
const jwt = require('jsonwebtoken');
const {JWT_USER_PASSWORD} = require('../routes/config');
const { userMiddleware } = require('../middleware/user');

// Signup route
userRouter.post("/signup", async function (req, res) {
    const { email, password, firstName, lastName } = req.body; // TO DO ZOD Validation 
    // TO DO BRCYPT has the passwod so that plain text passwords are not stored in the database

    // TODO : Put Inside  try catch block 

    await userModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    });
    res.json({
        message: "Signup Succeeded "
    });
});


// Login route
userRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    // check if the user exits in the database and do a async call 
    const user = await userModel.findOne({ 
        email: email,
        password: password
    
    });
    if (user) {
        const token = jwt.sign({ userId: user._id }, JWT_USER_PASSWORD);
        // do the cookie logic here 
        res.json({
            message: "Signin Succeeded ",
            token: token
        });
    }else {
        res.status(403).json({
            message: "Invalid Credentials"
        });
    }
    res.json({
        message: "signin endpoint"
    });
});

// Course purchase route
userRouter.get("/purchases",userMiddleware,async function (req, res) {
    const userId = req.userId;
    const purchases = await purchaseModel.find({
        userId: userId
    });

    res.json({
       purchases: purchases
    });
});

// Export the router directly
module.exports = {
    userRouter: userRouter
}