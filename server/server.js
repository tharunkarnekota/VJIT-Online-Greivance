const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware')
const cors = require('cors');
const usermodel = require('./usermodel')
const adminmodel = require('./adminmodel')
const Registertoken = require('./Sendregistermailmodel')

const concernmodel = require('./concernmodel')
const contactmodel = require('./contactmodel')

const dotenv = require('dotenv');

const sendEmail = require('./sendmail')
const crypto = require('crypto')

const app = express();
dotenv.config()
const PORT = process.env.PORT || 5000
mongoose.connect(process.env.CONNECTION_URL).then(
    ()=> console.log('Db connected..')
) 

app.use(express.json());
app.use(cors({origin:"*"}));



app.get('/',(req,res)=>{
    res.send('Hello to Online Greavience API 14 07 2022 10:52');
})


app.post('/register',async (req,res) =>{
    try{
        const { fullname,collegeId,branch,email,mobile,password,confirmpassword } = req.body;
        const exist = await usermodel.findOne({email});
        if(exist){
            return res.status(200).send('user already registered')
        }
        const existId = await usermodel.findOne({collegeId});
        if(existId){
            return res.status(200).send('this collegeID already registered')
        }
        if(password !== confirmpassword){
            return res.status(400).send('password invalid')
        }

        let newUser = new usermodel({
            fullname,collegeId,branch,email,mobile,password,confirmpassword
        })
        newUser.save();
        return res.status(200).send('User Registered Successfully')
    }
    catch(err){
        console.log(err)
        return res.status(500).send('register Server Error')
    }
})

app.post('/adminregister',async (req,res) =>{
    try{
        const { inchargename,concerndepartment,pic,branch,email,mobile,password,confirmpassword } = req.body;
        const exist = await adminmodel.findOne({email});
        if(exist){
            return res.status(200).send('Admin already registered')
        }
        if(password !== confirmpassword){
            return res.status(400).send('password invalid')
        }
        let newUser = new adminmodel({
            inchargename,concerndepartment,pic,branch,email,mobile,password,confirmpassword
        })
        newUser.save();
        return res.status(200).send('Admin Registered Successfully')
    }
    catch(err){
        console.log(err)
        return res.status(500).send('Adminregister Server Error')
    }
})


