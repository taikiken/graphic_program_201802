'use strict';

var myPlayer;
var playerHTML;
var videoId;
var accountId = '5704890303001';
var playerId = 'r1Zn0fWf4f';
var playerData = {
  'accountId': accountId,
  'playerId': playerId,
  'videoId': videoId
};

var getJson = function getJson() {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
      Response = eval("(" + req.response + ")");
      console.log(Response);
      videoId = Response.live.video.id;
      var playerData = { 'accountId': accountId, 'playerId': playerId, 'videoId': videoId };

      // Dynamically build the player video element
      playerHTML = '<video id=\"myPlayerID\" data-video-id=\"' + playerData.videoId + '\" data-account=\"' + playerData.accountId + '\" data-player=\"' + playerData.playerId + '\" data-embed=\"default\" class=\"video-js\" controls width=\"1090px\" height=\"613.13px\"></video>';
      // Inject the player code into the DOM
      document.getElementById('placeHolder').innerHTML = playerHTML;
      // Add and execute the player script tag
      var s = document.createElement('script');
      s.src = "//players.brightcove.net/" + playerData.accountId + "/" + playerData.playerId + "_default/index.min.js";
      // Add the script tag to the document
      document.body.appendChild(s);
      // Call a function to play the video once player's JavaScropt loaded
      s.onload = callback;
    }
  };
  req.open("GET", "/json/live.json", false);
  req.send(null);
};

// +++ Initialize the player and start the video +++
function callback() {
  myPlayer = videojs('myPlayerID');
  myPlayer.play();
};

window.onload = function () {
  getJson();
};
//# sourceMappingURL=videoPlayer.js.map
