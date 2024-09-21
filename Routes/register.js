const express = require("express");
const router = express.Router();
const {pool} = require("../configuration/databasecon");
const bcrypt = require("bcrypt");

router.post("/",(req, res) => {
    console.log("received");
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Error hashing password');
        }
        const sql = 'INSERT INTO Admin.registration(Name,Email,Password) VALUES(?,?,?)';
        pool.query(sql, [name, email, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).send(`Database error: ${err}`);
            }
            console.log("Registration successful, redirecting...");
            res.status(201).redirect("/afterregistration");
        });
    });
});
module.exports = router;