const mongoose = require('mongoose')
const crypto = require('crypto')

const sendregistermailmodel = new mongoose.Schema({
    
    collegeId : String,
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    
    
})

sendregistermailmodel.methods.getResetPassword =function(){
    //create a random 20chars token
    const resetToken = crypto.randomBytes(20).toString("hex");
    //make that token a reset password token
    // this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordToken = resetToken;
    //give that token a expire date
    // this.resetPasswordExpire = Date.now()+ 15 * 60 * 1000;
    this.resetPasswordExpire = Date.now()+ 20 * 60 * 1000;

    return resetToken;
}



module.exports = mongoose.model('Registertoken',sendregistermailmodel)




