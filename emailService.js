const nodemailer = require("nodemailer");
require("dotenv").config();

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Load from .env file
        pass: process.env.EMAIL_PASS
    }
});

// Function to send email
const sendTaskNotification = async (userEmail, userName, taskTitle, taskDeadline, taskDescription) => {
    const mailOptions = {
        from: `"Project Management Tool" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: `New Task Assigned: ${taskTitle}`,
        html: `
            <h3>Hello ${userName},</h3>
            <p>You have been assigned a new task in the Project Management Tool.</p>
            <p><strong>Task Title:</strong> ${taskTitle}</p>
            <p><strong>Deadline:</strong> ${taskDeadline}</p>
            <p><strong>Description:</strong> ${taskDescription}</p>
            <p>Best Regards,<br>Project Management Team</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📩 Email sent to ${userEmail}`);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};

module.exports = sendTaskNotification;
