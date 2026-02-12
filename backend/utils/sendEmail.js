const sgMail = require("../config/mail");

//reusable email sender
module.exports = (to, subject, html) => {
    return sgMail.send({
        from: process.env.SENDGRID_FROM || "noreply@manhwasensei.com",
        to,
        subject,
        html,
    });
};