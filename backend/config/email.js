// mailer.js
const nodemailer = require("nodemailer");

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service (e.g., 'gmail', 'yahoo')
    auth: {
        user: "varunrmantri23@gmail.com",
        pass: "advd bjka fxbv yznz", // 16-digit app password
    },
});

// Function to send an email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: "varunrmantri23@gmail.com",
        to,
        subject,
        text,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
