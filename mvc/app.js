var express =require("express");
const indexRouter = require('./routes/index');

var app=express();
app.set( "view engine" , "ejs");
app.set("views", __dirname + "/views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/",indexRouter);
app.listen(3000,()=>{console.log('Server is running on port 3000')});
//for css
app.use(express.static('./views'));



