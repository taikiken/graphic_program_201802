/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/16 - 15:59
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import { Safety } from '../data/Safety';
import VK from '../vk/VK';

// const _symbol = Symbol('Dom');

/**
 * React Dom を insert する起点 element を取得します
 * - `document.getElementById` で element を取得します
 * - 全て static です
 */
export default class Dom {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * 引数 id を使用し document.getElementById を行い element を取得します, 取得できない時は null を返します
   * @param {string} id 取得 element id
   * @return {?Element} id から取得した element を返します
   */
  static get(id) {
    const element = document.getElementById(id);
    if (!Safety.isElement(element)) {
      // console.warn( `element by ${id} not found.` );
      return null;
    }
    return element;
  }
  /**
   * **PC**
   * - body > .whole を取得します
   * - body > div#whole Element
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @return {?Element} whole element を返します
   */
  static whole(vk = false) {
    return Dom.get(`${VK.prefix(vk)}whole`);
  }
  /**
   * body > .whole を取得します
   * - SP -> #page
   * - PC -> #whole
   * body > div#page Element
   * @return {?Element} whole element を返します
   */
  static page() {
    return Dom.get('page');
  }
  /**
   * div#js-page_top - for sp
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @returns {?Element} div#js-page_top - for sp
   * @since 2017-10-23
   * @since 2018-04-19 vk header - flag 追加
   */
  static jsPageTop(vk = false) {
    return Dom.get(`${VK.prefix(vk)}js-page_top`);
  }
  /**
   * pageTop container
   * - 2017-08-24 - `#js-page_top` を使用しているページに対応するため取得 ID を増やす
   * - `pageTop`
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @return {?Element} pageTop element を返します
   * @since 2018-04-19 vk header - flag 追加
   */
  static pageTop(vk = false) {
    // return Dom.get('pageTop') || Dom.get('js-page_top');
    return Dom.get(`${VK.prefix(vk)}pageTop`) || Dom.jsPageTop(vk);
  }
  // --------------------------------------
  // header
  /**
   * main header コンテンツ上部
   * @return {?Element} header-container element を返します
   */
  static header() {
    return Dom.get('header-container');
  }
  /**
   * header user profile
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @return {?Element} 'user-profile-container' element を返します
   * @since 2018-04-19 vk header - flag 追加
   */
  static profile(vk = false) {
    return Dom.get(`${VK.prefix(vk)}user-profile-container`);
  }
  /**
   * header search from
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @return {?Element} head-search-container element を返します
   * @since 2018-04-19 vk header - flag 追加
   */
  static search(vk = false) {
    return Dom.get(`${VK.prefix(vk)}head-search-container`);
  }
  /**
   * header search from opener
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @return {?Element} search-container-opener element を返します
   * @since 2018-04-19 vk header - flag 追加
   */
  static searchOpener(vk = false) {
    return Dom.get(`${VK.prefix(vk)}search-container-opener`);
  }
  // --------------------------------------
  // footer
  /**
   * hooter
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @return {?Element} footer-container element を返します
   * @since 2018-04-19 vk header - flag 追加
   */
  static footer(vk = false) {
    return Dom.get(`${VK.prefix(vk)}footer-container`);
  }
  // --------------------------------------
  // synapse
  /**
   * synapse 切り替えメニュー
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @return {?Element} side-menu-service element を返します
   * @since 2018-04-19 vk header - flag 追加
   */
  static service(vk = false) {
    return Dom.get(`${VK.prefix(vk)}side-menu-service`);
  }
  /**
   * side メニュー
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @return {?Element} side-menu-container element を返します
   * @since 2018-04-19 vk header - flag 追加
   */
  static serviceMenu(vk = false) {
    return Dom.get(`${VK.prefix(vk)}side-menu-container`);
  }
  /**
   * side メニュー open / close button
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @return {?Element} menu-opener element を返します
   * @since 2018-04-19 vk header - flag 追加
   */
  static serviceOpener(vk = false) {
    return Dom.get(`${VK.prefix(vk)}menu-opener`);
  }

  // --------------------------------------
  // sidebar
  /**
   * sidebar ranking
   * @return {?Element} widget-ranking-container element を返します
   */
  static ranking() {
    return Dom.get('widget-ranking-container');
  }
  /**
   * sidebar video
   * @return {?Element} widget-recommend-container element を返します
   */
  static video() {
    return Dom.get('widget-recommend-container');
  }
  /**
   * sidebar ranking2
   * @return {?Element} widget-ranking-container-2 element を返します
   */
  static ranking2() {
    return Dom.get('widget-ranking-container-2');
  }
  /**
   * sidebar video2
   * @return {?Element} widget-recommend-container-2 element を返します
   */
  static video2() {
    return Dom.get('widget-recommend-container-2');
  }
  /**
   * sidebar scroll 追随させるコンテナ
   * @return {?Element} sidebar-moving-container element を返します
   */
  static sidebar() {
    return Dom.get('sidebar-moving-container');
  }
  /**
   * sidebar recommend
   * @since 2016-06-29
   * @return {?Element} widget-recommend-list-container element を返します
   */
  static recommend() {
    return Dom.get('widget-recommend-list-container');
  }
  // --------------------------------------

