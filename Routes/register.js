const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const transporter = require("../configuration/transporter");
const {pool} = require("../configuration/databasecon");
router.post("/", async (req, res) => {
  try {
      console.log("received");
      const { name, email, password } = req.body;
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString();
      const mailOptions = {
          from: 'paras prajapat',
          to: email,
          subject: 'Successfully registered',
          text: `You have registered successfully at admin panel ${formattedDate}`,
      };

      // Send email
      await transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
          console.log(error);
        }
        else{
          console.log('Message sent: %s', info.messageId);
        }
      });

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = 'INSERT INTO Admin.registration(Name,Email,Password) VALUES(?,?,?)';
      pool.query(sql, [name, email, hashedPassword], (err, result) => {
          if (err) {
              return res.status(500).send(`Database error: ${err}`);
          }
          console.log("Registration successful, redirecting...");
          res.status(201).redirect("/loginpage");
      });

  } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
  }
});
module.exports = router;