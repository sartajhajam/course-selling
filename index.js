const express = require('express');
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');

const app = express();
const mongoose = require('mongoose');

// Middleware to parse JSON bodies
//app.use(express.json());

// Routes
app.use("/user", userRouter);
app.use("/course", courseRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});