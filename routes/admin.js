const {Router} = require('express');

const adminRouter = Router();

const {adminModel} = require('../db');


adminRouter.post("/signup", function(req, res)  {
    res.json({
        message: "signup endpoint"
    });
});
adminRouter.post("/signin", function(req, res)  {
    res.json({
        message: "signin endpoint"
    });
});

adminRouter.post("/course", function(req, res)  {
    res.json({
        message: "course purchase endpoint"
    });
});

adminRouter.put("/course", function(req, res)  {
    res.json({
        message: "add new courses"
    });
});


adminRouter.get("/course/bulk", function(req, res)  {
    res.json({
        message: "get all the courses"
    });
});



module.exports = {
    adminRouter: adminRouter
}