const express = require("express");
const { pool } = require("../configuration/databasecon");
const router = express.Router();
const crypto = require('crypto');

const generateRandomKey = () => {
    return crypto.randomBytes(16).toString('hex'); // Generates a random 32-character hex string
};

router.post("/", async (req, res) => {
    const { name, age, profession, description } = req.body;
    const Email = req.session.emails;
    const userId = generateRandomKey();
    try {
        const result = await pool.query(
            "INSERT INTO Admin.data (Name, Email, Age, Profession, Description,id) VALUES (?, ?, ?, ?, ?,?)",
            [name, Email, age, profession, description,userId]
        );
        console.log("Successfully data saved");
        res.redirect("/home");
    } catch (err) {
        console.error("Error saving data:", err);
        res.status(500).send(err);
    }
});

module.exports = router;
