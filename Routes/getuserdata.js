const express = require("express");
const router = express.Router();
const {pool} = require("../configuration/databasecon");
router.get("/",(req,res)=>{
    const Email = req.session.emails;
    pool.query("select * from Admin.data where Email=?",[Email],(err,result)=>{
        if(err){
            res.send(err);
        }
        if(result){
            res.json(result);
        }
    });
});
module.exports = router;