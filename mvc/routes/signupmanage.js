// Import necessary modules
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const crypto = require('crypto');

console.log(User); 
// Function to send email with Nodemailer
async function handleFormSubmission(req, res) {
    try {
        
        const email = req.body.email;
        console.log(email);
        await sendEmail(email);
        res.send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', req.body.email);
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
}


// async function handleFormSubmission(req, res) {
//     try {
//         const { email, password } = req.body;

//         // Check if password is provided
//         if (!password) {
//             return res.status(400).send('Password is required');
//         }

//         // Hash the password before storing it
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Insert the user into the database
//         const user = new User({ email, password: hashedPassword });
//         await user.save();

//         res.send('User registered successfully!');
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).send('Error registering user');
//     }
// }


// async function handleFormSubmission(req, res) {
//     try {
//         const { email, password } = req.body;

//         // Check if password is provided
//         if (!password) {
//             return res.status(400).send('Password is required');
//         }

//         // Hash the password before storing it
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Insert the user into the database
//         const user = new User({ email, password: hashedPassword });
//         await user.save();

//         res.send('User registered successfully!');
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).send('Error registering user');
//     }
// }




// Function to send email using Nodemailer
function sendEmail(email, token) {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'f219176@cfd.nu.edu.pk',
                pass: 'Mudassar@194'
            }
        });

        let mailOptions = {
            from: 'f219176@cfd.nu.edu.pk',
            to: email,
            subject: 'Email Verification',
            html: `<p>Please click the link below to verify your email:</p><a href="http://localhost:3000/verify?token=${token}">Verify Email</a>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                reject(error);
            } else {
                console.log('Email sent:', info.response);
                resolve();
            }
        });
    });
}

// Export the function to be used in other files
module.exports = {
    handleFormSubmission
};
