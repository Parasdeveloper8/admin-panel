const express = require("express");

const app = express();

const helmet = require("helmet");

const logout = require('./Routes/logout');

const transporter = require("./configuration/transporter");

const session = require('express-session');

const port = process.env.PORT || 5000;

const dotenv = require('dotenv').config();

const register = require("./Routes/register");

const {limiter} = require("./configuration/limiter");

const home = require("./Routes/home");

const login = require("./Routes/login");

const path = require("path");

const userdata = require("./Routes/userdata");

const fetchdata = require("./Routes/getuserdata");

const isAuthenticated = (req,res,next)=>{
     if(req.session && req.session.emails){
        return next();
     }
     else{
        res.send("<strong> Unauthorized Access :-Log in first [status-Code:401]</strong>");
     }
}
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 15 * 60 * 1000, // Set session to expire after 15 minutes of inactivity
    httpOnly: true, // Prevents client-side JS from accessing the cookies
    secure: false, // Set to true if using HTTPS
  }
}));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(limiter);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(helmet());

app.use('/js', express.static(path.join(__dirname, 'js')));


app.get("/", (req, res) => {
    res.render("welcomepage");
});
app.get("/loginpage", (req, res) => {
    res.render("login");
});
app.get("/registerpage", (req, res) => {
    res.render("register");
});
app.use("/userdata",userdata);

app.use("/regis",register );

app.use("/getstoreddata",fetchdata);

app.get("/afterregistration", (req, res) => {
    res.render("login");
});
app.use("/home",isAuthenticated,home);

app.use("/login",login);

app.use('/logout',logout);

app.get("/success",(req,res)=>{
    res.render("success");
});

app.post("/forgot",(req,res)=>{
    const mailOptions = {
        from: '"parasdeveloper8" <your-email@example.com>', 
        to: "shaluparas95@gmail.com", 
        subject: 'Reset Link for Password', 
        text: 'Click on this link to reset your password',
        html: '<a href="http://localhost:8000/">click here<a>' 
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred: ' + error.message);
        }
        else{
        console.log('Message sent: %s', info.messageId);
        res.redirect("/success");
        }
    });
});



app.listen(port, () => {
    console.log(`Server started at ${port}`);
});
