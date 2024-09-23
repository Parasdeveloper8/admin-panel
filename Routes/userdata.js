const express = require("express");
const { pool } = require("../configuration/databasecon");
const router = express.Router();

router.post("/", async (req, res) => {
    const { name, age, profession, description } = req.body;
    const Email = req.session.emails;

    try {
        const result = await pool.query(
            "INSERT INTO Admin.data (Name, Email, Age, Profession, Description) VALUES (?, ?, ?, ?, ?)",
            [name, Email, age, profession, description]
        );
        console.log("Successfully data saved");
        res.redirect("/home");
    } catch (err) {
        console.error("Error saving data:", err);
        res.status(500).send(err);
    }
});

module.exports = router;
