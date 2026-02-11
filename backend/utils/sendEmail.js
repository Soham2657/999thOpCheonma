const resend = require("../config/mail");

//reusable email sender
module.exports = (to, subject, html) => {
    return resend.emails.send({
        from: process.env.RESEND_FROM || "999thOpcheonma <onboarding@resend.dev>",
        to,
        subject,
        html,
    });
};