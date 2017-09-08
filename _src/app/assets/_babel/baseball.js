/*!
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/02/09 - 19:05
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @build 2017-08-31 18:34:12
 */
'use strict';

// baseball sidebar ranking

// UT

var UT = self.UT;
var Dom = UT.app.Dom;
var ViewRanking = UT.view.sidebar.ViewRanking;
var ViewVideos = UT.view.sidebar.ViewVideos;
var ViewRecommend = UT.view.sidebar.ViewRecommend;
var View = UT.view.View;

// init @see babels_exe Page.category

// --------------------------------
// callback
var didRanking = function didRanking() {
  var ad = Dom.adRanking();
  if (ad) {
    ad.style.cssText = 'display: block;';
  }
};

var didVideo = function didVideo() {
  var ad = Dom.adVideo();
  if (ad) {
    ad.style.cssText = 'display: block;';
  }
};

// --------------------------------
var ranking = function ranking() {
  // ranking
  var rankingElement = Dom.ranking();
  if (!rankingElement) {
    return;
  }
  var option = {};
  option[View.DID_MOUNT] = didRanking;
  var viewRanking = new ViewRanking(rankingElement, option, 'baseball');
  viewRanking.start();
};

var video = function video() {
  // video
  var videoElement = Dom.video();
  if (!videoElement) {
    return;
  }
  var option = {};
  option[View.DID_MOUNT] = didVideo;
  option[View.DID_MOUNT] = didVideo;
  var viewVideos = new ViewVideos(videoElement, option, 'baseball');
  viewVideos.start();
};

var recommend = function recommend() {
  // recommend
  var recommendElement = Dom.recommend();
  if (!recommendElement) {
    return;
  }
  var viewRecommend = new ViewRecommend(recommendElement, {}, 'baseball');
  viewRecommend.start();
};

ranking();
video();
recommend();