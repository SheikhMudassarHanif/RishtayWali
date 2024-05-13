const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sendEmail = require('./routes/send_email');
const { signup, login } = require('./routes/authentication'); // Adjust the path based on your project structure
const mongoose = require('mongoose');

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


app.use('/api', require('./routes/auth'));

    


try {
    await mongoose.connect('mongodb://localhost:localhost:27017/Rishtaywali', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
  
  app.post('/submitsignup-form', async (req, res) => {
    try {
      const userData = new mongoose.model('User')(req.body); // Corrected line
      const savedUser = await userData.save();
      res.json(savedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});