const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'f219176@cfd.nu.edu.pk',
    pass: 'Mudassar@194'
    }
});

// Function to send email
const sendEmail = (data) => {
    const { fullName, email, phone, message } = data;

    // Email message configuration
    const mailOptions = {
        from: email,
        to: 'f219176@cfd.nu.edu.pk',
        subject: 'New Contact Form Submission',
        html: `
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message}</p>
        `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = sendEmail;
