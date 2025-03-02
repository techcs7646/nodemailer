const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,  // Use Ethereal SMTP host
    port: process.env.EMAIL_PORT,  // SMTP port (587 for TLS)
    secure: false,                 // Set to false since Ethereal uses STARTTLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendEmail(to, subject, text) {
    const mailOptions = {
        from: `"Test Sender" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text
    };

    return transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };
