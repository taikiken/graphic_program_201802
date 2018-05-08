'use strict';
var api = void 0;
var pageUrl = location.href;
if (pageUrl.match(/sportsbull.s3/) || pageUrl.match(/localhost/) || pageUrl.match(/undotsushin.local/)) {
	api = '//dev.sportsbull.jp/api/v1/toj/live/';
} else if (pageUrl.match(/dev.sportsbull.jp/)) {
	api = '//dev.sportsbull.jp/api/v1/toj/live/';
} else if (pageUrl.match(/stg.sportsbull.jp/)) {
	api = '//stg.sportsbull.jp/api/big6tv/live/2018s';
} else {
	api = '//sportsbull.jp/api/big6tv/live/2018s';
}
var result = document.querySelector('#placeHolder');
var accountId = '5704890303001';
var playerId = 'HJytfVm3f';
var playerHTML = void 0;
var flg = true;
var initLoad = false;
var videoLoaded = false;
var json = [];
var data = {
	lastupdate: '',
	live: {
		alt: {
			large: '',
			medium: ''
		},
		error: {
			large: '',
			medium: ''
		},
		interval: '',
		isPlaying: false,
		video: {
			id: ''
		}
	}
};

var getJson = function getJson() {
	superagent
	.get(api)
	.end(function (err, res) {
		if(!res || err) {
			var loadErrorImg = '<img src="' + data.live.error.large + '">';
			result.innerHTML = loadErrorImg;
		} else {
			var json = res.body.response;
			data.lastupdate = json.lastupdat;
			data.live.alt.large = json.live.alt.large;
			data.live.alt.medium = json.live.alt.medium;
			data.live.error.large = json.live.error.large;
			data.live.error.medium = json.live.error.medium;
			data.live.interval = Number(json.live.interval);
			data.live.isPlaying = Number(json.live.isPlaying);
			data.live.video.id = json.live.video.id;
			if (!initLoad) {
				initLoad = true;
				setInterval(getJson, data.live.interval * 1000);
			}

			if (data.live.isPlaying) {
				if (!videoLoaded) {
					mountVideoDom();
					videoLoaded = true;
				}
			} else {
				var liveBeforeImg = '<img src="' + data.live.alt.large + '">';
				flg = data.live.isPlaying;
				result.innerHTML = liveBeforeImg;
				if (!flg) {
					videoLoaded = false;
					var videoScript = document.getElementById('videoScript');
					if (videoScript) {
						videoScript.remove();
					} else {
						console.log('no video script');
					}
				}
			}
		}
	});
};

var mountVideoDom = function mountVideoDom() {
	var playerHTML = '<video id="myPlayerID" class="video-js" poster="' + data.live.alt.large + '" data-video-id="' + data.live.video.id + '" data-account="' + accountId + '" data-player="' + playerId + '" data-embed="default" data-application-id controls >';
	result.innerHTML = playerHTML;
	var scriptTag = document.createElement('script');
	scriptTag.src = '//players.brightcove.net/' + accountId + '/' + playerId + '_default/index.min.js';
	scriptTag.id = 'videoScript';
	document.body.appendChild(scriptTag);
	scriptTag.onload = function () {
		callback();
		videojs('myPlayerID').ready(function () {
			var myPlayer = this;
			myPlayer.on('error', function () {
				var errorHTML = '<img src="' + data.live.error.large + '">';
				result.innerHTML = errorHTML;
				videoLoaded = false;
			});
		});
	};
};

var callback = function callback() {
	videojs('myPlayerID').on('ads-ad-ended', function (evt) {
		var myPlayer = this;
		myPlayer.play();
	});
};

var getUserAgent = function getUserAgent() {
	var ua = window.navigator.userAgent;
	if (!(ua === 'undotsushin-ios') && !(ua === 'undotsushin-android')) {
		getJson();
	};
};
getUserAgent();