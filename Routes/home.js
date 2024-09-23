const express = require("express");
const router = express.Router();
router.get("/",(req,res)=>{
    const username = req.session.username;
    res.render("home",{username});
    console.log(req.session);
});
module.exports = router;