// Importing OpenVidu
var OpenVidu = require("openvidu-node-client").OpenVidu;
var OpenViduRole = require("openvidu-node-client").OpenViduRole;

// Checking If Local
var IS_LOCAL = parseInt(process.env.IS_LOCAL);
console.log("IS LOCAL: " + IS_LOCAL);

// Workaround to a problem
if (IS_LOCAL === 1) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

// Other Imports
var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cookieSession = require("cookie-session");
var keys = require("./config/keys");
var cors = require('cors');
// const fileupload = require('express-fileupload')

// MongoDB models
var userModel = require("./models/user_model");
var meetingsModel = require("./models/meeting_model");

// Connecting to local MongoDB
if (IS_LOCAL === 1) {
    console.log("IS_LOCAL: TRUE, MONGODB Connection To mymongo");
    var mongoDB = 'mongodb://mymongo/BKR';
    mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
} else {
    console.log("IS_LOCAL: FALSE, MONGODB Connection To localhost");
    var mongoDB = 'mongodb://localhost:27017/BKR';
    mongoose.connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

// Initializing Express
var app = express();

// Starting http server with openvidu requirements
var http = require("http").createServer(app);
var options = {
    key: fs.readFileSync("openvidukey.pem"),
    cert: fs.readFileSync("openviducert.pem"),
};
var https = require('https').createServer(options, app);

// Using cookie-session as default cookie
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.cookie.encryptKey],
}));

// unknown
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: "true",
    })
);
app.use(
    bodyParser.json({
        type: "application/vnd.api+json",
    })
);

app.use(cors({ origin: 'http://localhost' }));
// app.use(fileupload());

// setting view engine as ejs
app.set("view engine", "ejs");

// setting favicon
app.use('/favicon.ico', express.static('public/home/images/favicon.ico'));
// Connecting to Openvidu Server
var OPENVIDU_URL = process.env.OPENVIDU_URL;
var OPENVIDU_SECRET = process.env.OPENVIDU_SECRET;
var OV = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);

// Storing all session objects in mapSessions Object
var mapSessions = {};

// setting all files of public to be hosted on /static
app.use("/static", express.static("public"));

// helper functions
// function to delete meeting
function deleteMeeting(session_id, meeting) {
    //delete from mapSession
    delete mapSessions[session_id];
    console.log("DELETED MEETING");
}

// GET request to / (home page)
app.get("/", function (req, res) {
    console.log("--------------------------------------------------------");
    console.log("RENDERING HOME PAGE");
    // render home ejs file
    res.render(__dirname + "/public/home/home.ejs");
});

// GET request to /faq (faq page)
app.get("/faq/", (req, res) => {
    console.log("--------------------------------------------------------");
    console.log("RENDERING FAQ PAGE");
    // render home ejs file
    res.render(__dirname + "/public/FAQ/FAQ.ejs");
});

// GET request to /profile (profile page)
app.get("/profile/", (req, res) => {
    console.log("--------------------------------------------------------");
    console.log("RENDERING PROFILE PAGE");
    // render home ejs file
    res.render(__dirname + "/public/profile/profile.ejs");
});

// GET request to /meetings-rooms (meetings-rooms page)
app.get("/meetings-rooms/", (req, res) => {
    console.log("--------------------------------------------------------");
    console.log("RENDERING PREV MEETING PAGE");
    // render home ejs file
    res.render(__dirname + "/public/meetingRoom/meetingRoom.ejs");
})

// GET request to /join_us (sign in / sign up / log in)
app.get("/join_us/", function (req, res) {
    console.log("--------------------------------------------------------");
    console.log("RENDERING JOIN US PAGE");
    // render join_us ejs file
    res.render(__dirname + "/public/join_us/join_us.ejs");
});

// GET request to /friends (friends page)
app.get("/friends/", function (req, res) {
    console.log("--------------------------------------------------------");
    console.log("RENDERING FRIENDS PAGE");
    // render join_us ejs file
    res.render(__dirname + "/public/friends/friends.ejs");
});

