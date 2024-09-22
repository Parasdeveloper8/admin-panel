const express = require("express");
const app = express();
const helmet = require("helmet");
const session = require('express-session');
const port = process.env.PORT || 9000;
const dotenv = require('dotenv').config();
const register = require("./Routes/register");
const {limiter} = require("./configuration/limiter");
const home = require("./Routes/home");
const login = require("./Routes/login");
const path = require("path");
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
app.use(express.static('public'));
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

app.use("/regis",register );

app.get("/afterregistration", (req, res) => {
    res.render("login");
});
app.use("/home",home);

app.use("/login",login);

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});
