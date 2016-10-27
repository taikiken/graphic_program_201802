/**
 * Copyright 2014 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Ads = function(adsUrl,videoUrl,widthVal,heightVal,poster) {
  this.placeholder = document.getElementById('ima-sample-placeholder');
  this.adsUrl = adsUrl;
  this.videoUrl = videoUrl;
  this.widthVal = widthVal;
  this.heightVal = heightVal;
  this.poster = poster;
  //this.placeholder.addEventListener('click', this.bind(this, this.init));
  //this.placeholder.setAttribute('style', 'background-image: url('+poster+');background-repeat:no-repeat;background-size:cover; width: '+widthVal+'px; height: '+heightVal+'px;');
  this.events = [
   google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
   google.ima.AdEvent.Type.CLICK,
   google.ima.AdEvent.Type.COMPLETE,
   google.ima.AdEvent.Type.FIRST_QUARTILE,
   google.ima.AdEvent.Type.LOADED,
   google.ima.AdEvent.Type.MIDPOINT,
   google.ima.AdEvent.Type.PAUSED,
   google.ima.AdEvent.Type.STARTED,
   google.ima.AdEvent.Type.THIRD_QUARTILE
 ];
};

Ads.prototype.init = function() {
  // Create the player
  this.createPlayer();
  this.player = videojs('content_video');

  // Initialize the IMA plugin
  var options = {
      id: 'content_video',
      adTagUrl: this.adsUrl,
      nativeControlsForTouch: false,
      showControlsForJSAds:false
    };
  this.player.ima(options,
      this.bind(this, this.adsManagerLoadedCallback));
  this.player.ima.initializeAdDisplayContainer();
  this.player.ima.requestAds();
  var adContainer = document.getElementById('content_video_ima-ad-container');
  adContainer.setAttribute('style', 'z-index: -1; position: absolute;');
  this.player.play();
};

Ads.prototype.createPlayer = function() {
  var dumbPlayer = document.createElement('video');
  dumbPlayer.id = 'content_video';
  dumbPlayer.className = 'video-js vjs-default-skin vjs-big-play-centered';
  dumbPlayer.setAttribute('width', this.widthVal);
  dumbPlayer.setAttribute('height', this.heightVal);
  dumbPlayer.setAttribute('poster', this.poster);
  var contentSrc = document.createElement('source');
  contentSrc.setAttribute('src', this.videoUrl);
  contentSrc.setAttribute('type', 'application/x-mpegURL');
  dumbPlayer.appendChild(contentSrc);
  this.placeholder.parentNode.appendChild(dumbPlayer);
  this.placeholder.parentNode.removeChild(this.placeholder);
}

Ads.prototype.adsManagerLoadedCallback = function() {
  for (var index = 0; index < this.events.length; index++) {
    this.player.ima.addEventListener(
        this.events[index],
        this.bind(this, this.onAdEvent));
  }
  this.player.ima.startFromReadyCallback();
};

Ads.prototype.onAdEvent = function(event) {
  if(event.type == google.ima.AdEvent.Type.LOADED){
    var adContainer = document.getElementById('content_video_ima-ad-container');
    adContainer.setAttribute('style', 'z-index: 99; position: absolute;');
  }
  if(event.type == google.ima.AdEvent.Type.ALL_ADS_COMPLETED){
    if(this.player.ima.currentAd.getAdPodInfo().getPodIndex() == -1) {
      var videoElement = $("#content_video_html5_api")[0];
      this.player.ima.onContentResumeRequested_();
      this.player.src(this.videoUrl);
    }
  }
};

Ads.prototype.bind = function(thisObj, fn) {
  return function() {
    fn.apply(thisObj, arguments);
  };
};
