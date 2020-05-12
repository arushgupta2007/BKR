var express = require('express');
var bodyParser = require("body-parser");
var OpenVidu = require("openvidu-node-client").OpenVidu;
var OpenViduRole = require("openvidu-node-client").OpenViduRole;
var keys = require("../config/keys");
var userModel = require("../db_models/user_model");
var meetingsModel = require("../db_models/meeting_model");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


var OV = new OpenVidu(keys.openvidu.url, keys.openvidu.key);
var router = express.Router();
var mapSessions = {};

// GET Requests for session


// Post Request for session

// meeting page on /
router.post('/', function(req, res, next) {
    var name_client = req.body.name;
    var session_code = req.body.meeting_code;
    var objective = req.body.objective;
    var role = OpenViduRole.PUBLISHER;
    var serverData = JSON.stringify({
        serverData: name_client
    });
    var tokenOptions = {
        data: serverData,
        role: role,
    };
    if (objective === "create") {
        var name_meeting = req.body.meeting_name;
        var lowerCaseLetters = /[a-z]/g;
        var numbers = /[0-9]/g;
        console.log(session_code.match(lowerCaseLetters));
        console.log(session_code.match(numbers));
        console.log(session_code.length >= 8);
        if (session_code.match(lowerCaseLetters) && session_code.match(numbers) && session_code.length >= 8) {
            var session_id;
            do {
                session_id = Math.floor(Math.random() * 10000000000);
            } while (session_id in mapSessions);
            
            OV.createSession()
                .then((session) => {
                    mapSessions[session_id] = session;
                    // mapSessionNamesTokens[session_id] = [];
                    // name_codes[session_id] = {
                    //     name: name_meeting,
                    //     code: session_code,
                    // };
                    // console.log("Type Of");
                    // console.log(typeof session);
                    // console.log(session);                                      
                    session
                        .generateToken(tokenOptions)
                        .then((token) => {
                            // mapSessionNamesTokens[session_id].push(token);
                            console.log("error would be here if at all!!!");
                            
                            meetingsModel({
                                meetingID:session_id,
                                meetingName:name_meeting,
                                tokens:[token],
                                code: session_code,
                                next_id: 1,
                            }).save().then((newMeeting) => {
                                if (req.user) {
                                    console.log("req.user: User is " + req.user);
                                    userModel.findById(req.user._id, function (err, user) {
                                        if (user) {
                                            if (!user.meetings.includes(session_id)) {
                                                user.meetings.push(session_id);
                                                user.save();
                                                console.log(newMeeting);
                                                newMeeting.usersPrev.push(req.user._id);
                                                newMeeting.save();
                                            }
                                        } else {
                                            console.log("userModel.findById: No User Found");
                                        }
                                    })
                                } else {
                                    console.log("!req.user: user is not logged in");
                                }
                                res.render("meeting/meeting.ejs", {
                                    sessionName: session_id,
                                    token: token,
                                    nickName: name_client,
                                    userName: 0,
                                    meetingName: name_meeting,
                                });
                            })                           
                        })
                        .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
        } else {
            res.redirect("/create_new/?wrong=password&name=" + name_client + "&meeting_name=" + name_meeting);
        }
    } else {
        var sessionID = req.body.meeting_id;
        // var mySession = mapSessions[sessionID];
        meetingsModel.findOne({meetingID: sessionID}).then((meetingToJoin) => {
            if (meetingToJoin) {
                if (meetingToJoin.code === session_code) {
                    var mySession = mapSessions[sessionID];
                    var client_id = meetingToJoin.next_id;
                    mySession
                    .generateToken(tokenOptions)
                    .then((token) => {
                        meetingToJoin.tokens.push(token);
                        meetingToJoin.next_id = meetingToJoin.next_id + 1;
                        meetingToJoin.save().then((meeting) => {
                            if (req.user) {
                                console.log("req.user: User is " + req.user);
                                userModel.findById(req.user._id, function (err, user) {
                                    if (user) {
                                        if (!user.meetings.includes(sessionID)) {
                                            user.meetings.push(sessionID);
                                            user.save();
                                            newMeeting.usersPrev.push(req.user._id);
                                            newMeeting.save();
                                        }
                                    } else {
                                        console.log("userModel.findById: No User Found");
                                    }
                                })
                            } else {
                                console.log("!req.user: user is not logged in");
                            }
                            res.render("meeting/meeting.ejs", {
                                token: token,
                                nickName: name_client,
                                userName: client_id,
                                sessionName: sessionID,
                                meetingName: meeting.meetingName,
                            });
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                } else {
                    res.redirect("/join/?wrong=meeting&name=" + name_client);    
                }
            } else {
                res.redirect("/join/?wrong=meeting&name=" + name_client);
            }
        })
    }    
});

function deleteMeeting(session_id, meeting) {
    delete mapSessions[session_id];
    console.log("Deleting!!!!");
    usersArray = meeting.usersPrev;
    for (user of usersArray) {
        userModel.deleteOne({_id: user}, function(err){});
    }
    meetingsModel.deleteOne({meetingID: session_id}).catch((err, b, c) => {})
}

router.post("/leave-session", (req, res, next) => {
    var sessionName = req.body.sessionname;
    var token = req.body.token;
    var name_client = req.body.nickName;

    if (mapSessions[sessionName]) {
        meetingsModel.findOne({meetingID: sessionName}).then((meeting) => {
        var tokens = meeting.tokens;
        var index = tokens.indexOf(token);
        if (index !== -1) {
            tokens.splice(index, 1);
            meeting.save().then((meeting_recv) => {
                if (meeting_recv.tokens.length == 0) {
                    deleteMeeting(sessionName, meeting_recv);
                }
            });
        } else {
            console.log("Problems in the app server: the TOKEN wasn't valid");
            res.redirect("/");
        }
        res.redirect("/");
        })
    } else {
        console.log("Problems in the app server: the SESSION does not exist");
        console.log(mapSessions);        
        res.redirect("/");
    }
});

module.exports = router;