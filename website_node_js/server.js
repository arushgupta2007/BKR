// Importing OpenVidu
var OpenVidu = require("openvidu-node-client").OpenVidu;
var OpenViduRole = require("openvidu-node-client").OpenViduRole;

// Workaround to a problem
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Other Imports
var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cookieSession = require("cookie-session");
var keys = require("./config/keys");
// MongoDB models
var userModel = require("./models/user_model")
var meetingsModel = require("./models/meeting_model");

// Connecting to local MongoDB
var mongoDB = 'mongodb://127.0.0.1/BKR';
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Initializing Express
var app = express();

// Starting http server with openvidu requirements
var options = {
    key: fs.readFileSync("openvidukey.pem"),
    cert: fs.readFileSync("openviducert.pem"),
};
var http = require("http").createServer(options, app);
var https = require('https').createServer(options, app);

// Using cookie-session as default cookie
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.cookie.encryptKey],
}))

// unknown
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

// setting view engine as ejs
app.set("view engine", "ejs");

// Connecting to Openvidu Server
var OPENVIDU_URL = keys.openvidu.url;
var OPENVIDU_SECRET = keys.openvidu.secret;
var OV = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);

// Storing all session objects in mapSessions Object
var mapSessions = {};

/* var mapSessionNamesTokens = {};
 var name_codes = {};
 var id_tracker = {}; */

// setting all files of public to be hosted on /static
app.use("/static", express.static("public"));

// helper functions
// function to delete meeting
function deleteMeeting(session_id, meeting) {
    //delete from mapSession
    delete mapSessions[session_id];
    // get users in meeting's user list in MongoDB
    usersArray = meeting.usersPrev;
    // delete this meeting from user's meeting list
    for (userId of usersArray) {
        /* userModel.deleteOne({_id: user}, function(err){}); */
        // find user in database with meeting in it's meeting list
        userModel.findOne({commonId: userId}, function (err, user) {
            if (err) {
                // log error if there
                console.log(err);                
            }
            // check if user exixts
            if (user) {
                // user exists
                // find index of current meeting in meeting's list
                var index_of_meeting = user.meetings.indexOf(session_id);
                // remove current meeting from meeting's list
                user.meetings.splice(index_of_meeting, 1);
                // save user to MongoDB database
                user.save();
            }
        })
    }
    // delete meeting from MongoDB database
    meetingsModel.deleteOne({meetingID: session_id}).catch((err, b, c) => {})
    console.log("DELETED MEETING");
}

// GET request to / (home page)
app.get("/", function (req, res) {
    console.log("RENDERING HOME PAGE");
    // render home ejs file
    res.render(__dirname + "/public/home/home.ejs");
});

// GET request to /create_new (create new meeting page)
app.get("/create_new/", function (req, res) {
    console.log("RENDERING CREATE MEETING PAGE");
    // render create_new ejs file
    res.render(__dirname + "/public/create/create.ejs");
});

// GET request to /join (join ongoing meeting page)
app.get("/join/", function (req, res) {
    console.log("RENDERING JOIN MEETING PAGE");
    // render join ongoing meeting ejs file
    res.render(__dirname + "/public/join/join.ejs");
});

// GET request to /join_us (sign in / sign up / log in)
app.get("/join_us/", function (req, res) {
    console.log("RENDERING JOIN US PAGE");
    // render join_us ejs file
    res.render(__dirname + "/public/join_us/join_us.ejs");
})

// GET request to /join_us/success (success of joining us above)
app.get("/join_us/success/", function (req, res) {
    console.log("RENDERING JOIN US SUCCESS PAGE");
    // render success of joining us ejs file
    res.render(__dirname + "/public/join_us/success/success.ejs");
})

// POST request to /join_us/addUser (adding user to MongoDB database)
app.post("/join_us/addUser/", function (req, res) {
    console.log("ADD USER CALLED");
    // find if there is existing user with same user id
    userModel.findOne({commonId: req.body.id_to_keep}, function(err, user) {
        if (err) {
            // log error if there
            console.log(err);
        }
        if (!user) {
            console.log("ADDING USER TO DATABASE");
            // no user found with same user id
            // saving user to database
            userModel({
                name: req.body.name,
                profilePhoto: req.body.photoUrl,
                phoneNo: req.body.phone_no,
                commonId: req.body.id_to_keep,
                meetings: []
            }).save().then(user => {
                console.log("USER HAS BEEN SUCCESSFULLY ADDED TO DATABASE");
            })
        }
    })
    // Send some dummy text back
    res.send("Bla");
})

