const express = require("express");
const { pool } = require("../configuration/databasecon");
const router = express.Router();
const bcrypt = require('bcrypt');
const transporter = require("../configuration/transporter");

router.post("/", async (req, res) => {
    const email = req.body.email;
    const newpassword = req.body.newpassword;

    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newpassword, 10);
        
        // Update the password in the database
        const [result] = await pool.query("UPDATE Admin.registration SET Password = ? WHERE Email = ?", [hashedPassword, email]);

        if (result.affectedRows > 0) {
            // Send email notification if update was successful
            const formattedDate = new Date().toLocaleString();
            const mailOptions = {
                from: 'paras prajapat',
                to: email,
                subject: 'Successfully changed password',
                text: `You have successfully changed your password on ${formattedDate}.`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Message sent: %s', info.messageId);
                }
            });

            res.send("Successfully changed password");
        } else {
            res.status(404).send("Email not found");
        }
    } catch (err) {
        res.status(500).send("An error occurred");
    }
});

module.exports = router;
