const express = require("express");
const ratelimit = require("express-rate-limit");
const limiter = ratelimit({
    windowMs: 15* 60 * 1000, 
    max: 1, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
    handler: (req, res) => {
        res.status(429).json({
          error: 'Too many requests, please slow down!',
        });
  }});
  module.exports ={limiter};