app.get("/firebase-messaging-sw.js", (req, res) => {
    res.sendFile(__dirname + "/firebase-messaging-sw.js")
})

// GET request to /join_us/success (success of joining us above)
app.get("/join_us/success/", function (req, res) {
    console.log("--------------------------------------------------------");
    console.log("RENDERING JOIN US SUCCESS PAGE");
    // render success of joining us ejs file
    res.render(__dirname + "/public/join_us/success/success.ejs");
});

// POST request to /join_us/addUser (adding user to MongoDB database)
app.post("/join_us/addUser/", function (req, res) {
    console.log("--------------------------------------------------------");
    console.log("ADD USER CALLED");
    // find if there is existing user with same user id
    userModel.findOne({
        commonId: req.body.id_to_keep
    }, function (err, user) {
        if (err) {
            // log error if there
            console.log(err);
        }
        if (!user) {
            console.log("ADDING USER TO DATABASE");
            // no user found with same user id
            // saving user to database
            userModel({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                profilePhoto: req.body.photoUrl,
                phoneNo: req.body.phone_no,
                commonId: req.body.id_to_keep,
                meetings: [],
            }).save().then(user => {
                console.log("USER HAS BEEN SUCCESSFULLY ADDED TO DATABASE");
            });
        }
    });
    // Send some dummy text back
    res.send("Bla");
});

