var Peer = require("simple-peer");
var peer = new Peer({
  initiator: location.hash === "#1",
  trickle: false,
});

peer.on("signal", function (data) {
  document.getElementById("yourId").value = JSON.stringify(data);
});

document.getElementById("connect").addEventListener("click", function () {
  var otherId = JSON.parse(document.getElementById("otherId").value);
  peer.signal(otherId);
});

document.getElementById("send").addEventListener("click", function () {
  var yourmessage = document.getElementById("yourMessage").value;
  peer.send(yourmessage);
});

peer.on("data", function () {
  document.getElementById("messages").textContent += data + "\n";
});
