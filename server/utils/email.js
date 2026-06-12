const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify email configuration
transporter.verify((error, success) => {
    if (error) {
        console.log("Email configuration error:", error);
    } else {
        console.log("Email server is ready");
    }
});

// Function to send booking confirmation email
const sendBookingEmail = async (userEmail, userName, eventTitle) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: `Booking Confirmed: ${eventTitle}`,
            html: `
        <h2>Hi ${userName}!</h2>
        <p>Your booking for the event <strong>${eventTitle}</strong> is successfully confirmed.</p>
        <p>Thank you for choosing Eventa.</p>
      `
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to', userEmail);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const sendOTPEmail = async (userEmail, otp, type) => {
    try {
        console.log(`Sending OTP to: ${userEmail}`);
        console.log(`Generated OTP: ${otp}`);

        const title = type === 'account_verification'
            ? 'Verify your Eventa Account'
            : 'Eventa Booking Verification';

        const msg = type === 'account_verification'
            ? 'Please use the following OTP to verify your new Eventa account.'
            : 'Please use the following OTP to verify and confirm your event booking.';

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: title,
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                    <h2 style="color: #111;">${title}</h2>

                    <p style="color: #555; font-size: 16px;">
                        ${msg}
                    </p>

                    <div style="
                        margin: 20px auto;
                        padding: 15px;
                        font-size: 24px;
                        font-weight: bold;
                        background: #f4f4f4;
                        width: max-content;
                        letter-spacing: 5px;
                        border-radius: 8px;
                    ">
                        ${otp}
                    </div>

                    <p style="color: #999; font-size: 12px;">
                        This code expires in 5 minutes.
                        If you didn't request this, please ignore this email.
                    </p>

                    <hr style="margin:20px 0">

                    <p style="font-size: 12px; color: #666;">
                        © Eventa - Smart Event Booking Platform
                    </p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("OTP email sent successfully");
        console.log(info.response);

    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw error;
    }
};

module.exports = { sendBookingEmail, sendOTPEmail };