// POST request to /session (meeting)
app.post("/session/", (req, res) => {
    console.log("--------------------------------------------------------");
    console.log("ENTERED MEETING PAGE");
    // name of user
    var name_client = req.body.name;
    // code entered by user
    var session_code = req.body.meetingCode;
    // does user want to create new meeting or join exisiting meeting
    var objective = req.body.obj;
    // All participants hav a role of publisher
    var role = OpenViduRole.PUBLISHER;
    // server data needed by OpenVidu
    var serverData = JSON.stringify({
        serverData: name_client
    });
    // token configuration needed by OpenVidu
    var tokenOptions = {
        data: serverData,
        role: role,
        kurentoOptions: {
            allowedFilters: ["GStreamerFilter", "FaceOverlayFilter"]
        }
    };
    // check objective of user
    if (objective === "create") {
        console.log("--------------------------------------------------------");
        console.log("USER WANTS TO CREATE NEW MEETING");
        // what name should the meeting have
        var name_meeting = req.body.meetingName;
        // meeting description
        var meeting_desc = req.body.meetingDesc;
        // create unique meeting id of length 10 digits
        var session_id = Date.now();

        // create OpenVidu session
        var prop = {
            customSessionId: session_id.toString()
        };

        OV.createSession(prop)
            .then((session) => {
                console.log("SESSION CREATED");
                // store session object to mapSessions
                mapSessions[session_id] = session;

                // generate token for user needed by OpenVidu
                session
                    .generateToken(tokenOptions)
                    .then((token) => {
                        console.log("TOKEN GENERATED FOR FIRST PARICIPANT");
                        /* mapSessionNamesTokens[session_id].push(token); */
                        // save meeting to MongoDB
                        console.log("SAVING MEETING TO DATABASE");
                        meetingsModel({
                            _id: new mongoose.Types.ObjectId(),
                            meetingID: session_id,
                            meetingName: name_meeting,
                            meetingDesc: meeting_desc,
                            tokens: [token],
                            code: session_code,
                            next_id: 1,
                            usersPrev: [],
                            isRecording: false,
                            chatMessages: [],
                        }).save().then((newMeeting) => {
                            console.log("MEETING SAVED TO DATABASE");
                            // check if user was signed in, If yes save in it's meetings list
                            if (req.body.userId !== "") {
                                console.log("USER IS SIGNED IN");
                                // user was signed in
                                // find user in the database
                                console.log("FINDING SIGNED IN USER IN DATABASE");
                                userModel.findOne({
                                    commonId: req.body.userId
                                }, function (err, user) {
                                    // if user was found continue
                                    if (user) {
                                        console.log("FOUND USER");
                                        // user was found
                                        // check if that meeting aldready exists in user's meeting lis or not
                                        if (!user.meetings.includes(session_id)) {
                                            console.log("MEETING NOT IN MEETING LIST OF USER");
                                            // meeting does not exixt in user's meeting list
                                            // push meeting in user's meeting list
                                            user.meetings.push(newMeeting._id);
                                            // save user to MongoDB
                                            user.save();
                                            // store users in meeting's user list
                                            newMeeting.usersPrev.push(user._id);
                                            // save meeting to MongoDB
                                            newMeeting.save();
                                            console.log("ADDED MEETING TO USER'S MEETING LIST AND USER TO MEETING'S USER LIST");
                                        }
                                    } else {
                                        // user was not found
                                        console.log("USER WAS NOT FOUND IN DATABASE BUT WAS SIGNED IN");
                                    }
                                });
                            } else {
                                // user was not logged in
                                console.log("USER IS NOT LOGGED IN");
                            }
                            // render meeting ejs file with passing some data
                            console.log("RENDERING MEETING PAGE");
                            res.render(__dirname + "/public/session/session.ejs", {
                                sessionName: session_id,
                                token: token,
                                nickName: name_client,
                                userName: 0,
                                meetingName: name_meeting,
                                code: session_code,
                            });
                        });
                    })
                    .catch((err) => console.log(err)); // log error if there
            })
            .catch((err) => console.log(err)); // log error if there
    } else if (objective === "join-or-create") {
        console.log("--------------------------------------------------------");
        console.log("USER WANTS TO JOIN PREV MEETING");
        var sessionID = parseInt(req.body.meetingId);
        meetingsModel.findOne({
            meetingID: sessionID
        }).then((meetingToJoin) => {
            if (meetingToJoin) {
                console.log("FOUND MEETING");
                if (meetingToJoin.code === session_code) {
                    console.log("MEETING CODE WAS CORRECT");
                    var client_id = meetingToJoin.next_id;
                    if (mapSessions[sessionID]) {
                        mapSessions[sessionID]
                            .generateToken(tokenOptions)
                            .then((token) => {
                                console.log("GENERATED TOKEN FOR USER");
                                // push token to meeting's token array in MongoDB
                                meetingToJoin.tokens.push(token);
                                // Increment meeting's next Id in MongoDB
                                meetingToJoin.next_id = meetingToJoin.next_id + 1;
                                // saving changes of meeting to MongoDB
                                meetingToJoin.save().then((meeting) => {
                                    // render meeting ejs file with passing some data
                                    console.log("RENDERING MEETING PAGE");
                                    res.render(__dirname + "/public/session/session.ejs", {
                                        token: token,
                                        nickName: name_client,
                                        userName: client_id,
                                        sessionName: sessionID,
                                        meetingName: meeting.meetingName,
                                        code: session_code,
                                    });
                                });
                            })
                            .catch((error) => {
                                console.error(error); // log error if there
                            });
                    } else {
                        var prop = {
                            customSessionId: session_id.toString()
                        };
                        OV.createSession(prop)
                            .then((session) => {
                                console.log("SESSION CREATED");
                                // store session object to mapSessions
                                mapSessions[sessionID] = session;

                                // generate token for user needed by OpenVidu
                                session
                                    .generateToken(tokenOptions)
                                    .then((token) => {
                                        console.log("TOKEN GENERATED FOR FIRST PARICIPANT");
                                        /* mapSessionNamesTokens[sessionID].push(token); */
                                        meetingToJoin.tokens.push(token);
                                        // Increment meeting's next Id in MongoDB
                                        meetingToJoin.next_id = meetingToJoin.next_id + 1;
                                        meetingToJoin.save().then((meeting) => {
                                            console.log("RENDERING MEETING PAGE");
                                            res.render(__dirname + "/public/session/session.ejs", {
                                                sessionName: sessionID,
                                                token: token,
                                                nickName: name_client,
                                                userName: client_id,
                                                meetingName: meeting.meetingName,
                                                code: session_code,
                                            });
                                        })
                                        // render meeting ejs file with passing some data
                                    })
                                    .catch((err) => console.log(err)); // log error if there
                            })
                            .catch((err) => console.log(err));
                    }
                }
            }
        });
    } else {
        console.log("--------------------------------------------------------");
        console.log("USER WANTS TO JOIN ONGOING MEETING");
        // user wants to join a ongoing meeting
        // get sessionId
        var sessionID = parseInt(req.body.meetingId);
        // find the meeting in MongoDB with that session id
        console.log("FINDING MEETING FROM MEETING ID");
        meetingsModel.findOne({
            meetingID: sessionID
        }).then((meetingToJoin) => {
            // check if meeting exists
            if (meetingToJoin) {
                console.log("FOUND MEETING");
                // meeting exists
                // check if code given by user matches the one in the database
                if (meetingToJoin.code === session_code) {
                    console.log("MEETING CODE WAS CORRECT");
                    // code matches
                    // get session object from mapSessions
                    var mySession = mapSessions[sessionID];
                    // get client id to put from database
                    var client_id = meetingToJoin.next_id;
                    // generate token for user needed by OpenVidu
                    mySession
                        .generateToken(tokenOptions)
                        .then((token) => {
                            console.log("GENERATED TOKEN FOR USER");
                            // push token to meeting's token array in MongoDB
                            meetingToJoin.tokens.push(token);
                            // Increment meeting's next Id in MongoDB
                            meetingToJoin.next_id = meetingToJoin.next_id + 1;
                            // saving changes of meeting to MongoDB
                            meetingToJoin.save().then((meeting) => {
                                // check if user is logged in
                                if (req.body.userId !== "") {
                                    console.log("USER IS LOGGED IN");
                                    // user is logged in
                                    // find the user who is logged in in MongoDB
                                    console.log("FINDING LOGGED IN USER IN DATABASE");
                                    userModel.findOne({
                                        commonId: req.body.userId
                                    }, function (err, user) {
                                        // check if user exists in the database
                                        if (user) {
                                            console.log("FOUND LOGGED IN USER IN DATABASE");
                                            // user exists
                                            // check if user's meeting list contains current meeting
                                            if (!user.meetings.includes(meeting._id)) {
                                                console.log("MEETING NOT IN USER'S MEETING LIST");
                                                // user's meeting list does not have the current meeting
                                                // add current meeting to user's meeting list
                                                user.meetings.push(meeting._id);
                                                // save chages done to user in MongoDB
                                                user.save();
                                                // push user to meeting'suser list
                                                meeting.usersPrev.push(user._id);
                                                // save changes done to meeting in MongoDB
                                                meeting.save();
                                                console.log("ADDED MEETING IN USER'S MEETING LIST AND USER IN MEETING'S USER LIST");
                                            }
                                        } else {
                                            // user does not exists in database
                                            console.log("USER IS SIGNED IN BUT NOT FOUND IN DATABASE");
                                        }
                                    });
                                } else {
                                    // user is not logged in
                                    console.log("USER IS NOT LOGGED IN");
                                }
                                // render meeting ejs file with passing some data
                                console.log("RENDERING MEETING PAGE");
                                res.render(__dirname + "/public/session/session.ejs", {
                                    token: token,
                                    nickName: name_client,
                                    userName: client_id,
                                    sessionName: sessionID,
                                    meetingName: meeting.meetingName,
                                    code: session_code,
                                });
                            });
                        })
                        .catch((error) => {
                            console.error(error); // log error if there
                        });
                } else {
                    // the meeting id or meeting code was incorrect
                    // redirect user to fill right values
                    console.log("WRONG MEETING ID OR MEETING CODE");
                    res.redirect("/?todo=join-wrong&name=" + name_client);
                }
            } else {
                // meeting does not exist in MongoDB database, meetingId was incorrect
                // redirect user to fill right values
                console.log("WRONG MEETING ID");
                res.redirect("/?todo=join-wrong&name=" + name_client);
            }
        });
    }
});


