const { Router } = require('express');
const userRouter = Router();
const { userModel } = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { JWT_USER_PASSWORD } = require('../config');
const { userMiddleware } = require('../middleware/user');
const { z } = require('zod');

// Zod schema for validation
const userSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    firstName: z.string().min(2, "First name must be at least 2 characters long"),
    lastName: z.string().min(2, "Last name must be at least 2 characters long")
});

// Signup route
userRouter.post("/signup", async function (req, res) {
    try {
        const { email, password, firstName, lastName } = userSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });
        res.json({
            message: "Signup Succeeded"
        });
    } catch (error) {
        res.status(400).json({ message: error.errors ? error.errors[0].message : "An error occurred" });
    }
});

// Login route
userRouter.post("/signin", async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user._id }, JWT_USER_PASSWORD);
            res.json({
                message: "Signin Succeeded",
                token: token
            });
        } else {
            res.status(403).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Course purchase route
userRouter.get("/purchases", userMiddleware, async function (req, res) {
    try {
        const userId = req.userId;
        const purchases = await purchaseModel.find({ userId: userId });
        const coursesData = await courseModel.find({
            _id: { $in: purchases.map(x => x.courseId) }
        });
        res.json({ purchases, coursesData });
    } catch (error) {
        res.status(500).json({ message: "Error fetching purchases" });
    }
});

// Export the router directly
module.exports = {
    userRouter: userRouter
};
