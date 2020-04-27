navigator.webkitGetUserMedia(
  { video: true, audio: false },
  function (stream) {
    var Peer = require("simple-peer");
    console.log(location.hash);

    var peer = new Peer({
      initiator: location.hash === "#1",
      trickle: false,
      stream: stream,
    });
    peer.on("signal", function (data) {
      document.getElementById("yourId").value = JSON.stringify(data);
    });

    document.getElementById("submit").addEventListener("click", function () {
      var otherId = JSON.parse(document.getElementById("otherId").value);
      peer.signal(otherId);
    });

    document.getElementById("send").addEventListener("click", function () {
      var yourmessage = document.getElementById("yourMessage").value;
      peer.send(yourmessage);
    });

    peer.on("data", function (data) {
      document.getElementById("messages").textContent += data + "\n";
    });
    peer.on("stream", function (stream) {
      var video = document.createElement("video");
      document.body.appendChild(video);
      video.srcObject = stream;
      video.play();
    });
  },
  function (err) {
    console.error(err);
  }
);
