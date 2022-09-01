const nodemailer= require("nodemailer");

const sendEmail= async (data)=>{

    //mailData
    const mailData = {
        from: "grievancecell@vjit.ac.in",
        to: data.email,
        subject:data.subject,
        text:data.resetpasswordMessage,
    };
    //transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: process.env.PORT || 5000,
        secure: false,
        auth: {
            user: "grievancecell@vjit.ac.in",
            pass: "fwyaxpnxagrccyld",
            // pass: "projectMERN@161234",

        },
    });
    
    //transporter.sendemail(mailData)
    await transporter.sendMail(mailData);
}
// wvszimqzfvtyizmy 
module.exports = sendEmail;