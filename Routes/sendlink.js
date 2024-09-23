const express = require("express");
const router = express.Router();
const { pool } = require("../configuration/databasecon");
const transporter = require("../configuration/transporter");

router.post("/", async (req, res) => {
    const email = req.body.email;
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    try {
        // Fetch user from the database
        const [users] = await pool.query("SELECT * FROM Admin.registration WHERE Email = ?", [email]);

        if (users.length === 0) {
            return res.status(404).send("Email not found");
        }

        // Prepare email options
        const mailOptions = {
            from: 'paras prajapat',
            to: email,
            subject: 'Password Reset Link',
            text: `You have been sent a link for password reset on ${formattedDate}. Link: http://localhost:5000/newpasswordpage`
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).send("Error sending email");
            }

            console.log('Message sent: %s', info.messageId);
            return res.send("Successfully sent");
        });

    } catch (err) {
        console.error('Server error:', err);
        return res.status(500).send("Error on the server.");
    }
});

module.exports = router;
