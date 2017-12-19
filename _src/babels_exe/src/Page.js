/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/15 - 21:16
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// ui
import PageTop from './ui/PageTop';
import Nav from './ui/Nav';
import FirstVisit from './ui/FirstVisit';
import Context from './ui/Context';

// page
import Index from './page/Index';
import Category from './page/Category';
import Single from './page/Single';
import Search from './page/Search';
import Signup from './page/Signup';
import UserProfile from './page/UserProfile';
import Sidebar from './page/Sidebar';
import Header from './page/Header';
import Bookmarks from './page/Bookmarks';
import Activities from './page/Activities';
import Notifications from './page/Notifications';
import Settings from './page/Settings';
import Comment from './page/Comment';
// since 2017-11-06
import SignupWow from './page/SignupWow';
// since 2017-12-18
import Announce from './page/Announce';

// headers
import SearchForm from './header/SearchForm';

// modal
import CommentDelete from './modal/CommentDelete';
import Flush from './modal/Flush';


// let _symbol = Symbol();
/**
 * scroll flag
 * @type {boolean}
 * @private
 */
let _scrolled = false;

/**
 * `Scroll.sticky` 戻り値 TweenLite insatnce
 * @type {?TweenLite}
 * @private
 */
let _tween = null;

// UT
/**
 * [library] - UT
 */
const UT = self.UT;
/**
 * [library] - UT.Dom
 * @type {Dom}
 */
const Dom = UT.app.Dom;

// let Sagen = self.Sagen;

/**
 * <p>ページ振り分けを行います</p>
 * <p>UT.app.Router instance を作成し routing を監視します<br>
 * url に沿ったページ作成 Class をコールします</p>
 * 全て static です
 */
