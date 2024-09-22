const express = require("express");

const app = express();

const helmet = require("helmet");

const logout = require('./Routes/logout');

const nodemailer = require("nodemailer");

const session = require('express-session');

const port = process.env.PORT || 8000;

const dotenv = require('dotenv').config();

const register = require("./Routes/register");

const {limiter} = require("./configuration/limiter");

const home = require("./Routes/home");

const login = require("./Routes/login");

const path = require("path");

const userdata = require("./Routes/userdata");

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

app.get("/afterregistration", (req, res) => {
    res.render("login");
});
app.use("/home",home);

app.use("/login",login);

app.use('/logout',logout);

// Create a transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Replace with your email provider's SMTP server
    port: 587, // Use 465 for SSL
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD // Your email password or app password
    }
});
app.post("/forgot",(req,res)=>{
    const mailOptions = {
        from: '"paras" <your-email@example.com>', // Sender address
        to: "shaluparas95@gmail.com", // List of recipients
        subject: 'Hello from Nodemailer', // Subject line
        text: 'Hello world?', // Plain text body
        html: '<b>Hello world?</b>' // HTML body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred: ' + error.message);
        }
        console.log('Message sent: %s', info.messageId);
    });
});



app.listen(port, () => {
    console.log(`Server started at ${port}`);
});