// POST request to /session/saveMessage (save the message to database)
app.post("/session/saveMessage/", (req, res) => {
    console.log("--------------------------------------------------------");
    console.log("SAVING MESSAGE WITH DATA:" + req.body);
    // get sessionId, from name, from account id, to, and message from req.body
    var data = req.body;
    // find meeting from data.sessionId
    meetingsModel.findOne({
        meetingID: data.sessionId
    }, function (err, meeting) {
        if (err) {
            // log error if there
            console.log(err);
        }
        if (meeting) {
            // meeting found
            // remove unnecessary data
            delete data.sessionId;
            // append to chat list of meeting
            meeting.chatMessages.push(data);
            // save changes done to meeting to MongoDB
            meeting.save();
        }
    });
    res.send("Bla");
});

app.post("/session/refresh", (req, res) => {
    console.log("--------------------------------------------------------");
    console.log("USER WANTS TO REFRESH IT'S CONNECTION");
    var sessionName = req.body.sessionname;
    var token = req.body.token;
    if (mapSessions[sessionName]) {
        // session object exists
        // find meeting in MongoDB database
        meetingsModel.findOne({
            meetingID: sessionName
        }).then((meeting) => {
            // get all tokens
            var tokens = meeting.tokens;
            // get index of token of the user who wants to exit the meeting
            var index = tokens.indexOf(token);
            // check if token exists
            if (index !== -1) {
                // token exists
                // remove token from token list
                tokens.splice(index, 1);
                // save meeting to MongoDB database
                meeting.save().then((meeting_recv) => {
                    // check if there are any more users in the meeting
                    if (meeting_recv.tokens.length === 0) {
                        // there are no more users in the meeting
                        // delete entire meeting
                        deleteMeeting(sessionName, meeting_recv);
                    }
                });
            } else {
                // token was not valid
                // redirect user to home page
                res.redirect("/");
            }
            // redirect users after process
            res.redirect(307, "/session/");
        });
    } else {
        // there was no session object in mapSession
        res.redirect("/");
    }
});

