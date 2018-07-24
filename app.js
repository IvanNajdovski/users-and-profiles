const express = require("express");
const app = express();
const passportSetup = require("./config/passport-setup");
const cookie = require("cookie-session");
const keys = require("./config/keys");
const passport = require("passport");

const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile");

//
// const mongoose = require("mongoose");

//
// mongoose.set("debug", true);
// mongoose.Promise = Promise;
//
// mongoose
//     .connect(keys.mongodb.dbURI).then(() =>{
//     console.log("Connected to MongoDB");
// }).catch(err =>{
//     console.log(err);
// });

//set the view engine
app.set("view engine", "ejs");

app.use(cookie({
    maxAge: 24 * 60 * 60 * 1000,
    keys:[keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//set the routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);


//set the home page
app.get("/", (req,res) =>{
    res.render("home" , { user: req.user});
})


app.listen(3000, () =>{
    console.log("Portal open on port 3000..");
})