// POST request to /session (meeting)
app.post("/session/", (req, res) => {
    console.log("ENTERED MEETING PAGE");
    // name of user
    var name_client = req.body.name;
    // code entered by user
    var session_code = req.body.meeting_code;
    // does user want to create new meeting or join exisiting meeting
    var objective = req.body.objective;
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
        },
    };
    // check objective of user
    if (objective === "create") {
        console.log("USER WANTS TO CREATE NEW MEETING");
        // what name should the meeting have
        var name_meeting = req.body.meeting_name;
        // creating filters to check if meeting code is secure
        var lowerCaseLetters = /[a-z]/g;
        var numbers = /[0-9]/g;
        // check if meeting code is secure
        if (session_code.match(lowerCaseLetters) && session_code.match(numbers) && session_code.length >= 8) {
            console.log("USER'S MEETING CODE IS SECURE");
            // meeting code is secure
            // create unique meeting id of length 10 digits
            var session_id;
            do {
                session_id = Math.floor(Math.random() * 10000000000);
            } while (session_id in mapSessions);

            /* id_tracker[session_id.toString()] = 0;
            var client_id = id_tracker[session_id.toString()];
            id_tracker[session_id.toString()] = 1; */

            // create OpenVidu session
            OV.createSession()
                .then((session) => {
                    console.log("SESSION CREATED");
                    // store session object to mapSessions
                    mapSessions[session_id] = session;
                    
                    /* mapSessionNamesTokens[session_id] = [];
                    name_codes[session_id] = {
                        name: name_meeting,
                        code: session_code,
                    }; */
                    
                    // generate token for user needed by OpenVidu
                    session
                        .generateToken(tokenOptions)
                        .then((token) => {
                            console.log("TOKEN GENERATED FOR FIRST PARICIPANT");
                            /* mapSessionNamesTokens[session_id].push(token); */
                            // save meeting to MongoDB 
                            console.log("SAVING MEETING TO DATABASE");
                            meetingsModel({
                                meetingID:session_id,
                                meetingName:name_meeting,
                                tokens:[token],
                                code: session_code,
                                next_id: 1,
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
                                    userModel.findOne({commonId: req.body.userId}, function (err, user) {
                                        // if user was found continue
                                        if (user) {
                                            console.log("FOUND USER");
                                            // user was found
                                            // check if that meeting aldready exists in user's meeting lis or not
                                            if (!user.meetings.includes(session_id)) {
                                                console.log("MEETING NOT IN MEETING LIST OF USER");
                                                // meeting does not exixt in user's meeting list
                                                // push meeting in user's meeting list
                                                user.meetings.push(session_id);
                                                // save user to MongoDB
                                                user.save();
                                                // store users in meeting's user list
                                                newMeeting.usersPrev.push(req.body.userId);
                                                // save meeting to MongoDB
                                                newMeeting.save();
                                                console.log("ADDED MEETING TO USER'S MEETING LIST AND USER TO MEETING'S USER LIST");
                                            }
                                        } else {
                                            // user was not found
                                            console.log("USER WAS NOT FOUND IN DATABASE BUT WAS SIGNED IN");
                                        }
                                    })
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
                                });
                            })                           
                        })
                        .catch((err) => console.log(err)); // log error if there
                })
                .catch((err) => console.log(err)); // log error if there
        } else {
            // password was too insecure
            // redirect user back to page with name and meeting name data, and showing the user a error
            console.log("PASSWORD TOO INSECURE");
            res.redirect("/create_new/?wrong=password&name=" + name_client + "&meeting_name=" + name_meeting);
        }
    } else {
        console.log("USER WANTS TO JOIN ONGOING MEETING");
        // user wants to join a ongoing meeting
        // get sessionId
        var sessionID = req.body.meeting_id;
        // find the meeting in MongoDB with that session id
        console.log("FINDING MEETING FROM MEETING ID");
        meetingsModel.findOne({meetingID: sessionID}).then((meetingToJoin) => {
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
                                userModel.findOne({commonId: req.body.userId}, function (err, user) {
                                    // check if user exists in the database
                                    if (user) {
                                        console.log("FOUND LOGGED IN USER IN DATABASE");
                                        // user exists
                                        // check if user's meeting list contains current meeting
                                        if (!user.meetings.includes(sessionID)) {
                                            console.log("MEETING NOT IN USER'S MEETING LIST");
                                            // user's meeting list does not have the current meeting
                                            // add current meeting to user's meeting list
                                            user.meetings.push(sessionID);
                                            // save chages done to user in MongoDB
                                            user.save();
                                            // push user to meeting'suser list
                                            newMeeting.usersPrev.push(req.body.userId);
                                            // save changes done to meeting in MongoDB
                                            newMeeting.save();
                                            console.log("ADDED MEETING IN USER'S MEETING LIST AND USER IN MEETING'S USER LIST");
                                        }
                                    } else {
                                        // user does not exists in database
                                        console.log("USER IS SIGNED IN BUT NOT FOUND IN DATABASE");
                                    }
                                })
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
                    res.redirect("/join/?wrong=meeting&name=" + name_client);
                }
            } else {
                // meeting does not exist in MongoDB database, meetingId was incorrect
                // redirect user to fill right values
                console.log("WRONG MEETING ID");
                res.redirect("/join/?wrong=meeting&name=" + name_client);
            }
        })

        /* if (name_codes[sessionID] !== undefined) {
             if (session_code === name_codes[sessionID].code) {
                 var client_id = id_tracker[sessionID.toString()];
                 id_tracker[sessionID.toString()] = id_tracker[sessionID.toString()] + 1;
                 mySession
                     .generateToken(tokenOptions)
                     .then((token) => {
                         mapSessionNamesTokens[sessionID].push(token);
                         res.render(__dirname + "/public/session/session.ejs", {
                             token: token,
                             nickName: name_client,
                             userName: client_id,
                             sessionName: sessionID,
                             meetingName: name_codes[sessionID].name,
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
         } */

    }
});


// POST request to /session/saveMessage (save the message to database)
app.post("/session/saveMessage/", (req,res) => {
    console.log("SAVING MESSAGE WITH DATA:" + req.body);    
    // get sessionId, from name, from account id, to, and message from req.body
    var data = req.body;
    // find meeting from data.sessionId
    meetingsModel.findOne({meetingID: data.sessionId}, function(err, meeting) {
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
    })
    res.send("Bla");
});

// POST request to /leave-session (leave the current session)
app.post("/leave-session", (req, res) => {
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
        meetingsModel.findOne({meetingID: sessionName}).then((meeting) => {
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
                    if (meeting_recv.tokens.length == 0) {
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
        })
    } else {
        // there was no session object in mapSession
        res.redirect("/");
    }
});

// start http server at port 8000
https.listen(8000, () => {
    // log after server has started
    console.log("Started Server at port 8000");
    console.log("Link: http://localhost:8000/");    
});