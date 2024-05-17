
require('dotenv').config();
const express = require("express");
const indexRouter = require('./routes/index');
const bodyParser = require('body-parser');
// const formController = require('./routes/signupmanage');
const session = require('express-session');
 // Adjust the path as necessary

const mongoose = require('mongoose');

const app = express();

// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));

// Use index router
app.use("/", indexRouter);
app.use('/api', indexRouter);
// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://127.0.0.1:27017/RishtayWali', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connection established');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});


// app.use(session({
//   secret: 'lms_nigga',
//   resave: false,
//   saveUninitialized: true
// }));



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
