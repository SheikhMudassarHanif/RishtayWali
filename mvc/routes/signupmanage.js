



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
        // res.send("profile created");
        // res.status(201).send(profile);
        res.status(200).render('partials/afterCreation');
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






//   async function DisplayAllProfiles(req, res) {
//     try {
//         // Use await to get the distinct profiles
//         const profiles = await schemas.profileModel.find().distinct('profile');
        
//         // Render the profiles in your EJS file
//         console.log(profiles);
//         res.render('pages/profiless', { profiles: profiles });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('An error occurred');
//     }
// }



async function DisplayAllProfiles(req, res) {
    try {
        console.log('Starting to fetch profiles');
        
        // Ensure the model is correct
        if (!schemas || !schemas.profileModel) {
            throw new Error('Profile model is not defined');
        }

        console.log('Model:', schemas.profileModel);

        // Use await to get the profiles
        const profiles = await schemas.profileModel.find();
        
        // Log the retrieved profiles
        console.log('Retrieved profiles:', profiles);

        if (!profiles || profiles.length === 0) {
            console.log('No profiles found');
            res.render('pages/profiless', { profiles: [] });
            return;
        }
        
        // Render the profiles in your EJS file
        res.render('pages/profiless', { profiles: profiles });
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).send('An error occurred');
    }
}



async function TrueLove(req,res) {
    try {
        // Ensure the model is correct
        if (!schemas || !schemas.profileModel) {
            throw new Error('Profile model is not defined');
        }

        // Get the current user's profile details or provide them manually
        const currentUserProfile = await schemas.profileModel.findOne({ /* Your query to find the current user's profile */ });

        if (!currentUserProfile) {
            throw new Error('Current user profile not found');
        }

        // Query for profiles with the same country, same religion, and opposite gender
        const Profiles = await schemas.profileModel.find({
            country: currentUserProfile.country,
            religion: currentUserProfile.religion,
            gender: { $ne: currentUserProfile.gender } // Opposite gender
        });

        // Return the matched profiles
        res.render('pages/secondlanding', { profiles: Profiles });
    } catch (err) {
        console.error('Error occurred:', err);
        throw err; // Rethrow the error for handling at a higher level
    }
}
















// In your route definition, you should now call the async function
// app.get('/find-soulmate',);




















async function CreateProfile(req,res){
    try {
res.status(200).render('pages/profilecreation');
    }
    catch (err) {
        console.log('error ');
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
            
            // res.render('pages/profilecreation');
            res.render('pages/BrowseProfile');
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
    forgetPassword,
    DisplayAllProfiles,
    CreateProfile,
    TrueLove
};
