const transporter = require("../config/mail");

//reusable email sender
module.exports = (to, subject, html) => {
    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
    });
};