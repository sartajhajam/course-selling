const express = require('express');
const mongoose = require('mongoose');

// Routes
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');
const app = express();


// Middleware to parse JSON bodies
//app.use(express.json());

// Routes
app.use("api/v1/user", userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("api/v1/course", courseRouter);


// Start the server and awit the db connection
async function  main(){
    mongoose.connect(" Your URL HERE FOR DB CONNECTION")
    app.listen(3000);
    console.log("Connected to MongoDB");
}
main();

