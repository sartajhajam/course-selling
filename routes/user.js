const { Router } = require('express');
const userRouter = Router();

// Signup route
userRouter.post("/signup", function(req, res)  {
    res.json({
        message: "signup endpoint"
    });
});

// Login route
userRouter.post("/signin",function (req, res)  {
    res.json({
        message: "signin endpoint"
    });
});

// Course purchase route
userRouter.get("/purchases",function (req, res)  {
    res.json({
        message: "course purchase endpoint"
    });
});

// Export the router directly
module.exports = {
    userRouter : userRouter
}