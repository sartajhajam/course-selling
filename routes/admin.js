const { Router } = require('express');

const adminRouter = Router();

const { adminModel } = require('../db');

const jwt = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require('../routes/config');
const { adminMiddleware } = require('../middleware/admin');


// brcypt , zod ,jsoneweb token


adminRouter.post("/signup", async function (req, res) {
    const { email, password, firstName, lastName } = req.body; // TO DO ZOD Validation 
    // TO DO BRCYPT has the passwod so that plain text passwords are not stored in the database

    // TODO : Put Inside  try catch block 

    

    await adminModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    });
    res.json({
        message: "Signup Succeeded "
    });
});


adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body; // Extract email and password from req.body

    // check if the user exits in the database and do a async call 
    const admin = await adminModel.findOne({
        email: email,
        password: password

    });
    if (admin) {
        const token = jwt.sign({ adminId: admin._id }, JWT_ADMIN_PASSWORD);
        // do the cookie logic here 
        res.json({
            message: "Signin Succeeded ",
            token: token
        });
    } else {
        res.status(403).json({
            message: "Invalid Credentials"
        });

    }
});


adminRouter.post("/course",adminMiddleware, async function (req, res) {
    
    const { title, description,imageUrl, price } = req.body;

    await courseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    });

    res.json({
        message: "course  created ",
        courseId: course._id
    });
});

adminRouter.put("/course", function (req, res) {
    res.json({
        message: "add new courses"
    });
});


adminRouter.get("/course/bulk", function (req, res) {
    res.json({
        message: "get all the courses"
    });
});



module.exports = {
    adminRouter: adminRouter
}