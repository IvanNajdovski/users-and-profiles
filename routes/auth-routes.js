const express = require("express");
const passport = require("passport");

const { User } = require("../models");

const router = express.Router()

//auth login
router
    .route("/login")
    .get((req,res,next)=>{
        res.render("login", {user:req.user})
});
// auth logout
router
    .route("/logout")
    .get((req,res,next)=>{
        //handle with passport
        req.logout();
        res.redirect("/")
});

//auth with facebook
router.get("/facebook", passport.authenticate("facebook"));
//callback rout for facebook to redirect
router.get("/facebook/redirect",passport.authenticate("facebook"),(req,res,next) =>{
    // const user = req.user.username;
    res.redirect(`/profile/`)
})

//auth with google
router.get("/google", passport.authenticate("google",{
    scope: ["profile"]
}));

//callback route for google to redirect

router.get("/google/redirect",passport.authenticate("google"),(req,res,next) =>{
    // const user = req.user.username;
    res.redirect(`/profile/`)
})

module.exports = router;