// POST request to /leave-session (leave the current session)
app.post("/leave-session", (req, res) => {
    console.log("--------------------------------------------------------");
    console.log("LEAVING SESSION");
    // get session name
    var sessionName = req.body.sessionname;
    // get user's token
    var token = req.body.token;

    /* var name_client = req.body.nickName; */

    // check if session's object exists
    if (mapSessions[sessionName]) {
        // session object exists
        // find meeting in MongoDB database
        meetingsModel.findOne({
            meetingID: sessionName
        }).then((meeting) => {
            // get all tokens
            var tokens = meeting.tokens;
            // get index of token of the user who wants to exit the meeting
            var index = tokens.indexOf(token);
            // check if token exists
            if (index !== -1) {
                // token exists
                // remove token from token list
                tokens.splice(index, 1);
                // save meeting to MongoDB database
                meeting.save().then((meeting_recv) => {
                    // check if there are any more users in the meeting
                    if (meeting_recv.tokens.length === 0) {
                        // there are no more users in the meeting
                        // delete entire meeting
                        deleteMeeting(sessionName, meeting_recv);
                    }
                });
            } else {
                // token was not valid
                // redirect user to home page
                res.redirect("/");
            }
            // redirect users after process
            res.redirect("/");
        });
    } else {
        // there was no session object in mapSession
        res.redirect("/");
    }
});

