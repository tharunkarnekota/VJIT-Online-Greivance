const mongoose = require('mongoose')


const concernmodel = new mongoose.Schema({
    fullname :{
        type : String,
        required : true
    },
    collegeId :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    branch :{
        type : String,
        required : true
    },
    mobile :{
        type : String,
        required : true,
    },
    studentDBId : {
        type : String,
        required : true,
    },
    concern : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now
    },
    concerndepartment : {
        type : String,
        required : true,
    },
    HarassedPersonDetails : String,
    uderprocessing : String,
    verifying : String,
    verified : String,
    report:String,
    pic:String,
    concernpic:String,
    withdraw:String,
    reason:String
    
})



module.exports = mongoose.model('Concerns',concernmodel)




