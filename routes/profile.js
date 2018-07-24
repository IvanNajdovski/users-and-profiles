const express = require("express");
const router = express.Router();

const auth = (req,res,next) =>{
    if(!req.user){
        res.redirect("/auth/login");
    }else{
        next();
    }
}

router.get(`/`,auth, (req,res) =>{
    res.render("profile" , {user: req.user});
});

module.exports = router;