app.post("/mobile-api/create-meeting-get-token", (req, res) => {
    console.log("GOT REQUEST FROM MOBILE");
    var userName = req.body.userName;
    var meetingName = req.body.meetingName;
    var meetingCode = req.body.meetingCode;
    var meetingDesc = req.body.meetingDesc;
    var userId = req.body.userId;
    var role = OpenViduRole.PUBLISHER;
    // server data needed by OpenVidu
    var serverData = JSON.stringify({
        serverData: userName
    });
    // token configuration needed by OpenVidu
    var tokenOptions = {
        data: serverData,
        role: role,
        kurentoOptions: {
            allowedFilters: ["GStreamerFilter", "FaceOverlayFilter", "ChromaFilter"]
        },
    };
    var session_id = Date.now();

    // create OpenVidu session
    var prop = {
        customSessionId: session_id.toString()
    };
    OV.createSession(prop)
        .then((session) => {
            console.log("SESSION CREATED");
            // store session object to mapSessions
            mapSessions[session_id] = session;

            // generate token for user needed by OpenVidu
            session
                .generateToken(tokenOptions)
                .then((token) => {
                    console.log("TOKEN GENERATED FOR FIRST PARICIPANT");
                    /* mapSessionNamesTokens[session_id].push(token); */
                    // save meeting to MongoDB
                    console.log("SAVING MEETING TO DATABASE");
                    meetingsModel({
                        _id: new mongoose.Types.ObjectId(),
                        meetingID: session_id,
                        meetingName: meetingName,
                        meetingDesc: meetingDesc,
                        tokens: [token],
                        code: meetingCode,
                        next_id: 1,
                        usersPrev: [],
                        isRecording: false,
                        chatMessages: [],
                    }).save().then((newMeeting) => {
                        console.log("MEETING SAVED TO DATABASE");
                        // check if user was signed in, If yes save in it's meetings list
                        if (req.body.userId !== "") {
                            console.log("USER IS SIGNED IN");
                            // user was signed in
                            // find user in the database
                            console.log("FINDING SIGNED IN USER IN DATABASE");
                            userModel.findOne({
                                commonId: req.body.userId
                            }, function (err, user) {
                                // if user was found continue
                                if (user) {
                                    console.log("FOUND USER");
                                    // user was found
                                    // check if that meeting aldready exists in user's meeting lis or not
                                    if (!user.meetings.includes(session_id)) {
                                        console.log("MEETING NOT IN MEETING LIST OF USER");
                                        // meeting does not exixt in user's meeting list
                                        // push meeting in user's meeting list
                                        user.meetings.push(newMeeting._id);
                                        // save user to MongoDB
                                        user.save();
                                        // store users in meeting's user list
                                        newMeeting.usersPrev.push(user._id);
                                        // save meeting to MongoDB
                                        newMeeting.save();
                                        console.log("ADDED MEETING TO USER'S MEETING LIST AND USER TO MEETING'S USER LIST");
                                    }
                                } else {
                                    // user was not found
                                    console.log("USER WAS NOT FOUND IN DATABASE BUT WAS SIGNED IN");
                                }
                            });
                        } else {
                            // user was not logged in
                            console.log("USER IS NOT LOGGED IN");
                        }
                        res.send(JSON.stringify({
                            token: token,
                            session_id: session_id,
                            user_id: 0,
                        }))
                    });
                })
                .catch((err) => console.log(err)); // log error if there
        })
        .catch((err) => console.log(err));
})

