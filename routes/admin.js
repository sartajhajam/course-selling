const { Router } = require('express');

const adminRouter = Router();

const { adminModel } = require('../db');

const jwt = require('jsonwebtoken');
JWT_ADMIN_PASSWORD = "admin";

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


adminRouter.post("/course", function (req, res) {
    res.json({
        message: "course purchase endpoint"
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