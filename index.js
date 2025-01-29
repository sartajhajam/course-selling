const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

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


// Start the server and awit the db connection/ Connect to MongoDB using the MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Use the PORT from .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});

