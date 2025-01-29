const { Router } = require('express');
const courseRouter = Router();

// Course purchase route
courseRouter.post("/purchase", function(req, res)  {
    res.json({
        message: "course buying endpoint"
    });
});

// Course preview route
courseRouter.get("/preview", function(req, res)  {
    res.json({
        message: "course listing endpoint"
    });
});

// Export the router directly
module.exports = {
courseRouter: courseRouter
}