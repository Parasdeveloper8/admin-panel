const express = require("express");
const {pool} = require("../configuration/databasecon");
const router = express.Router();
router.post("/",(req,res)=>{
    const {name,age,profession,description} = req.body;
    const Email = req.session.emails;
    pool.query("insert into Admin.data(Name,Email,Age,profession,Description) values(?,?,?,?,?)"
        ,[name,Email,age,profession,description],(err,result)=>{
            if(err){
                res.send(err);
            }
            else{
                res.redirect("/home");
                console.log("successfully data saved");
            }
        });
});
module.exports = router;