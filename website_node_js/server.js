var OpenVidu = require("openvidu-node-client").OpenVidu;
var OpenViduRole = require("openvidu-node-client").OpenViduRole;

if (process.argv.length != 4) {
    console.log("Usage: node " + __filename + " OPENVIDU_URL OPENVIDU_SECRET");
    process.exit(-1);
}
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var express = require("express");
var fs = require("fs");
var session = require("express-session");
var https = require("https");
var bodyParser = require("body-parser");
var passport = require("passport");
var passport_setup = require("./config/passport_setup");
var mongoose = require("mongoose");
console.log("Mongoose Version: ")
console.log(mongoose.version);
var cookieSession = require("cookie-session");
var keys = require("./config/keys");
var userModel = require("./models/user_model")
var meetingsModel = require("./models/meeting_model");

var mongoDB = 'mongodb://127.0.0.1/BKR';
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var app = express();
var options = {
    key: fs.readFileSync("openvidukey.pem"),
    cert: fs.readFileSync("openviducert.pem"),
};
var http = require("http").createServer(options, app);

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.cookie.encryptKey],
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(
    session({
        saveUninitialized: true,
        resave: false,
        secret: "MY_SECRET",
    })
);
app.use(express.static(__dirname + "/public"));
app.use(
    bodyParser.urlencoded({
        extended: "true",
    })
);
app.use(bodyParser.json());
app.use(
    bodyParser.json({
        type: "application/vnd.api+json",
    })
);
app.set("view engine", "ejs");
var options = {
    key: fs.readFileSync("openvidukey.pem"),
    cert: fs.readFileSync("openviducert.pem"),
};

var OPENVIDU_URL = process.argv[2];
var OPENVIDU_SECRET = process.argv[3];

var OV = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);

var mapSessions = {};
var mapSessionNamesTokens = {};
var name_codes = {};
var id_tracker = {};

app.use("/static", express.static("public"));
app.get("/", function (req, res) {
    console.log(req.user);        
    if (req.user) {
        res.render(__dirname + "/public/home/home.ejs", {status_logged: "Yes", user: req.user});
    } else {
        res.render(__dirname + "/public/home/home.ejs", {status_logged: "No", user: "Not logged in"});
    }
});

app.get("/create_new/", function (req, res) {
    if (req.user) {
        res.render(__dirname + "/public/create/create.ejs", {status_logged: "Yes", user: req.user});
    } else {
        res.render(__dirname + "/public/create/create.ejs", {status_logged: "No", user: "Not logged in"});
    }
});
app.get("/join/", function (req, res) {
    if (req.user) {
        res.render(__dirname + "/public/join/join.ejs", {status_logged: "Yes", user: req.user});
    } else {
        res.render(__dirname + "/public/join/join.ejs", {status_logged: "No", user: "Not logged in"});
    }
});

app.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("/");
})

app.get("/auth/google", passport.authenticate("google", {
    scope:["profile"],
}));

app.get("/auth/google/redirect", passport.authenticate("google"), (req, res) => {
    res.redirect("/");
})

app.post("/session/", (req, res) => {
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
            id_tracker[session_id.toString()] = 0;
            var client_id = id_tracker[session_id.toString()];
            id_tracker[session_id.toString()] = 1;
            OV.createSession()
                .then((session) => {
                    mapSessions[session_id] = session;
                    // mapSessionNamesTokens[session_id] = [];
                    // name_codes[session_id] = {
                    //     name: name_meeting,
                    //     code: session_code,
                    // };
                    console.log("Type Of");
                    console.log(typeof session);
                    console.log(session);                                      
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
                                res.render(__dirname + "/public/session/session.ejs", {
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
                            res.render(__dirname + "/public/session/session.ejs", {
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
        // if (name_codes[sessionID] !== undefined) {
        //     if (session_code === name_codes[sessionID].code) {
        //         var client_id = id_tracker[sessionID.toString()];
        //         id_tracker[sessionID.toString()] = id_tracker[sessionID.toString()] + 1;
        //         mySession
        //             .generateToken(tokenOptions)
        //             .then((token) => {
        //                 mapSessionNamesTokens[sessionID].push(token);
        //                 res.render(__dirname + "/public/session/session.ejs", {
        //                     token: token,
        //                     nickName: name_client,
        //                     userName: client_id,
        //                     sessionName: sessionID,
        //                     meetingName: name_codes[sessionID].name,
        //                 });
        //             })
        //             .catch((error) => {
        //                 console.error(error);
        //             });
        //     } else {
        //         res.redirect("/join/?wrong=meeting&name=" + name_client);
        //     }
        // } else {
        //     res.redirect("/join/?wrong=meeting&name=" + name_client);
        // }
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

app.post("/leave-session", (req, res) => {
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

http.listen(8000, () => {
    console.log("listening on *:8000");
});
