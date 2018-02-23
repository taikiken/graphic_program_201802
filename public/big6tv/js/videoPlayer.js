'use strict';

const result = document.querySelector('#placeHolder');
const accountId = '5704890303001';
const playerId  = 'r1Zn0fWf4f';
let playerHTML;
let scriptFlg = false;
let json = [];
let data = {
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
let getJson = () => {
  $.ajax({
	type:"GET",
    url: 'https://dev.sportsbull.jp/api/big6tv/live/2018s',
    cache: false,
    timeout: 10000
  }).then(
    (json) => {
		data.lastupdate = json.response.lastupdat;
		data.live.alt.large = json.response.live.alt.large;
		data.live.alt.medium = json.response.live.alt.medium;
		data.live.error.large = json.response.live.error.large;
		data.live.error.medium = json.response.live.error.medium;
		data.live.interval = json.response.live.interval;
		data.live.isPlaying = json.response.live.isPlaying;
		data.live.video.id = json.response.live.video.id;
		if (data.live.isPlaying) {
			let playerHTML = `<video id=\"myPlayerID\" class=\"video-js\" data-video-id=\"${data.live.video.id}\" data-account=\"${accountId}\" data-player=\"${playerId}\" data-embed=\"default\" controls width=\"728\" height=\"410\" >`;
			result.innerHTML = playerHTML;
			let scriptTag = document.createElement('script');
			scriptTag.src = `\/\/players.brightcove.net\/${accountId}\/${playerId}_default\/index.min.js`;
			if (!scriptFlg) {
				document.body.appendChild(scriptTag);
				scriptFlg= true
			}
			scriptTag.onload = callback;
			console.log(data.live.interval * 1000);
		} else {
			let liveBeforeImg = `<img src=\"${data.live.alt.large}\">`
			result.innerHTML = liveBeforeImg;
		}
    },
    () => {
      console.log('failed load')
	  let loadErrorImg = `<img src=\"${data.live.error.large}\">`;
	  result.innerHTML = loadErrorImg;
    }
  )
};

let callback = () => {
	videojs('myPlayerID').on('ads-ad-ended', function( evt ){
		let myPlayer = this;
		myPlayer.play();
	});
};

getJson();