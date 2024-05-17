const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sendEmail = require('./routes/send_email');
const { signup, login } = require('./routes/authentication'); // Adjust the path based on your project structure
// const mongoose = require('mongoose');

const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Define the views directory
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse request bodies as JSON
app.use(bodyParser.json());

// Define the route for the home page
app.get('/', function(req, res) {
    res.render('pages/index');
});

// Define the route for submitting the form
app.post('/submit-form', (req, res) => {
    const formData = req.body;
    sendEmail(formData);
    res.send('Form submitted successfully!');
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// Use the imported routes
app.post('/signup', signup);
app.post('/login', login);


    

