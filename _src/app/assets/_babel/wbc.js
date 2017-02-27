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

// W侍 sidebar ranking

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
  const viewRanking = new ViewRanking(rankingElement, option, 'wbc');
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
  const viewVideos = new ViewVideos(videoElement, option, 'wbc');
  viewVideos.start();
};

const recommend = () => {
  // recommend
  const recommendElement = Dom.recommend();
  if (!recommendElement) {
    return;
  }
  const viewRecommend = new ViewRecommend(recommendElement, {}, 'wbc');
  viewRecommend.start();
};

ranking();
video();
recommend();