app.post('/login',async (req,res)=>{
    try{
        const {email,password} = req.body;
        const exist = await usermodel.findOne({email})
        if(!exist){
            return res.status(200).send('User not Exist plz register')
        }
        if(exist.password !== password){
            return res.status(200).send('password invalid')
        }
        let payload = {
            user : {
                id : exist.id
            }
        }
        jwt.sign(payload,'jwtPassword',{expiresIn:360000000},
        (err,token)=>{
            if(err) throw err
            return res.json({token})
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).send('login Server Error')
    }
})

app.post('/adminlogin',async (req,res)=>{
    try{
        const {email,password} = req.body;
        const exist = await adminmodel.findOne({email})
        if(!exist){
            return res.status(200).send('Admin not Exist')
        }
        if(exist.password !== password){
            return res.status(200).send('password invalid')
        }
        let payload = {
            user : {
                id : exist.id
            }
        }
        jwt.sign(payload,'jwtPassword',{expiresIn:360000000},
        (err,token)=>{
            if(err) throw err
            return res.json({token})
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).send('adminlogin Server Error')
    }
})


app.get('/myprofile',middleware,async(req,res)=>{
    try{
        const exist = await usermodel.findById(req.user.id)
        return res.status(200).json(exist);

    }
    catch(err){
        console.log(err);
        return res.status(500).send('myprofile Server Error')
    }
})

app.get('/adminprofile',middleware,async(req,res)=>{
    try{
        const exist = await adminmodel.findById(req.user.id)
        return res.status(200).json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('adminprofile Server Error')
    }
})

app.get('/alladmins',middleware,async(req,res)=>{
    try{
        const exist = await adminmodel.find()
        return res.status(200).json(exist);

    }
    catch(err){
        console.log(err);
        return res.status(500).send('Alladmins Server Error')
    }
})

app.get('/allconcerns/:id',middleware,async(req,res)=>{
    try{
        const total = await concernmodel.find()
        let filtered = await total.filter(profile => profile.concerndepartment === req.params.id)
        return res.status(200).json(filtered);

    }
    catch(err){
        console.log(err);
        return res.status(500).send('Allconcerns Server Error')
    }
})

app.post('/addconcern',middleware,async(req,res)=>{
    try{
        const {fullname,concern,Hperson,concerndepartment} = req.body;

        const exist = await usermodel.findById(req.user.id)
        const newConcern = new concernmodel({
            fullname : exist.fullname,
            collegeId : exist.collegeId,
            branch : exist.branch,
            email : exist.email,
            mobile : exist.mobile,
            concern,
            HarassedPersonDetails:Hperson, 
            studentDBId : exist._id,
            concerndepartment
        })
        newConcern.save();

        return res.status(200).send('your concern send successfully')
    }
    catch(err){ 
        console.log(err);
        return res.status(500).send('addsupportteam Server Error ')
    }
})

app.post('/addconcern2',middleware,async(req,res)=>{
    try{
        const {fullname,concern,Hperson,concerndepartment,concernpic} = req.body;

        const exist = await usermodel.findById(req.user.id)
        const newConcern = new concernmodel({
            fullname : exist.fullname,
            collegeId : exist.collegeId,
            branch : exist.branch,
            email : exist.email,
            mobile : exist.mobile,
            concern,
            HarassedPersonDetails:Hperson, 
            studentDBId : exist._id,
            concerndepartment,
            concernpic
        })
        newConcern.save();

        return res.status(200).send('your concern send successfully')
    }
    catch(err){ 
        console.log(err);
        return res.status(500).send('addsupportteam Server Error ')
    }
})


app.post('/addcontact',middleware,async(req,res)=>{
    try{
        const {fullname,problem} = req.body;

        const exist = await usermodel.findById(req.user.id)
        const newContact = new contactmodel({
            fullname : exist.fullname,
            collegeId : exist.collegeId,
            branch : exist.branch,
            email : exist.email,
            mobile : exist.mobile,
            studentDBId : exist._id,
            problem
        })

        newContact.save();
        return res.status(200).send('your problem send successfully')
    }
    catch(err){ 
        console.log(err);
        return res.status(500).send('addcontact Server Error ')
    }
})

app.get('/getconcern',middleware, async (req,res)=>{
    try{
        let total = await concernmodel.find();
        let filtered = await total.filter(profile => profile.studentDBId === req.user.id)
        return res.json(filtered);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('getconcern Server Error')
    }
})

app.get('/getcontact',middleware, async (req,res)=>{
    try{
        let total = await contactmodel.find();
        return res.json(total);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('getcontact Server Error')
    }
})

app.get('/getspecificconcern/:id',middleware, async (req,res)=>{
    try{
        let specific = await concernmodel.findById(req.params.id);
        return res.json(specific);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('getspecificconcern Server Error')
    }
})

app.get('/updateverifying/:id',middleware, async (req,res)=>{
    try{
        await concernmodel.findByIdAndUpdate(req.params.id,{
            
            verifying : "1"
            
        })
        let specific = await concernmodel.findById(req.params.id);
        return res.status(200).json({message:"successfully updated",update:specific});
    }
    catch(err){
        console.log(err);
        return res.status(500).send('updateverifying Server Error')
    }
})

app.put('/updateverified/:id',middleware, async (req,res)=>{
    try{
        const {report,pic} = req.body
        await concernmodel.findByIdAndUpdate(req.params.id,{
            
            verified : "1",
            report : report,
            pic : pic
            
        })
        let specific = await concernmodel.findById(req.params.id);
        return res.status(200).json({message:"successfully updated",update:specific});
    }
    catch(err){
        console.log(err);
        return res.status(500).send('updateverifying Server Error')
    }  
})



app.put('/withdraw/:id',middleware, async (req,res)=>{
    try{
        const {reason} = req.body
        await concernmodel.findByIdAndUpdate(req.params.id,{
            
            withdraw : "1",
            reason : reason,
            verifying : ""
            
        })
        let specific = await concernmodel.findById(req.params.id);
        return res.status(200).json({message:"successfully withdraw your complain",specific:specific});

    }
    catch(err){
        console.log(err);
        return res.status(500).send('updateverifying Server Error')
    }  
})


app.get('/testing/:id',async (req,res)=>{
    try{
        let specific = await concernmodel.findById(req.params.id);
        return res.status(200).json({message:"successfully withdraw your complain",specific:specific});
        // return res.status(200).json({message:"successfully withdraw your complain"})

    }
    catch(err){
        console.log(err);
        return res.status(500).send('testing error')
    }
})




app.put('/updateverified2/:id',middleware, async (req,res)=>{
    try{
        const {report} = req.body
        await concernmodel.findByIdAndUpdate(req.params.id,{
            
            verified : "1",
            report : report 
            
        })
        let specific = await concernmodel.findById(req.params.id);
        return res.status(200).json({message:"successfully updated",update:specific});
    }
    catch(err){
        console.log(err);
        return res.status(500).send('updateverifying Server Error')
    }
})



app.post('/forgetpassword',async(req,res,next)=>{
    //checking if atleast the users exists or not
    var tuser= await usermodel.findOne({email:req.body.email});
    if(!tuser){
        tuser = await adminmodel.findOne({email:req.body.email});
    }

    if(!tuser){
        return res.status(200).send('user not found')
    }

    // get resetpassword token
    const resetToken= tuser.getResetPassword();
    // console.log(resetToken);
    await tuser.save({validateBeforeSave: false});

    //actual link is http://localhost/api/v1/passwordreset/${resetToken} as local host and http requests
    //can change we use req._
    const resetpasswordURL=`${resetToken}`;
    const resetpasswordMessage = `your's Online Gravience reset password verification code is \n\n double click on it (or) long press on it for getting the option of copy \n\n ${resetpasswordURL} \n\n if u have not
    requested this email, please ignore`;

    try{
        await sendEmail({
            //we will send a object with 3 key value pairs here
            email:tuser.email,
            subject:"Online Gravience password Recovery",
            resetpasswordMessage,
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${tuser.email} successfully`,
        })
    }
    catch(err){
        tuser.resetPasswordToken= undefined;
        tuser.resetPasswordExpire= undefined;
        await tuser.save({validateBeforeSave: false});

        return  res.status(200).send(err);
    }
}
)





// function first(){
//     //create a random 20chars token
//     const resetToken = crypto.randomBytes(20).toString("hex");
//     //make that token a reset password token
//     this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
//     //give that token a expire date
//     this.resetPasswordExpire = Date.now()+ 15 * 60 * 1000;

//     const thar

//     return resetToken;
// }

app.post('/createtoken',async(req,res,next)=>{
    try{
        const {collegeId} = req.body;
        
        const newContact = new Registertoken({
            collegeId
        })

        // newContact.save();
            // get resetpassword token
        const resetToken= newContact.getResetPassword();
        // console.log(resetToken);
        await newContact.save({validateBeforeSave: false});
        return res.status(200).send('created token successfully')
    }
    catch(err){ 
        console.log(err);
        return res.status(500).send('addcontact Server Error ')
    }

})

app.post('/sendregistermail',async(req,res,next)=>{
    //checking if atleast the users exists or not
    const {email,collegeId} = req.body;
    var tuser= await Registertoken.findOne({collegeId});
   

    
    // get resetpassword token
    var resetToken= tuser.resetPasswordToken;
    
    // // console.log(resetToken);
    // await tuser.save({validateBeforeSave: false});

    //actual link is http://localhost/api/v1/passwordreset/${resetToken} as local host and http requests
    //can change we use req._
    const resetpasswordURL=`${resetToken}`;
    const resetpasswordMessage = `your's Online Gravience Email verification code is \n\n ${resetpasswordURL} \n\n if u have not
    requested this email, please ignore`;

    try{
        await sendEmail({
            //we will send a object with 3 key value pairs here
            email:email,
            subject:"Online Gravience password Recovery",
            resetpasswordMessage,
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${email} successfully`,
        })
    }
    catch(err){
        tuser.resetPasswordToken= undefined;
        tuser.resetPasswordExpire= undefined;
        await tuser.save({validateBeforeSave: false});

        return  res.status(200).send(err.message);
    }
}
)



//reset password using forgot password
app.post('/verifyregistermail/:token',async(req,res,next)=>{
    // const resetPasswordToken= crypto.createHash("sha256").update(req.params.token).digest("hex");

    const resetPasswordToken = req.params.token;
    var tuser = await Registertoken.findOne({
        resetPasswordToken,
        resetPasswordExpire:{ $gt:Date.now()},
    })
    

    if(!tuser){
        return res.status(200).send('password reset token is invalid  or expired'+resetPasswordToken) 
       
    }

    

    tuser.resetPasswordToken= undefined;
    tuser.resetPasswordExpire= undefined;

    await tuser.save();


    return  res.status(200).send("verified");

})


app.delete('/deletetoken/:id',async(req,res,next)=>{
    try{
        
        const tuser = await Registertoken.findOneAndDelete({collegeId:req.params.id}) 
        
        
        
        var allusers = await Registertoken.find({
            resetPasswordExpire:{ $lt:Date.now()},
        })

        for(i=0;i<allusers.length;i++){
            await Registertoken.findByIdAndDelete(allusers[i]._id)
        }
          
        
        return res.status(200).send('deleted successfully')
    }
    catch(err){
        console.log(err)
    }

})



app.post('/sendmailadmin',middleware,async(req,res,next)=>{
    //checking if atleast the users exists or not
    const {concern,Hperson,email} = req.body;
    const tuser= await adminmodel.findOne({email});
    if(!tuser){
        return res.status(200).send('admin not found')
    }
    const exist = await usermodel.findById(req.user.id)

    const studentId = exist.collegeId;
    const studentName = exist.fullname;
    const newlink = "www.onlinegraviencevjit.com"

    // get resetpassword token
    // const resetToken= tuser.getResetPassword();
    // console.log(resetToken);
    // await tuser.save({validateBeforeSave: false});

    //actual link is http://localhost/api/v1/passwordreset/${resetToken} as local host and http requests
    //can change we use req._
    
    const resetpasswordMessage = `THE COMPLAIN GIVEN IS \n \n ${studentName} \n${studentId} \n Reporting on ${Hperson} \n${concern} \n\n to open website go to link ${newlink}`;

    try{
        await sendEmail({
            //we will send a object with 3 key value pairs here
            email:tuser.email,
            subject:"Students concerns",
            resetpasswordMessage,
        }); 
        res.status(200).json({
            success:true,
            message:`Email sent to ${tuser.email} successfully`,
        })
    }
    catch(err){

        return  res.status(200).send(err.message);
    }
}
)



//reset password using forgot password
app.post('/resetpassword/:token',async(req,res,next)=>{
    const resetPasswordToken= crypto.createHash("sha256").update(req.params.token).digest("hex");

    var tuser = await usermodel.findOne({
        resetPasswordToken,
        resetPasswordExpire:{ $gt:Date.now()},
    })
    if(!tuser){
        tuser = await adminmodel.findOne({
            resetPasswordToken,
            resetPasswordExpire:{ $gt:Date.now()}
        })
    }

    if(!tuser){
        return res.status(200).send('password reset token is invalid or expired')
       
    }

    if(req.body.password !== req.body.confirmpassword){
        return res.status(200).send('password did not match')
    }

    tuser.password = req.body.password;
    tuser.confirmpassword = req.body.password; 
    tuser.resetPasswordToken= undefined;
    tuser.resetPasswordExpire= undefined;

    await tuser.save();

    return  res.status(200).send("password changed successfully");

})


   


app.listen(PORT,()=> console.log('Server is Running..')) 