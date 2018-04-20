/**
 * Copyright (c) 2011-2018 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2018/04/19 - 12:48
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import Dom from '../../app/Dom';
import ViewHeaderSearch from '../../view/header/ViewHeaderSearch';
// import ViewDeleteModal from '../../view/modal/ViewDeleteModal';
// import ViewFlushModal from '../../view/modal/ViewFlushModal';
import ViewHeaderUser from '../../view/header/ViewHeaderUser';
// import ViewLogoutModal from '../../view/modal/ViewLogoutModal';
import PageTop from '../../ui/PageTop';


// VK desktop 実行ファイル

/**
 * 検索フォーム - vk flag true 実行します
 */
const search = () => {
  const element = Dom.search(true);
  if (element) {
    // vk flag: true でリクエストする
    const view = new ViewHeaderSearch(element, {}, true);
    view.start();
  }
};

// ログインユーザー表示無しなので何もしない
// /**
//  * ログインユーザーのログアウトモーダル
//  */
// const modalLogout = () => {
//   const element = Dom.logoutModal();
//   if (element) {
//     const view = new ViewLogoutModal(element, null, null, true);
//     view.start();
//   }
// };

/**
 * ユーザーインフォメーション - vk flag true 実行します
 */
const header = () => {
  const element = Dom.profile(true);
  if (element) {
    const view = new ViewHeaderUser(element, {}, true);
    view.start();
    // modal
    // modalLogout();
  }
};

// /**
//  * コメント削除モーダル
//  */
// const modalDelete = () => {
//   const element = Dom.modal();
//   if (element) {
//     // vk flag: true でリクエストする
//     const view = new ViewDeleteModal(element, {}, true);
//     view.start();
//   }
// };

// API 叩かないので flush modal いらない
// /**
//  * 実行後の flush modal
//  */
// const modalFlush = () => {
//   const element = Dom.flushModal();
//   if (element) {
//     const view = new ViewFlushModal(element, {}, true);
//     view.start();
//   }
// };

/**
 * page top button - desktop - vk flag true 実行します
 */
const top = () => {
  // page top
  const pageTop = new PageTop(true);
  pageTop.init();
};

/**
 * vk - desktop 実行します
 */
const desktop = () => {
  top();
  // modal 準備
  // modalDelete();
  // modalFlush();
  // header - user
  header();
  // 検索フォーム
  search();
};

export default desktop;
