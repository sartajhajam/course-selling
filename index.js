const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
console.log(process.env.MONGO_URI);

// Routes
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');

 app = express();
app.use(express.json());


// Middleware to parse JSON bodies
//app.use(express.json());

// Routes with connected paths
app.use("api/v1/user", userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("api/v1/course", courseRouter);

// MongoDB Connection with Error Handling
async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
        app.listen(3000, () => console.log("Listening on port 3000"));
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1);
    }
}

main();