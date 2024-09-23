const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Replace with your email provider's SMTP server
    port: 587, // Use 465 for SSL
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD // Your email password or app password
    }
});
module.exports = transporter;