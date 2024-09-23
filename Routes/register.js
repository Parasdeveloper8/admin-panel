const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const transporter = require("../configuration/transporter");
const {pool} = require("../configuration/databasecon");
const sendEmail = async (mailOptions) => {
  return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return reject(error);
          }
          console.log('Message sent: %s', info.messageId);
          resolve(info);
      });
  });
};

router.post("/", async (req, res) => {
  try {
      console.log("Received registration request");
      const { name, email, password } = req.body;
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString();
      const mailOptions = {
          from: 'paras prajapat',
          to: email,
          subject: 'Successfully registered',
          text: `You have registered successfully at admin panel ${formattedDate}`,
      };

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = 'INSERT INTO Admin.registration(Name, Email, Password) VALUES(?, ?, ?)';
      await pool.query(sql, [name, email, hashedPassword]);

      // Send email after saving to the database
      await sendEmail(mailOptions);

      console.log("Registration successful, redirecting...");
      res.status(201).redirect("/loginpage");
  } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
  }
});
module.exports = router;