const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const keys = require("./keys");
const { User } = require("../models");

passport.serializeUser((user,done) =>{
    done(null, user.id);
});

passport.deserializeUser((id,done) =>{
    User.findById(id).then((user) =>{
    done(null, user);
})

});

passport.use(
    new FacebookStrategy({
        callbackURL: "/auth/facebook/redirect",
        clientID: keys.facebook.appID || process.env.clientID,
        clientSecret: keys.facebook.appSecret || process.env.secret
    },(accessToken, refreshToken, profile, done) =>{
        // passport callback function
        User.findOne({facebookId: profile.id}).then((currentUser) =>{
        if (!currentUser) {
    new User({
        username: profile.displayName,
        facebookId: profile.id
    }).save().then((newUser) =>{
        console.log("New user is: ", newUser);
    done(null, newUser);
});
}else {
    console.log("Current user is: ", currentUser);
    done(null, currentUser);
}
});

})
);



passport.use(
    new GoogleStrategy({
    //options for strategy
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID || process.env.clientID,
        clientSecret: keys.google.clientSecret || process.env.secret
    },(accessToken, refreshToken, profile, done) =>{
    // passport callback function
     User.findOne({googleId: profile.id}).then((currentUser) =>{
        if (!currentUser) {
            new User({
                username: profile.displayName,
                googleId: profile.id
                 }).save().then((newUser) =>{
                    console.log("New user is: ", newUser);
                    done(null, newUser);
});
}else {
            console.log("Current user is: ", currentUser);
            done(null, currentUser);
}
    });

})
);