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
var app = express();
var options = {
  key: fs.readFileSync("openvidukey.pem"),
  cert: fs.readFileSync("openviducert.pem"),
};
var http = require("http").createServer(options, app);
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
var codes = {};
var id_tracker = {};

app.use("/static", express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/home/home.html");
});

app.get("/create_new/", function (req, res) {
  res.sendFile(__dirname + "/public/create/create.html");
});
app.get("/join/", function (req, res) {
  res.render(__dirname + "/public/join/join.ejs");
});

app.post("/session/", (req, res) => {
  var name_client = req.body.name;
  var session_code = req.body.meeting_code;
  var objective = req.body.objective;
  var role = OpenViduRole.PUBLISHER;
  var serverData = JSON.stringify({ serverData: name_client });
  var tokenOptions = {
    data: serverData,
    role: role,
  };
  if (objective === "create") {
    var lowerCaseLetters = /[a-z]/g;
    var numbers = /[0-9]/g;
    console.log(session_code.match(lowerCaseLetters));
    console.log(session_code.match(numbers));
    console.log(session_code >= 8);
    if(session_code.match(lowerCaseLetters) && session_code.match(numbers) && session_code.length >= 8) {
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
          mapSessionNamesTokens[session_id] = [];
          codes[session_id] = session_code;
          session
            .generateToken(tokenOptions)
            .then((token) => {
              mapSessionNamesTokens[session_id].push(token);
              res.render(__dirname + "/public/session/session.ejs", {
                sessionName: session_id,
                token: token,
                nickName: name_client,
                userName: client_id,
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      res.redirect("/create_new/?wrong=password&name=" + name_client);
    }
  } else {
    var sessionName = req.body.meeting_id;
    var mySession = mapSessions[sessionName];
    if (session_code === codes[sessionName]) {
      var client_id = id_tracker[sessionName.toString()];
      id_tracker[sessionName.toString()] = id_tracker[sessionName.toString()] + 1;
      mySession
        .generateToken(tokenOptions)
        .then((token) => {
          mapSessionNamesTokens[sessionName].push(token);
          res.render(__dirname + "/public/session/session.ejs", {
            sessionId: mySession.getSessionId(),
            token: token,
            nickName: name_client,
            userName: client_id,
            sessionName: sessionName,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      res.redirect("/join/?wrong=meeting&name=" + name_client);
    }
  }
});

app.post("/leave-session", (req, res) => {
  var sessionName = req.body.sessionname;
  var token = req.body.token;
  var name_client = req.body.nickName;

  if (mapSessions[sessionName] && mapSessionNamesTokens[sessionName]) {
    var tokens = mapSessionNamesTokens[sessionName];
    var index = tokens.indexOf(token);
    if (index !== -1) {
      tokens.splice(index, 1);
    } else {
      console.log("Problems in the app server: the TOKEN wasn't valid");
      res.redirect("/");
    }
    if (tokens.length == 0) {
      delete mapSessions[sessionName];
    }
    res.redirect("/");
  } else {
    var msg = "Problems in the app server: the SESSION does not exist";
    res.redirect("/");
  }
});

http.listen(8000, () => {
  console.log("listening on *:8000");
});
