var sessionName = <%- JSON.stringify(sessionName) %>;
var token = <%- JSON.stringify(token) %>;
var nickName = <%- JSON.stringify(nickName) %>;

console.warn("Request of TOKEN gone WELL (TOKEN:" + token + ")");

OV = new OpenVidu();

session = OV.initSession();

session.on("streamCreated", (event) => {
  var subscriber = session.subscribe(event.stream, "video-container");
  subscriber.on("videoElementCreated", (event) => {
    appendUserData(event.element, subscriber.stream.connection);
  });
});

session.on("streamDestroyed", (event) => {
  removeUserData(event.stream.connection);
});

session
  .connect(token, { clientData: nickName })
  .then(() => {
    $("#session-title").text(sessionName);
    $("#join").hide();
    $("#session").show();

    if (isPublisher()) {
      var publisher = OV.initPublisher("video-container", {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: "640x480",
        frameRate: 30,
        insertMode: "APPEND",
        mirror: false,
      });

      publisher.on("videoElementCreated", (event) => {
    
        var userData = {
          nickName: nickName,
          userName: nickName,
        };
        initMainVideo(event.element, userData);
        appendUserData(event.element, userData);
        $(event.element).prop("muted", true);
      });

      session.publish(publisher);
    } else {
      console.warn("You don't have permissions to publish");
      initMainVideoThumbnail();
    }
  })
  .catch((error) => {
    console.warn(
      "There was an error connecting to the session:",
      error.code,
      error.message
    );
  });

function leaveSession() {
  session.disconnect();
}

function appendUserData(videoElement, connection) {
  var clientData;
  var serverData;
  var nodeId;
  if (connection.nickName) {

    clientData = connection.nickName;
    serverData = connection.userName;
    nodeId = "main-videodata";
  } else {
    clientData = JSON.parse(connection.data.split("%/%")[0]).clientData;
    serverData = JSON.parse(connection.data.split("%/%")[1]).serverData;
    nodeId = connection.connectionId;
  }
  var dataNode = document.createElement("div");
  dataNode.className = "data-node";
  dataNode.id = "data-" + nodeId;
  dataNode.innerHTML =
    '<p class="nickName">' +
    clientData +
    '</p><p class="userName">' +
    serverData +
    "</p>";
  videoElement.parentNode.insertBefore(dataNode, videoElement.nextSibling);
  addClickListener(videoElement, clientData, serverData);
}

function removeUserData(connection) {
  var userNameRemoved = $("#data-" + connection.connectionId);
  if (
    $(userNameRemoved).find("p.userName").html() ===
    $("#main-video p.userName").html()
  ) {
    cleanMainVideo();
  }
  $("#data-" + connection.connectionId).remove();
}

function removeAllUserData() {
  $(".data-node").remove();
}

function cleanMainVideo() {
  $("#main-video video").get(0).srcObject = null;
  $("#main-video p").each(function () {
    $(this).html("");
  });
}

function addClickListener(videoElement, clientData, serverData) {
  videoElement.addEventListener("click", function () {
    var mainVideo = $("#main-video video").get(0);
    if (mainVideo.srcObject !== videoElement.srcObject) {
      $("#main-video").fadeOut("fast", () => {
        $("#main-video p.nickName").html(clientData);
        $("#main-video p.userName").html(serverData);
        mainVideo.srcObject = videoElement.srcObject;
        $("#main-video").fadeIn("fast");
      });
    }
  });
}

function initMainVideo(videoElement, userData) {
  $("#main-video video").get(0).srcObject = videoElement.srcObject;
  $("#main-video p.nickName").html(userData.nickName);
  $("#main-video p.userName").html(userData.userName);
  $("#main-video video").prop("muted", true);
}

function initMainVideoThumbnail() {
  $("#main-video video").css(
    "background",
    "url('images/subscriber-msg.jpg') round"
  );
}

function isPublisher() {
  return userName.includes("publisher");
}