  // home
  /**
   * home slide show(pickup)
   * @return {?Element} pickup-container を返します
   */
  static pickup() {
    return Dom.get('pickup-container');
  }
  /**
   * home headline 注目の記事
   * @return {?Element} headline-container を返します
   */
  static headline() {
    return Dom.get('headline-container');
  }
  /**
   * home headline - last （大きく表示させる）
   * @returns {?Element} `div#js-headline-last-container` home headline - last
   * @since 2017-12-18
   */
  static headlineLast() {
    return Dom.get('js-headline-last-container');
  }
  /**
   * category headline 「注目の記事」
   * @return {?Element} div#js-headline を返します
   */
  static headlineParent() {
    return Dom.get('js-headline');
  }
  // archive / category
  /**
   * category container
   * @return {?Element} category-container を返します
   */
  static category() {
    return Dom.get('category-container');
  }
  /**
   * archive container
   * @return {?Element} board-container を返します
   */
  static board() {
    return Dom.get('board-container');
  }
  /**
   * archive container: more button
   * @return {?Element} board-container-more を返します
   */
  static boardMore() {
    return Dom.get('board-container-more');
  }

  // --------------------------------------
  // single
  /**
   * single 関連記事
   * @return {?Element} single-related-container を返します
   */
  static related() {
    return Dom.get('single-related-container');
  }
  /**
   * single 本文下, tag とか...
   * @return {?Element} single-footer-container を返します
   */
  static singleFooter() {
    return Dom.get('single-footer-container');
  }
  /**
   * single 本文上, title, 投稿者とか...
   * @return {?Element} single-header-container を返します
   */
  static singleHeader() {
    return Dom.get('single-header-container');
  }
  /**
   * single 本文上, メインビジュアル
   * @return {?Element} single-visual-container を返します
   */
  static visual() {
    return Dom.get('single-visual-container');
  }
  /**
   * single comment, 記事へのコメント
   * @return {?Element} comment-form-container を返します
   */
  static commentForm() {
    return Dom.get('comment-form-container');
  }
  /**
   * single comment, 自分のコメント
   * @return {?Element} comment-self-container を返します
   */
  static commentSelf() {
    return Dom.get('comment-self-container');
  }
  /**
   * single comment, 公式コメント
   * @return {?Element} comment-official-container を返します
   */
  static commentOfficial() {
    return Dom.get('comment-official-container');
  }
  /**
   * single comment, みんなのコメント
   * @return {?Element} comment-normal-container を返します
   */
  static commentNormal() {
    return Dom.get('comment-normal-container');
  }
  /**
   * single 記事 本文
   * @return {?Element} post-content-container を返します
   */
  static post() {
    return Dom.get('post-content-container');
  }
  /**
   * single 記事 本文 「続きを読む」
   * @return {?Element} post-content-read-more を返します
   */
  static readMore() {
    return Dom.get('post-content-read-more');
  }
  /**
   * 記事詳細のユーザーバナー
   * @return {?Element} post-content-banner を返します
   */
  static userBanner() {
    return Dom.get('post-content-banner');
  }
  // --------------------------------------
  // single/next
  /**
   * 記事詳細 > next container
   * @return {?Element} js-singles-container を返します
   */
  static singlesNext() {
    return Dom.get('js-singles-container');
  }
  /**
   * 記事詳細 > next + more container
   * @return {?Element} js-singles-more を返します
   */
  static singlesMore() {
    return Dom.get('js-singles-more');
  }
  // --------------------------------------
  /**
   * signup 新規登録
   * @return {?Element} signup-container を返します
   */
  static signup() {
    return Dom.get('signup-container');
  }
  /**
   * login form
   * @return {?Element} login-form-container を返します
   */
  static login() {
    return Dom.get('login-form-container');
  }
  /**
   * logout form
   * @return {?Element} logout-form-container を返します
   */
  static logout() {
    return Dom.get('logout-form-container');
  }
  /**
   * パスワードをリセットする メール入力
   * @return {?Element} reset_password-container
   */
  static password() {
    return Dom.get('reset_password-container');
  }
  /**
   * パスワードをリセットする パスワード入力
   * @return {?Element} reset_password-container
   */
  static passwordResetting() {
    return Dom.get('reset_password-resetting-container');
  }
  /**
   * modal
   * @return {?Element} modal-container
   */
  static modal() {
    return Dom.get('modal-container');
  }
  /**
   * logout modal
   * @return {?Element} logout-modal-container
   */
  static logoutModal() {
    return Dom.get('logout-modal-container');
  }
  /**
   * deactivate modal
   * @return {?Element} deactivate-modal-container
   */
  static deactivateModal() {
    return Dom.get('deactivate-modal-container');
  }
  /**
   * deactivate modal
   * @return {?Element} deactivate-modal-container
   */
  static flushModal() {
    return Dom.get('flush-modal-container');
  }

