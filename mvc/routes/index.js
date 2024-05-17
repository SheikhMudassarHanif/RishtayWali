var express = require('express');
var router = express.Router();
const formController = require('./signupmanage');
const session = require('express-session');

router.get("/", function(req, res) {
    res.render('pages/index');
});


router.get("/home", function(req, res) {
    res.render('pages/index');
});

router.post('/submitsignup-form', formController.handleFormSubmission);
router.get('/save-record', formController.saveRecord);
router.post('/submittedloginform', formController.handleLogin);
router.post('/submitprofile',formController.saveProfile);
router.post('/forgot-password',formController.forgetPassword);


router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
  
    if (!token || !newPassword) {
      return res.status(400).send('Token and new password are required');
    }
  
    try {
      const decoded = jwt.verify(token, secret);
      const email = decoded.email;
  
      // Proceed to reset the password
      await resetUserPassword(email, newPassword);
      res.send('Password has been reset');
    } catch (err) {
      res.status(400).send('Invalid or expired token');
    }
  });
  
  // Function to reset user's password (example implementation)
  async function resetUserPassword(email, newPassword) {
    const user = await schemas.userModel.findOne({ email: email });
    if (!user) {
      throw new Error('User not found');
    }
  
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    await user.save();
  }





router.use(session({
    secret: 'lms_nigga',
    resave: false,
    saveUninitialized: true
  }));
  

  
module.exports = router;