app.post("/mobile-api/join-meeting-and-get-token/", (req, res) => {
    console.log("GOT REQUEST FROM MOBILE");
    var userName = req.body.userName;
    var meetingId = parseInt(req.body.meetingId);
    var meetingCode = req.body.meetingCode;
    var userId = req.body.userId;
    var role = OpenViduRole.PUBLISHER;
    // server data needed by OpenVidu
    var serverData = JSON.stringify({
        serverData: userName
    });
    // token configuration needed by OpenVidu
    var tokenOptions = {
        data: serverData,
        role: role,
        kurentoOptions: {
            allowedFilters: ["GStreamerFilter", "FaceOverlayFilter", "ChromaFilter"]
        },
    };
    // user wants to join a ongoing meeting
    // get sessionId
    // find the meeting in MongoDB with that session id
    console.log("FINDING MEETING FROM MEETING ID");
    meetingsModel.findOne({
        meetingID: meetingId
    }).then((meetingToJoin) => {
        // check if meeting exists
        if (meetingToJoin) {
            console.log("FOUND MEETING");
            // meeting exists
            // check if code given by user matches the one in the database
            if (meetingToJoin.code === meetingCode) {
                console.log("MEETING CODE WAS CORRECT");
                // code matches
                // get session object from mapSessions
                var mySession = mapSessions[meetingId];
                // get client id to put from database
                var client_id = meetingToJoin.next_id;
                // generate token for user needed by OpenVidu
                mySession
                    .generateToken(tokenOptions)
                    .then((token) => {
                        console.log("GENERATED TOKEN FOR USER");
                        // push token to meeting's token array in MongoDB
                        meetingToJoin.tokens.push(token);
                        // Increment meeting's next Id in MongoDB
                        meetingToJoin.next_id = meetingToJoin.next_id + 1;
                        // saving changes of meeting to MongoDB
                        meetingToJoin.save().then((meeting) => {
                            // check if user is logged in
                            if (req.body.userId !== "") {
                                console.log("USER IS LOGGED IN");
                                // user is logged in
                                // find the user who is logged in in MongoDB
                                console.log("FINDING LOGGED IN USER IN DATABASE");
                                userModel.findOne({
                                    commonId: req.body.userId
                                }, function (err, user) {
                                    // check if user exists in the database
                                    if (user) {
                                        console.log("FOUND LOGGED IN USER IN DATABASE");
                                        // user exists
                                        // check if user's meeting list contains current meeting
                                        if (!user.meetings.includes(meeting._id)) {
                                            console.log("MEETING NOT IN USER'S MEETING LIST");
                                            // user's meeting list does not have the current meeting
                                            // add current meeting to user's meeting list
                                            user.meetings.push(meeting._id);
                                            // save chages done to user in MongoDB
                                            user.save();
                                            // push user to meeting'suser list
                                            meeting.usersPrev.push(user._id);
                                            // save changes done to meeting in MongoDB
                                            meeting.save();
                                            console.log("ADDED MEETING IN USER'S MEETING LIST AND USER IN MEETING'S USER LIST");
                                        }
                                    } else {
                                        // user does not exists in database
                                        console.log("USER IS SIGNED IN BUT NOT FOUND IN DATABASE");
                                    }
                                });
                            } else {
                                // user is not logged in
                                console.log("USER IS NOT LOGGED IN");
                            }
                            // render meeting ejs file with passing some data
                            res.send(JSON.stringify({
                                token: token,
                                session_id: meetingId,
                                meetingName: meetingToJoin.meetingName,
                                meetingCode: meetingToJoin.code,
                                meetingDesc: meetingToJoin.meetingDesc,
                                user_id: client_id
                            }))
                        });
                    })
                    .catch((error) => {
                        console.error(error); // log error if there
                    });
            } else {
                // the meeting id or meeting code was incorrect
                // redirect user to fill right values
                console.log("WRONG MEETING ID OR MEETING CODE");
                res.redirect("/?todo=join-wrong&name=" + name_client);
            }
        } else {
            // meeting does not exist in MongoDB database, meetingId was incorrect
            // redirect user to fill right values
            console.log("WRONG MEETING ID");
            res.redirect("/?todo=join-wrong&name=" + name_client);
        }
    });
})

// app.post("/user-api/file-share-chat/", (req, res) => {
//     console.log(req.files);
//     if (req.files) {
//         var file = req.files.fileShare,
//             filename = file.name;
//         var now = Date.now();
//         file.mv("./public/uploads/" + now + "-" + filename, (err) => {
//             if (err) {
//                 res.send("err");
//             } else {
//                 res.send("ok," + now + "-" + filename);
//             }
//         });
//     } else {
//         res.send("emptyvbahahahahah");
//     }
// })

