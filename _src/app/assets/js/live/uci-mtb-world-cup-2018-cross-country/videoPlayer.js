'use strict';

var api = void 0;
var pageUrl = location.href;
if (pageUrl.match(/sportsbull.s3/) || pageUrl.match(/localhost/)) {
	api = 'https://img.sportsbull.jp/static/redbull/redbull08live.json';
} else if (pageUrl.match(/dev.sportsbull.jp/)) {
	api = 'https://dev-img.sportsbull.jp/static/redbull/redbull08live.json';
} else if (pageUrl.match(/stg.sportsbull.jp/)) {
	api = 'https://dev-img.sportsbull.jp/static/redbull/redbull08live.json';
} else {
	api = 'https://img.sportsbull.jp/static/redbull/redbull08live.json';
}
var result = document.querySelector('#placeHolder');
var accountId = '5704890303001';
var playerId = 'rkkib09Tz';
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
	$.ajax({
		type: "GET",
		url: api,
		cache: false,
		timeout: 10000
	}).then(function (json) {
		data.lastupdate = json.response.lastupdat;
		data.live.alt.large = json.response.live.alt.large;
		data.live.alt.medium = json.response.live.alt.medium;
		data.live.error.large = json.response.live.error.large;
		data.live.error.medium = json.response.live.error.medium;
		data.live.interval = json.response.live.interval;
		data.live.isPlaying = json.response.live.isPlaying;
		data.live.video.id = json.response.live.video.id;
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
	}, function () {
		console.log('failed load');
		var loadErrorImg = '<img src="' + data.live.error.large + '">';
		result.innerHTML = loadErrorImg;
	});
};

var mountVideoDom = function mountVideoDom() {
	var playerHTML = '<video id="myPlayerID" class="video-js" data-video-id="' + data.live.video.id + '" data-account="' + accountId + '" data-player="' + playerId + '" data-embed="default" data-application-id controls >';
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
//# sourceMappingURL=videoPlayer.js.map
