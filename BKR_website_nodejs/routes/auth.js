var express = require('express');
var passport = require("passport");
var passport_setup = require("../config/passport-setup");
var router = express.Router();

// GET Requests for auth

// home page on /join_us/
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// google page on /join_us/google/
router.get("/google", passport.authenticate("google", {
    scope:["profile"],
}));

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.redirect("/");
})

// facebook page on /join_us/facebook/
router.get('/facebook', function(req, res, next) {
    res.send("Hello");
})

// custom page on /join_us/custom/
router.get('/custom', function(req, res, next) {
    res.send("Hello");
})

// logout page on /join_us/logout/
router.get('/logout', function(req, res, next) {
    res.send("Hello");
})

module.exports = router;
