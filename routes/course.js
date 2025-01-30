const { Router } = require('express');
const courseRouter = Router();
const {UserMiddleware, userMiddleware} = require('../middleware/user');
const {purchaseModel} = require('../db');
const {courseModel} = require('../db');

// Course purchase route
courseRouter.post("/purchase", userMiddleware,async function (req, res) {
  const userId = req.userId;
  const courseId = req.body.courseId;

  await purchaseModel.create({
      userId: userId,
      courseId: courseId
  })    
  // you would expect user to make a purchase
  
  res.json({
      message: "You have successfully made a purchase"
  });
});

// Course preview route
courseRouter.get("/preview",async  function(req, res)  {
  const courses = await courseModel.find({}) ;

  res.json({
        courses: courses
    });
});

// Export the router directly
module.exports = {
courseRouter: courseRouter
}