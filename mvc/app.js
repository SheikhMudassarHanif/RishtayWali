var express =require("express");
const indexRouter = require('./routes/index');
const bodyParser = require('body-parser');
const formController = require('./routes/signupmanage');

var app=express();
app.set( "view engine" , "ejs");
app.set("views", __dirname + "/views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/",indexRouter);
app.listen(3000,()=>{console.log('Server is running on port 3000')});
//for css and js files
app.use(express.static('./views'));



// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// POST route to handle form submission
app.post('/submitsignup-form', formController.handleFormSubmission);



