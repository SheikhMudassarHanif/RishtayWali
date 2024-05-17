



const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const schemas = require('../models/User');

var EnteredEmail = '';
var EnteredPwd = '';

// Function to send email using Nodemailer
function sendEmail(email, verificationLink) {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'f219176@cfd.nu.edu.pk',
                pass: 'Mudassar@194'
            }
        });

        let mailOptions = {
            from:'f219176@cfd.nu.edu.pk',
            to: email,
            subject: 'Email Verification',
            html: `<p>Please click the link below to verify your email:</p><a href="${verificationLink}">Verify Email</a>`
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

// Function to handle form submission
async function handleFormSubmission(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log('handleFormSubmission - email:', email);
        console.log('handleFormSubmission - password:', password);
        const verificationLink = `http://localhost:3000/save-record?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

        await sendEmail(email, verificationLink);
        
        res.status(200).type('html').send('<h1>Email Sent Successfully. Check your email to verify.</h1>');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
}

// Function to save user record
async function saveRecord(req, res) {
    try {
        const email = req.query.email;
        const password = req.query.password;

        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new schemas.UserModel({
            Email: email,
            password: hashedPassword
        });

        await newUser.save();
        // res.status(200).send('User record saved successfully');
        res.render('pages/index');
    } catch (error) {
        console.error('Error saving user record:', error);
        res.status(500).send('Error saving user record');
    }
}



//save save
// async function saveProfile(req, res) {
//     try {
//         console.log('creating profile');
//         console.log(req.body);
//         const profile = new schemas.profileModel(req.body);
//         await profile.save();
//         res.status(201).send(profile);
// } catch (error) {
//         res.status(400).send(error);
// }
// }
async function saveProfile(req, res) {
    try {
        console.log('creating profile');
        console.log(req.body);
        
        // Perform validation checks
        const { profileFor, gender, firstName, lastName, dateOfBirth, religion, community, country, measurements, occupation, educationLevel, exerciseHabits } = req.body;
        
        // if (!profileFor || !gender || !firstName || !lastName || !dateOfBirth || !religion || !community || !country  || !occupation || !educationLevel || !exerciseHabits) {
        //     return res.status(400).send('All fields are required');
        // }

        // Further validation can be added as necessary

        const profile = new schemas.profileModel(req.body);
        await profile.save();
        res.send("profile created");
        // res.status(201).send(profile);
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(400).send(error);
    }
}




const jwt = require('jsonwebtoken');
const secret = 'u_forgot'; // Keep this secret safe
const saltRounds = 10;
// Function to generate reset token
function generateResetToken(email) {
  const payload = {
    email: email,
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // Token expires in 1 hour
  };
  
  const token = jwt.sign(payload, secret);
  return token;
}

// Usage example



async function sendResetEmail(email, token) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // or another email service
      auth: {
        user: 'f219176@cfd.nu.edu.pk',
        pass: 'Mudassar@194'
      }
    });
  
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    const mailOptions = {
      from: 'f219176@cfd.nu.edu.pk',
      to: email,
      subject: 'Password Reset',
      text: `Click on the link to reset your password: ${resetLink}`
    };
    console.log('Going to send email');
    await transporter.sendMail(mailOptions);
  }
  
  // Usage example






 
async function forgetPassword(req, res) {
    const find_email = req.body.email;
    console.log(find_email);
  
    const user = await schemas.UserModel.findOne({ email: find_email });
    if (!user) {
      console.log('Email not registered');
      return res.status(400).send('Email not registered');
    } else {
        console.log("user found");
      const resetToken = generateResetToken(find_email);
      console.log(resetToken);
      await sendResetEmail(find_email, resetToken);
      res.send('Password reset email sent');
    }
  }







































async function handleLogin(req, res) {
    const { email, password } = req.body;
    console.log(email);
    
    // Check if email is provided
    if (!email) {
        return res.status(400).send('Email is required');
    }

    try {
        // Find user by email
        const user = await schemas.UserModel.findOne({ Email: email });
        console.log(user);
        
        // If user with given email is not found
        if (!user) {
            return res.status(401).send('User not found');
        }
        
        // Compare provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // req.session.userId = user._id;
            res.render('pages/profilecreation');
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error during login');
    }
}

module.exports = {
    handleFormSubmission,
    saveRecord,
    handleLogin,
    saveProfile,
    forgetPassword
};
