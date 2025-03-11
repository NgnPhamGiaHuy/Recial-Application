const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    /**
     * Send an email with the provided details.
     * @param {string} to - Recipient's email address.
     * @param {string} subject - Email subject.
     * @param {string} text - Email content.
     */
    async sendEmail(to, subject, text) {
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to,
            subject,
            text,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Email sent to ${to}`);
        } catch (error) {
            console.error(`Error sending email: ${error.message}`);
            throw new Error("Failed to send email");
        }
    }

    /**
     * Send OTP to the given email address with a formatted message.
     * @param {string} email - Recipient's email address.
     * @param {string} otp - OTP code to send.
     */
    async sendOTPEmail(email, otp) {
        const subject = "Verify Your Recial Account";
        const text = `
        Hello,
            
        Welcome to Recial, the social media platform committed to engaging and saving our environment!
            
        To complete your registration and verify your account, please use the following One-Time Password (OTP):
            
        🔒 **${otp}**
            
        This code is valid for **5 minutes**. Please do not share it with anyone to keep your account secure.
            
        If you didn't request this email, no further action is required. For any concerns, please contact us at support@recial.com.
            
        Thank you for joining us in making a difference!
            
        🌱 Team Recial`;
        
        await this.sendEmail(email, subject, text);
    }
}

module.exports = new EmailService();