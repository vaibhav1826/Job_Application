// importing path module 
const path =require('path');

//express is a web application framework for node.js
const express = require('express');

// importing mongoose for connection with database
const mongoose = require('mongoose');

// importing cookie-parser module for access
const cookieparser = require('cookie-parser');

// importing middleware
const { checkforauthenticationcookie } = require('./middleware/authentication.js'); 

const app = express();
const Port = 1800;

// for redirecting into the user.js
const userRoute = require('./routes/user.js');

// connecting database -- mongodb
mongoose
.connect("mongodb://localhost:27017/job_portal")
.then((e)=>console.log(`mongodb connected`));

// setting the view engine as ejs 
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

// importing middleware 
app.use(express.urlencoded({ extended :false }));
app.use(cookieparser());
app.use(checkforauthenticationcookie("token"));
app.use(express.static(path.resolve("./public")));

// redirecting it to home page 
app.get('/',async(req,res)=>{
    res.render("home", {
      user: req.user,
    });
});

app.use('/user',userRoute);

//server starting at localhost:1800
app.listen(Port,()=>{
    console.log(`server at localhost:${Port}`);
})