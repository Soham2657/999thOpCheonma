const nodemailer=require("nodemailer");

//transporter used by sendEmail.js

const transporter=nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
    tls: {
        rejectUnauthorized: false,
    },
});
module.exports=transporter;