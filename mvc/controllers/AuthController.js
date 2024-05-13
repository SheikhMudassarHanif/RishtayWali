const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if (err) {
            res.json({
                error: err
            });
        } else {
            let user = new User({
                email: req.body.email, // Use email instead of name
                password: hashedPass
            });
            user.save()
              .then(user => {
                    res.json({
                        message: 'User Added Successfully'
                    });
                })
              .catch(error => {
                    res.json({
                        message: 'An error Occurred!',
                        error: error.message // Include the error message for debugging
                    });
                });
        }
    });
};

module.exports = {
    register
};
