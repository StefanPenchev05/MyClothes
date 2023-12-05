const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = {
    // Function to send a password reset email
    SendPassResetMail: (email, token) => {
        try {
            // Define email options, including sender, recipient, subject, and message body
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Password Reset',
                text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n`
                    + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
                    + `http://localhost:5500/user/reset-password/${token}\n\n`
                    + `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
            };

            // Create a transporter for sending emails using nodemailer
            const transporter = nodemailer.createTransport({
                service: 'gmail',             // Email service provider
                auth: {
                    user: process.env.EMAIL,  // Sender's email address
                    pass: process.env.PASSWORD // Sender's email password
                }
            });

            // Send the email using the configured transporter
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    throw new CustomError("The email has not been sent!", "MailError");
                }

                return info.response;
            });
        } catch (err) {
            throw err;
        }
    }
}
