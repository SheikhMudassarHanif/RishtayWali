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





router.use(session({
    secret: 'lms_nigga',
    resave: false,
    saveUninitialized: true
  }));
  

  
module.exports = router;



