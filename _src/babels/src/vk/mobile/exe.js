/**
 * Copyright (c) 2011-2018 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2018/04/19 - 12:49
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import Dom from '../../app/Dom';
// import ViewFlushModal from '../../view/modal/ViewFlushModal';
import SPViewAppBanner from '../../sp/view/SPViewAppBanner';
import SPViewHeaderSearch from '../../sp/view/header/SPViewHeaderSearch';
import SPViewHeaderUser from '../../sp/view/header/SPViewHeaderUser';
import SPPageTop from '../../sp/ui/SPPageTop';

// vk mobile 実行ファイル
/**
 * header
 */
const header = () => {
  const element = Dom.profile();
  if (element) {
    const view = new SPViewHeaderUser(element, {}, true);
    view.start();
  }
};

/**
 * 検索フォーム
 */
const search = () => {
  const element = Dom.search();
  const opener = Dom.searchOpener();
  if (element && opener) {
    const view = new SPViewHeaderSearch(element, opener, {}, true);
    view.start();
  }
};

/**
 * アプリケーションバナー
 */
const appBanner = () => {
  const element = Dom.appBanner();
  if (element) {
    SPViewAppBanner.init(element, true, true);
  }
};

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
 * page top 戻るアニメーション
 */
const pageTop = () => {
  // responsive 残骸で pageTop が 2 Element 存在することがある
  // #js-page_top を sp は優先にする
  // @since 2017-10-23
  const element = Dom.jsPageTop() || Dom.pageTop();
  if (element) {
    const ui = new SPPageTop(element);
    ui.start();
  }
};

/**
 * SP - vk 実行
 */
const mobile = () => {
  // page top
  pageTop();
  // // modal 準備
  // modalFlush();
  // app banner
  appBanner();
  // header
  header();
  // 検索フォーム
  search();
};

export default mobile();
