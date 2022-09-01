const mongoose = require('mongoose')


const contactmodel = new mongoose.Schema({
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
    problem : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now
    }
    
})



module.exports = mongoose.model('Contact problem',contactmodel)