app.post("/user-api/check-id-code/", function (req, res) {
    console.log("--------------------------------------------------------");
    console.log("API CHECK ID AND CODE");
    var meeting_id = parseInt(req.body.meetingId);
    var meeting_code = req.body.meetingCode;
    meetingsModel.findOne({
        meetingID: meeting_id
    }).then(meeting => {
        if (meeting) {
            console.log("MEETING FOUND");
            if (meeting_code === meeting.code) {
                console.log("MEETING CODE IS RIGHT");
                res.send("1");
            } else {
                console.log("MEETING CODE IS WRONG");
                res.send("0");
            }
        } else {
            console.log("MEETING NOT FOUND");
            res.send("0");
        }
    });
});

app.post("/user-api/user/prevMeetings/", function (req, res) {
    console.log("--------------------------------------------------------");
    console.log("USER RQUESTED IT'S PREV MEETINGS");
    var userUid = req.body.userUID;
    var array_to_return = [];
    userModel.findOne({
        commonId: userUid
    }).populate("meetings").then(user => {
        if (user) {
            console.log("FOUND USER");
            for (var i = 0; i < user.meetings.length; i++) {
                console.log("MEETING FOUND: " + user.meetings[i]);
                console.log("NAME: " + user.meetings[i].meetingName);
                console.log("MEETINGID: " + user.meetings[i].meetingID);
                var data_meeting = {
                    meeting_id_mongo: user.meetings[i]._id,
                    meeting_name: user.meetings[i].meetingName,
                    meeting_id: user.meetings[i].meetingID,
                    meeting_code: user.meetings[i].code,
                };
                array_to_return.push(data_meeting);
            }
            console.log("SENDING DATA BACK TO USER");
            res.send(array_to_return);
        } else {
            res.send("bla");
        }
    });
});

app.post("/user-api/prevMeeting/chats/", (req, res) => {
    console.log("---------------------------------------");
    console.log("PREV MEETING CHATS TO BE GIVEN");
    var uid = req.body.userId;
    var meetingId = req.body.meetingId;
    userModel.findOne({
        commonId: uid
    }).populate("meetings").then(user => {
        console.log("USER FOUND");
        if (user) {
            for (var i = 0; i < user.meetings.length; i++) {
                console.log(i.toString() + "\t" + user.meetings[i].meetingID.toString());
                if (user.meetings[i].meetingID.toString() === meetingId.toString()) {
                    console.log("MEETING FOUND");
                    res.send(JSON.stringify(user.meetings[i].chatMessages));
                    break;
                }
            }
        } else {
            console.log("USER NOT FOND");
            res.send(":(")
        }
    });
})

app.post("/user-api/prevMeeting/delete", (req, res) => {
    console.log("---------------------------------------");
    console.log("PREV MEETING TO BE DELETED");
    var uid = req.body.userId;
    var meetingId = req.body.meetingId;
    userModel.findOne({
        commonId: uid
    }).populate("meetings").then(user => {
        console.log("USER FOUND");
        if (user) {
            for (var i = 0; i < user.meetings.length; i++) {
                console.log(i.toString() + "\t" + user.meetings[i].meetingID.toString());
                if (user.meetings[i].meetingID.toString() === meetingId.toString()) {
                    console.log("MEETING FOUND");
                    user.meetings.splice(i, 1);
                    user.save();
                    res.send("done");
                    break;
                }
            }
        } else {
            console.log("USER NOT FOND");
            res.send(":(")
        }
    });
});

// start http server at port 8000
console.log("PORT: " + process.env.SERVER_PORT);
console.log(typeof IS_LOCAL);
if (IS_LOCAL === 1) {
    try {
        https.listen(process.env.SERVER_PORT, () => {
            // log after server has started
            console.log("+--------------------------------------------------------+");
            console.log("|          Started HTTPS Server at port 5442             |");
            console.log("+--------------------------------------------------------+");
        });
    } catch (err) {
        console.log(err);
    }
} else {
    try {
        http.listen(process.env.SERVER_PORT, () => {
            // log after server has started
            console.log("+-------------------------------------------------------+");
            console.log("|          Started HTTP Server at port 5442             |");
            console.log("+-------------------------------------------------------+");
        });
    } catch (err) {
        console.log(err);
    }
}