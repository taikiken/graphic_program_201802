/*!
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/05 - 20:33
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 * buildTime: @@buildTime
 */
// eslint-disable-next-line strict
'use strict';

// CRAZY ATHLETES 2.0 / 静的実装 #2325
// https://github.com/undotsushin/undotsushin/issues/2325
// `/api/v1/articles/category/crazy` から取得して表示する
//
// PC

// UT
/**
 * UT global object
 */
const UT = self.UT;

/**
 * 関連ニュースを出力します
 * @param {string} slug category slug
 */
const related = (slug) => {
  const element = UT.app.Dom.board();
  const elementMore = UT.app.Dom.boardMore();
  if (!element || !elementMore) {
    return;
  }
  // 関連ニュース出力
  const archive = new UT.sp.view.category.SPViewCategoryWithSlug(slug, element, elementMore);
  archive.start();
};

// /**
//  * div#widget-ranking-container
//  * @param {string} slug category slug
//  * @param {{}} [option={}] request class callback 引数
//  */
// const ranking = (slug, option = {}) => {
//   const element = UT.app.Dom.ranking();
//   // console.log('ranking', element);
//   if (!element) {
//     return;
//   }
//   // ranking
//   const archive = new UT.view.sidebar.ViewRanking(element, option, slug);
//   archive.start();
// };
//
// /**
//  * オススメ動画
//  * div#widget-recommend-container
//  * @param {string} slug category slug
//  * @param {{}} [option={}] request class callback 引数
//  */
// const video = (slug, option = {}) => {
//   const element = UT.app.Dom.video();
//   // console.log('video', element);
//   if (!element) {
//     return;
//   }
//   // videos
//   const archive = new UT.view.sidebar.ViewVideos(element, option, slug);
//   archive.start();
// };
//
// /**
//  * オススメ記事
//  * - `div#widget-recommend-list-container`
//  * @param {string} slug category slug
//  * @param {{}} [option={}] request class callback 引数
//  */
// const recommend = (slug, option = {}) => {
//   const element = UT.app.Dom.recommend();
//   // console.log('recommend', element);
//   if (!element) {
//     return;
//   }
//   // videos
//   const archive = new UT.view.sidebar.ViewRecommend(element, option, slug);
//   archive.start();
// };
//
// /**
//  * sidebar を出力します
//  * - オススメ記事
//  * - 人気の記事
//  * @param {string} slug category slug
//  */
// const sidebar = (slug) => {
//   ranking(slug);
//   video(slug);
//   recommend(slug);
// };

/**
 * local 開発に対応させるためリクエスト先を変更します
 * - local -> api `dev` 使用します
 */
const host = () => {
  const hostname = location.hostname;
  const local = hostname.indexOf('192.168.1.') !== -1 ||
    hostname.indexOf('undotsushin.local') !== -1 ||
    location.port === '8080';
  // リクエスト先を変更します
  if (local) {
    UT.app.App.develop();
  }
};

// ------------------------------
let $ = null;

/**
 * `p#js-pagetop` > `a` click event handler
 * scroll 位置を 0 まで animation させます
 * @param {Event} event click event
 */
const onClick = (event) => {
  event.preventDefault();
  $('html, body').animate({
    scrollTop: 0,
  }, 320, );
};

/**
 * page top button を活性化させます
 */
const pageTop = () => {
  const button = document.getElementById('js-page_top');
  if (!button) {
    return;
  }
  $ = window.jQuery;
  if (!$) {
    return;
  }
  $(button).on('click', onClick);
};

// crazy-athlete 関連ニュースを出力する
host();
related('crazy');
// sidebar('crazy');
pageTop();
