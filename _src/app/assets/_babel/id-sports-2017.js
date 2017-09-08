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
 * @build @@buildTime
 */
'use strict';

// id-sports-2017

// UT
const UT = self.UT;
const Dom = UT.app.Dom;
const PageTop = UT.ui.PageTop;
const ViewRanking = UT.view.sidebar.ViewRanking;
const ViewVideos = UT.view.sidebar.ViewVideos;
const ViewRecommend = UT.view.sidebar.ViewRecommend;
const View = UT.view.View;

// init @see babels_exe Page.category
// page top
PageTop.start();

// --------------------------------
// callback
const didRanking = () => {
  const ad = Dom.adRanking();
  if (ad) {
    ad.style.cssText = 'display: block;';
  }
};

const didVideo = () => {
  const ad = Dom.adVideo();
  if (ad) {
    ad.style.cssText = 'display: block;';
  }
};

// --------------------------------
const ranking = () => {
  // ranking
  const rankingElement = Dom.ranking();
  if (!rankingElement) {
    return;
  }
  const option = {};
  option[View.DID_MOUNT] = didRanking;
  const viewRanking = new ViewRanking(rankingElement, option, 'all');
  viewRanking.start();
};

const video = () => {
  // video
  const videoElement = Dom.video();
  if (!videoElement) {
    return;
  }
  const option = {};
  option[View.DID_MOUNT] = didVideo;
  const viewVideos = new ViewVideos(videoElement, option, 'all');
  viewVideos.start();
};

const recommend = () => {
  // recommend
  const recommendElement = Dom.recommend();
  if (!recommendElement) {
    return;
  }
  const viewRecommend = new ViewRecommend(recommendElement, {}, 'all');
  viewRecommend.start();
};

ranking();
video();
recommend();

// ----------------------------------------
// window.onload `.js-animation` add `.fadein`

/**
 * `.js-animation` element へ `fadein` classname 追加します
 */
const fadein = () => {
  const elements = document.getElementsByClassName('js-animation');
  if (elements) {
    Array.from(elements).map((element) => (element.className += ' fadein'));
  }
};

/**
 * window.onload event handler
 * - fadein 実行
 */
const onLoad = () => {
  window.removeEventListener('load', onLoad);
  fadein();
};

window.addEventListener('load', onLoad, false);
