const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys")
const User = require("../models/user_model");

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
})

passport.use(
    new GoogleStrategy({
        clientID: keys.google.id,
        clientSecret: keys.google.secret,
        callbackURL: "/auth/google/redirect",
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId:profile._json.sub}).then((currentUser) => {
            if (currentUser) {
                console.log("User aldready exists: " + currentUser);
                done(null, currentUser);
            } else {
                new User({
                    name: profile._json.name,
                    profilePhoto: profile._json.picture,
                    googleId: profile._json.sub,
                    facebookId: "N/A",
                    meetings: [],
                }).save().then((newUser) => {
                    console.log("New User Created: " + newUser);
                    done(null, newUser);                    
                });
            }
        })
    })
)