  // --------------------------------------
  // mypage
  /**
   * mypage ユーザー情報, SP お知らせ
   * @return {?Element} mypage-profile-container
   */
  static userProfile() {
    return Dom.get('mypage-profile-container');
  }
  /**
   * mypage ユーザー情報, SP mypage
   * SP はお知らせとmypage系で要件が違うため
   * @return {?Element} mypage-profile-container-extend
   */
  static userProfileEx() {
    return Dom.get('mypage-profile-container-extend');
  }
  // --------------------------------------
  // nav
  /**
   * main nav, category slug を設定するために
   * @return {?Element} global-nav-container
   */
  static nav() {
    return Dom.get('global-nav-container');
  }
  /**
   * SP nav inner
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @return {?Element} gnav-sec-inner
   */
  static navInner(vk = false) {
    return Dom.get(`${VK.prefix(vk)}gnav-sec-inner`);
  }
  /**
   * SP nav > ul#gnav-sec-list
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @return {?Element} gnav-sec-list
   */
  static navList(vk = false) {
    return Dom.get(`${VK.prefix(vk)}gnav-sec-list`);
  }
  // --------------------------------------
  // settings
  /**
   * 設定 form container
   * @return {?Element} setting-form-container
   */
  static settings() {
    return Dom.get('setting-form-container');
  }
  // --------------------------------------
  // sidebar ad for PC
  /**
   * sidebar ad, ranking
   * @return {?Element} sponsor-link-ranking
   */
  static adRanking() {
    return Dom.get('sponsor-link-ranking');
  }
  /**
   * sidebar ad, video
   * @return {?Element} sponsor-link-recommend
   */
  static adVideo() {
    return Dom.get('sponsor-link-recommend');
  }
  /**
   * sidebar ad, ranking 2
   * @return {?Element} sponsor-link-ranking-2
   */
  static adRanking2() {
    return Dom.get('sponsor-link-ranking-2');
  }
  /**
   * sidebar ad, video 2
   * @return {?Element} sponsor-link-recommend-2
   */
  static adVideo2() {
    return Dom.get('sponsor-link-recommend-2');
  }
  // // --------------------------------------
  // // 広告
  // // 記事詳細
  // static adSingleTop() {
  //   return Dom.get( 'single-top-sponsor-container' );
  // }
  // static adSidebarTop() {
  //   return Dom.get( 'sidebar-sponsor-top-container' );
  // }
  // static adSidebarBottom() {
  //   return Dom.get( 'sidebar-sponsor-bottom-container' );
  // }
  // --------------------------------------
  // SP category
  // tab 表示・非表示で class（category）を与えるために...
  /**
   * div.body-sec
   * - SP: tab 表示・非表示で class（category）を与えるために...
   * @return {?Element} div.body-sec
   */
  static bodySection() {
    return Dom.get('body-section');
  }
  // --------------------------------------
  // 記事詳細 / 「続きを読む」のリンク先に外部サイトも指定できるようにする #738
  /**
   * 記事詳細 / 「続きを読む」のリンク先に外部サイトも指定できるようにする #738
   * - ga するために a#readMore-external へのクリックで送信します
   * @return {?Element} a#readMore-external
   */
  static moreExternal() {
    return Dom.get('readMore-external');
  }

  // --------------------------------------
  // exe JS ID
  /**
   * exe 系 script tag の ID
   * @return {?Element} script tag #js-exe を返します
   */
  static jsExe() {
    return Dom.get('js-exe');
  }
  /**
   * script tag #js-exe の data-label 値を取得します
   * @return {string} script tag #js-exe の data-label 値を返します
   */
  static categoryLabel():string {
    const script = Dom.jsExe();
    if (script === null) {
      return '';
    }
    return script.dataset && script.dataset.label ? script.dataset.label : '';
  }

  // --------------------------------------
  // アプリバナー
  /**
   * アプリバナー格納 Element を取得します
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @return {?Element} div#js-header-appbnr-container
   * @since 2018-04-19 vk header - flag 追加
   */
  static appBanner(vk = false) {
    return Dom.get(`${VK.prefix(vk)}js-header-appbnr-container`);
  }
  // --------------------------------------
  // announce - 2017-12-18
  /**
   * 「お知らせ」表示コンテナ を取得します
   * @returns {Element} `div#js-announce-container`
   * @since 2017-12-18
   */
  static announce() {
    return Dom.get('js-announce-container');
  }
}