export default class Page {
  // /**
  //  * static class です, instance を作成しません
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'Page is static Class. not use new Page().' );
  //
  //   }
  // }
  /**
   * Page 初期化, UT.app.Router event を listen します
   */
  static init() {
    // 右クリック禁止
    Context.disable();

    // page 上部に貼り付ける
    Page.bindScroll();
    // setTimeout(Page.reserveSticky, 25);
    // 2frame へ - 2017-12-04
    setTimeout(Page.reserveSticky, 32);

    // user login check
    UT.app.User.init();

    // modal
    // delete
    CommentDelete.start();
    // flush
    Flush.start();

    // router
    const Router = UT.app.Router;
    const router = Router.factory();

    Page.router = router;

    // index
    router.on(Router.INDEX, Page.index);
    // category
    router.on(Router.CATEGORY, Page.category);
    // single(detail|p)
    router.on(Router.SINGLE, Page.single);
    // search
    router.on(Router.SEARCH, Page.search);

    // comment
    router.on(Router.COMMENT, Page.comment);
    router.on(Router.COMMENT_REPLY, Page.commentReply);

    // 管理系
    // signup
    router.on(Router.SIGNUP, Page.signup);
    // login
    router.on(Router.LOGIN, Page.login);
    // logout
    router.on(Router.LOGOUT, Page.logout);
    /*
    // reset_password
    router.on( Router.RESET_PASSWORD, Page.password );
    // reset_password/resetting
    router.on( Router.RESET_PASSWORD_RESETTING, Page.passwordResetting );
    */
    // mypage
    router.on(Router.MYPAGE, Page.mypage);
    // mypage/activities
    router.on(Router.MYPAGE_ACTIVITIES, Page.activities);
    // notifications
    router.on(Router.NOTIFICATIONS, Page.notifications);
    // settings
    router.on(Router.SETTING, Page.settings);
    // settings/interest
    router.on(Router.SETTING_INTEREST, Page.interest);

    // settings/social
    router.on(Router.SETTING_SOCIAL, Page.social);

    // settings/deactivate
    router.on(Router.SETTING_DEACTIVATE, Page.deactivate);

    // 404
    router.on(Router.NOT_FOUND, Page.notFound);

    // area - from 2017-09-04
    router.on(Router.CATEGORY_AREA, Page.area);

    // signup-wow from 2017-11-06
    router.on(Router.SIGNUP_WOW, Page.signupWow);

    // parse
    router.route();
  }
  /**
   * scroll, wheel を監視し event が発生したら sticky をキャンセルする
   */
  static bindScroll() {
    // scroll event listen
    window.addEventListener('scroll', Page.onScroll, false);
    window.addEventListener('wheel', Page.onScroll, false);
    window.addEventListener('mousewheel', Page.onScroll, false);
    window.addEventListener('DOMMouseScroll', Page.onScroll, false);
    document.body.addEventListener('touchstart', Page.onTouchStart, false);
    document.body.addEventListener('touchend', Page.onTouchEnd, false);
  }
  /**
   * scroll, wheel 監視をキャンセルし
   * body style を空にする
   */
  static disposeScroll() {
    _scrolled = true;
    // load event unbind
    window.removeEventListener( 'load', Page.sticky );
    // scroll event unbind
    window.removeEventListener('scroll', Page.onScroll);
    window.removeEventListener('wheel', Page.onScroll);
    window.removeEventListener('mousewheel', Page.onScroll);
    window.removeEventListener('DOMMouseScroll', Page.onScroll);
    document.body.removeEventListener('touchstart', Page.onTouchStart);
    document.body.removeEventListener('touchmove', Page.onScroll);
    document.body.removeEventListener('touchend', Page.onTouchEnd);

    document.body.style.cssText = '';
    if (_tween !== null) {
      _tween.kill();
      _tween = null;
    }

  }
  /**
   * touchstart で touchmove 監視
   */
  static onTouchStart() {
    // console.log( 'onTouchStart', arguments );
    document.body.addEventListener('touchmove', Page.onScroll, false);
  }
  /**
   * touchend で touchmove 監視キャンセル
   */
  static onTouchEnd() {
    // console.log( 'onTouchEnd', arguments );
    document.body.removeEventListener('touchmove', Page.onScroll);
  }
  /**
   * scroll 関連 event handler
   */
  static onScroll() {
    Page.disposeScroll();
  }
  /**
   * window.onload での stickyを予約する
   */
  static reserveSticky() {
    window.addEventListener('load', Page.sticky, false);

    if (!_scrolled) {
      // fixed にして貼り付ける
      document.body.style.cssText = 'position: fixed; left: 0; top: 0; width: 100%;';
    }
  }
  /**
   * scroll 位置を top に戻す
   */
  static sticky() {
    window.removeEventListener('load', Page.sticky);
    // ユーザーがスクロールしたらキャンセルする
    if ( !_scrolled ) {
      _tween = UT.util.Scroll.sticky(0.1, 1, null, Page.disposeScroll, true);
    } else {
      Page.disposeScroll();
    }
  }
  /**
   * event unbind
   */
  static dispose() {
    let Router = UT.app.Router;
    let router = Page.router;

    // index
    router.off(Router.INDEX, Page.index);
    // category
    router.off(Router.CATEGORY, Page.category);
    // single(detail|p)
    router.off(Router.SINGLE, Page.single);
    // search
    router.off(Router.SEARCH, Page.search);

    // comment
    router.off(Router.COMMENT, Page.comment);
    router.off(Router.COMMENT_REPLY, Page.commentReply);

    // 管理系
    // signup
    router.off(Router.SIGNUP, Page.signup);
    // login
    router.off(Router.LOGIN, Page.login);
    // logout
    router.off(Router.LOGOUT, Page.logout);

    // mypage
    router.off(Router.MYPAGE, Page.mypage);
    // mypage/activities
    router.off(Router.MYPAGE_ACTIVITIES, Page.activities);
    // notifications
    router.off(Router.NOTIFICATIONS, Page.notifications);
    // settings
    router.off(Router.SETTING, Page.settings);
    // settings/interest
    router.off(Router.SETTING_INTEREST, Page.interest);

    // settings/social
    router.off(Router.SETTING_SOCIAL, Page.social);

    // settings/deactivate
    router.off(Router.SETTING_DEACTIVATE, Page.deactivate);

    // area
    router.off(Router.CATEGORY_AREA, Page.area);

    // 404
    router.off(Router.NOT_FOUND, Page.notFound);
    // signup-wow from 2017-11-06
    router.off(Router.SIGNUP_WOW, Page.signupWow);
  }
  /**
   * 404 not found
   */
  static notFound():void {
    // page top
    PageTop.start();
    // search from
    SearchForm.start();

    // Sidebar.start();
    Header.start();

    // event unbind
    Page.dispose();

    // first
    FirstVisit.start();
    // announce
    Announce.start('all');
  }
  /**
   * home, index page
   */
  static index() {
    // page top
    PageTop.start();
    // search from
    SearchForm.start();
    // index
    Index.start();
    // nav
    Nav.start('home');

    // event unbind
    Page.dispose();

    // first
    FirstVisit.start();
    // announce
    Announce.start('all');
  }
  /**
   * category page
   * @param {Object} event Router event object
   */
  static category(event) {
    const slug = event.slug;
    // const type = event.slugType;
    // page top
    PageTop.start();
    // search from
    SearchForm.start();
    // category
    // Category.start(slug, type);
    Category.start(slug);
    // nav
    Nav.start(slug);

    // event unbind
    Page.dispose();

    // first
    FirstVisit.start();
    // announce
    Announce.start(slug);
  }
  /**
   * single, detail page
   * @param {Object} event Router event object
   */
  static single(event) {
    const articleId = event.id;
    // page top
    PageTop.start();
    // search from
    SearchForm.start();
    // single
    Single.start(articleId);

    // event unbind
    Page.dispose();

    // first
    FirstVisit.start();
  }
  /**
   * コメント詳細
   * @param {Object} event Router event object
   */
  static comment(event) {
    // page top
    PageTop.start();
    // search from
    SearchForm.start();

    Comment.user('comment', event.article, event.comment);

    // event unbind
    Page.dispose();

    // first
    FirstVisit.start();
    // announce
    Announce.start('all');
  }
  /**
   * コメント返信 詳細
   * @param {Object} event Router event object
   */
  static commentReply(event) {
    // page top
    PageTop.start();
    // search from
    SearchForm.start();

    Comment.user('reply', event.article, event.comment, event.article);

    // event unbind
    Page.dispose();

    // first
    FirstVisit.start();
    // announce
    Announce.start('all');
  }
  /**
   * 検索ページ
   * @param {Object} event Router.SEARCH event object
   */
  static search(event) {
    // page top
    PageTop.start();
    // search from
    SearchForm.start();

    Search.start( event.keyword );

    // event unbind
    Page.dispose();

    // first
    FirstVisit.start();
    // announce
    Announce.start('all');
  }
  // ----------------------------------------------------
  // header, footer いらない
  /**
   * signup page
   */
  static signup() {
    Signup.start();
  }
  /**
   * signup-wow page
   * @since 2017-11-06
   */
  static signupWow() {
    SignupWow.start();
  }
  /**
   * login page
   */
  static login() {
    const loginElement = Dom.login();
    if (loginElement !== null) {
      const login = new UT.view.login.ViewLogin(loginElement);
      login.start();
    }

    // event unbind
    Page.dispose();
  }

  /**
   * logout
   */
  static logout() {
    // page top
    PageTop.start();
    // search from
    SearchForm.start();

    Sidebar.start();
    Header.start();

    if ( UT.app.User.sign ) {
      const logoutElement = Dom.logout();
      if (logoutElement !== null) {
        const logout = new UT.view.login.ViewLogout(logoutElement);
        logout.start();
      }
    }

    // event unbind
    Page.dispose();
  }
  // ----------------------------------------------------
  /*
  PHP で output
  static password():void {

  }
  static passwordResetting():void {

  }
  */
  // ------------------------------
  // my page
  /**
   * マイページ, index（ブックマーク一覧）
   */
  static mypage() {
    // page top
    PageTop.start();
    // search from
    SearchForm.start();

    Sidebar.start();
    Header.start();

    if (UT.app.User.sign) {
      // login only
      UserProfile.start();
      Bookmarks.start();
    }

    // event unbind
    Page.dispose();
  }
  /**
   * マイページ / アクティビティーズ一覧
   */
  static activities() {
    // page top
    PageTop.start();
    // search from
    SearchForm.start();

    Sidebar.start();
    Header.start();

    if (UT.app.User.sign) {
      // login only
      UserProfile.start();
      Activities.start();
    }

    // event unbind
    Page.dispose();
  }
  /**
   * マイページ / お知らせ一覧
   */
  static notifications() {
    // page top
    PageTop.start();
    // search from
    SearchForm.start();

    Sidebar.start();
    Header.start();
    if ( UT.app.User.sign ) {
      // login only
      UserProfile.start();
      Notifications.start();
    }

    // event unbind
    Page.dispose();
  }
  // ------------------------------
  // settings 設定
  /**
   * 設定 基本情報設定
   */
  static settings() {
    // page top
    PageTop.start();
    // search from
    SearchForm.start();

    Sidebar.start();
    Header.start();

    if (UT.app.User.sign) {
      // login only
      Settings.account();
    }

    // event unbind
    Page.dispose();
  }
  /**
   * 設定 パーソナライズ設定 興味のある競技
   */
  static interest() {
    // page top
    PageTop.start();
    // search from
    SearchForm.start();

    Sidebar.start();
    Header.start();

    if (UT.app.User.sign) {
      // login only
      Settings.interest();
    }

    // event unbind
    Page.dispose();
  }
  /**
   * 設定 ソーシャル連携
   */
  static social() {
    // page top
    PageTop.start();
    // search from
    SearchForm.start();
    Sidebar.start();
    Header.start();

    // event unbind
    Page.dispose();
  }
  /**
   * 退会
   */
  static deactivate() {
    // page top
    PageTop.start();
    // search from
    SearchForm.start();

    Sidebar.start();
    Header.start();

    if (UT.app.User.sign) {
      // login only
      Settings.deactivate();
    }

    // event unbind
    Page.dispose();
  }
  /**
   * 地域別記事 - category のように 表示
   * @param {Object} event Router event object
   * @since 2017-09-04
   */
  static area(event) {
    // like category
    const { mode, pref } = event;
    const slug = 'area';
    // console.log('Page.area', mode, slug, event);
    // page top
    PageTop.start();
    // search from
    SearchForm.start();
    // category
    Category.area(slug, mode, pref);
    // nav
    Nav.start(slug);

    // event unbind
    Page.dispose();

    // first
    FirstVisit.start();
    // announce
    Announce.start(slug);
  }
}
