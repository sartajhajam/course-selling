const mongoose = require('mongoose');

const {Schema } = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

const userSchema = new Schema({
   
    email : String,
    password : String,
    firstName : String,
    lastName : String,
});

const adminSchema = new Schema({
  
    email : String,
    password : String,
    firstName : String,
    lastName : String,
    role : String, // admin or student
});

const courseSchema = new Schema({
    
    title : String,
    description : String,
    price : Number,
    imgURL : String,
    creatorId : ObjectId,
});

const purchaseSchema = new Schema({
   
    courseId : ObjectId,
    userId : ObjectId,
});

// creating  a model 


const userModel = mongoose.model('user', userSchema);
const adminModel = mongoose.model('admin', adminSchema);
const courseModel = mongoose.model('course', courseSchema);
const purchaseModel = mongoose.model('purchase', purchaseSchema);

module.exports = {
    userModel: userModel,
    adminModel: adminModel,
    courseModel: courseModel,
    purchaseModel: purchaseModel
}
