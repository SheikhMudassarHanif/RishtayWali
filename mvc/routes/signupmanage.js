// Import necessary modules
const nodemailer = require('nodemailer');

// Function to handle form submission
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







// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'f219176@cfd.nu.edu.pk',
//       pass: 'Mudassar@194'
//     }
//   });
  
//   var mailOptions = {
//     from: 'f219176@cfd.nu.edu.pk',
//     to: email,
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
//   };
  
//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });

























// Function to send email using Nodemailer
function sendEmail(email) {
    return new Promise((resolve, reject) => {
        // Create Nodemailer transporter
        let transporter = nodemailer.createTransport({
            // Configure your email provider here
            service: 'gmail',
            auth: {
            user: 'f219176@cfd.nu.edu.pk',
            pass: 'Mudassar@194'
    }
        });

        // Email options
        let mailOptions = {
            from: 'f219176@cfd.nu.edu.pk',
            to: email,
            subject: 'Testing',
            text: 'Body of your email'
        };

        // Send email
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
