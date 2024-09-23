const express = require("express");
const router = express.Router();
const { pool } = require("../configuration/databasecon");
router.get("/", async (req, res) => {
    try {
        const Email = req.session.emails;

        // Check if email exists in session
        if (!Email) {
            console.warn("Email not found in session");
            return res.status(400).json({ message: "Email not found in session." });
        }

        console.log("Executing query: SELECT * FROM Admin.data WHERE Email=?", Email);

        const [result] = await pool.query("SELECT * FROM Admin.data WHERE Email=?", [Email]);

        // Handle case where no data is found
        if (result.length === 0) {
            console.info(`No data found for email: ${Email}`);
            return res.status(404).json({ message: "No data found for this email." });
        }

        // Send success response
        console.log("Data retrieved:", result);
        res.status(200).json(result);
    } catch (err) {
        // Log detailed error and send server error response
        console.error("Database query error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
