const express = require('express');
const app = express();
const mongoose = require('mongoose');

// add route skelton to express for signup
app.post("/user/signup", (req, res) => {
  res.json({
     message: "signup endpoint" 
    })
});
// add route skelton to express for login
app.post("/user/login", (req, res) => {
  res.json({
    message: "login endpoint"
  })
});

// add route skelton to express for course purchase
app.get("/user/purchases", (req, res) => {
  res.json({
    message: "course purchase endpoint"
  })
});

// add route skelton to express for course buying
app.post("/course/purchase", (req, res) => {
  res.json({
    message: "course buying endpoint"
  })
});


// add route skelton to express for course listing
app.get("/courses", (req, res) => {
  res.json({
    message: "course listing endpoint"
  })
}); 






app.listen(3000);