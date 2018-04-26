/*!
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2018/03/05 - 08:34
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @build @@buildTime
 */
'use strict';

// red-bull-crashed-ice-2018 sidebar ranking

// UT
const UT = self.UT;
const Dom = UT.app.Dom;
const ViewRanking = UT.view.sidebar.ViewRanking;
const ViewVideos = UT.view.sidebar.ViewVideos;
const ViewRecommend = UT.view.sidebar.ViewRecommend;
const View = UT.view.View;

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
  const viewRanking = new ViewRanking(rankingElement, option, 'actionsports');
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
  const viewVideos = new ViewVideos(videoElement, option, 'actionsports');
  viewVideos.start();
};

const recommend = () => {
  // recommend
  const recommendElement = Dom.recommend();
  if (!recommendElement) {
    return;
  }
  const viewRecommend = new ViewRecommend(recommendElement, {}, 'actionsports');
  viewRecommend.start();
};

ranking();
video();
recommend();
