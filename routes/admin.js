const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const { adminModel, courseModel } = require('../db');
const { JWT_ADMIN_PASSWORD } = require('../config');
const { adminMiddleware } = require('../middleware/admin');

const adminRouter = Router();

// Zod schema for validation
const adminSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    firstName: z.string().min(2, "First name must be at least 2 characters long"),
    lastName: z.string().min(2, "Last name must be at least 2 characters long")
});

// Signup route
adminRouter.post("/signup", async function (req, res) {
    try {
        const { email, password, firstName, lastName } = adminSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await adminModel.create({
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

// Signin route
adminRouter.post("/signin", async function (req, res) {
    try {
        const { email, password } = req.body;
        const admin = await adminModel.findOne({ email });

        if (admin && await bcrypt.compare(password, admin.password)) {
            const token = jwt.sign({ adminId: admin._id }, JWT_ADMIN_PASSWORD);
            res.json({ message: "Signin Succeeded", token: token });
        } else {
            res.status(403).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Create course route
adminRouter.post("/course", adminMiddleware, async function (req, res) {
    try {
        const { title, description, imageUrl, price } = req.body;
        const adminId = req.userId;
        
        const course = await courseModel.create({
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price,
            creatorId: adminId
        });

        res.json({ message: "Course created", courseId: course._id });
    } catch (error) {
        res.status(500).json({ message: "Error creating course" });
    }
});

// Update course route
adminRouter.put("/course", adminMiddleware, async function (req, res) {
    try {
        const adminId = req.userId;
        const { courseId, title, description, imageUrl, price } = req.body;
        
        const course = await courseModel.findOneAndUpdate(
            { _id: courseId, creatorId: adminId },
            { title, description, imageUrl, price },
            { new: true }
        );
        
        if (!course) {
            return res.status(404).json({ message: "Course not found or unauthorized" });
        }

        res.json({ message: "Course updated", courseId: course._id });
    } catch (error) {
        res.status(500).json({ message: "Error updating course" });
    }
});

// Fetch all courses created by admin
adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
    try {
        const adminId = req.userId;
        const courses = await courseModel.find({ creatorId: adminId });
        res.json({ message: "Courses fetched", courses });
    } catch (error) {
        res.status(500).json({ message: "Error fetching courses" });
    }
});

module.exports = { adminRouter };
