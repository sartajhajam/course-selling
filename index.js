const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
console.log(process.env.MONGO_URI);

// Routes
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');
const app = express();
app.use(express.json());


// Middleware to parse JSON bodies
//app.use(express.json());

// Routes
app.use("api/v1/user", userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("api/v1/course", courseRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000);
    console.log("listening on port 3000")
}

main()