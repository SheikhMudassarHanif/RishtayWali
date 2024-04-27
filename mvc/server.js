var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

// use res.render to load up an ejs view file
app.set('views', path.join(__dirname, 'views'));

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

// // about page
// app.get('/about', function(req, res) {
//   res.render('pages/about');
// });

app.listen(8080);
console.log('Server is listening on port 8080');

const express = require('express');
const sendEmail = require('./send_email');

const app = express();
app.use(express.json());

app.post('/submit-form', (req, res) => {
    const formData = req.body;
    sendEmail(formData);
    res.send('Form submitted successfully!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
