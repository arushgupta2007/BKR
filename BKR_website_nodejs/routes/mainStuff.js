var express = require('express');
var router = express.Router();

// GET Requests for main stuff 

// home page on /
router.get('/', function(req, res, next) {
    if (req.user) {
        res.render("mainStuff/home_page.ejs", {status_logged: "Yes", user: req.user});
    } else {
        res.render("mainStuff/home_page.ejs", {status_logged: "No", user: "Not logged in"});
    }
});

// create new meeting on /create_meeting
router.get('/create_meeting', function(req, res, next) {
    if (req.user) {
        res.render("mainStuff/create_meeting.ejs", {status_logged: "Yes", user: req.user});
    } else {
        res.render("mainStuff/create_meeting.ejs", {status_logged: "No", user: "Not logged in"});
    }
})

// join ongoing meeting on /join_meeting
router.get('/join_meeting', function(req, res, next) {
    if (req.user) {
        res.render("mainStuff/join_meeting.ejs", {status_logged: "Yes", user: req.user});
    } else {
        res.render("mainStuff/join_meeting.ejs", {status_logged: "No", user: "Not logged in"});
    }
    res.send("Joining");
})

// Schedule new meeting on /schedule_meeting
router.get('/schedule_meeting', function(req, res, next) {
    res.send("Scheduling");
})

module.exports = router;