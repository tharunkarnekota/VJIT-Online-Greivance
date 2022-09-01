const mongoose = require('mongoose')
const crypto = require('crypto')

const adminmodel = new mongoose.Schema({
    inchargename :{
        type : String,
        required : true
    },
    concerndepartment : {
        type : String,
        required : true,
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
    pic :{
        type : String,
        required : true,
    },
    password :{
        type : String,
        required : true,
    },
    confirmpassword :{
        type : String,
        required : true,
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    
    
})

adminmodel.methods.getResetPassword =function(){
    //create a random 20chars token
    const resetToken = crypto.randomBytes(20).toString("hex");
    //make that token a reset password token
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    //give that token a expire date
    this.resetPasswordExpire = Date.now()+ 15 * 60 * 1000;

    return resetToken;
}



module.exports = mongoose.model('Admins',adminmodel)




