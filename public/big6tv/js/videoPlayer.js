'use strict';

var result = document.querySelector('#placeHolder');
var accountId = '5704890303001';
var playerId = 'r1Zn0fWf4f';
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
		url: 'https://dev.sportsbull.jp/api/big6tv/live/2018s',
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
			if (!flg) {
				location.reload();
			} else if (data.live.isPlaying && flg && !videoLoaded) {
				var _playerHTML = '<video id="myPlayerID" class="video-js" data-video-id="' + data.live.video.id + '" data-account="' + accountId + '" data-player="' + playerId + '" data-embed="default" controls width="728" height="410" >';
				result.innerHTML = _playerHTML;
				var scriptTag = document.createElement('script');
				scriptTag.src = '//players.brightcove.net/' + accountId + '/' + playerId + '_default/index.min.js';
				document.body.appendChild(scriptTag);
				scriptTag.onload = function () {
					callback();
				};
				videoLoaded = true;
			}
		} else {
			var liveBeforeImg = '<img src="' + data.live.alt.large + '">';
			flg = data.live.isPlaying;
			result.innerHTML = liveBeforeImg;
		}
	}, function () {
		console.log('failed load');
		var loadErrorImg = '<img src="' + data.live.error.large + '">';
		result.innerHTML = loadErrorImg;
	});
};

var callback = function callback() {
	videojs('myPlayerID').on('ads-ad-ended', function (evt) {
		var myPlayer = this;
		myPlayer.play();
	});
};

var getUserAgent = function getUserAgent() {
	var ua = window.navigator.userAgent;
	console.log(ua);
	if (ua === 'undotsushin-ios' || ua === 'undotsushin-android') {
		$('#VideoPlayer').hide();
	};
};
getJson();
getUserAgent();
//# sourceMappingURL=videoPlayer.js.map
