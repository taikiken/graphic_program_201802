/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/09 - 18:36
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// ui
import SPPageTop from './ui/SPPageTop';
import SPNav from './ui/SPNav';
import SPSyn from './ui/SPSyn';
import SPFirstVisit from './ui/SPFirstVisit';
import SPAppBanner from './ui/SPAppBanner';

// page
import SPIndex from './page/SPIndex';
import SPCategory from './page/SPCategory';
import SPSingle from './page/SPSingle';
import SPSearch from './page/SPSearch';
import SPSignup from './page/SPSignup';
import SPUserProfile from './page/SPUserProfile';
import SPSidebar from './page/SPSidebar';
import SPHeader from './page/SPHeader';
import SPBookmarks from './page/SPBookmarks';
import SPActivities from './page/SPActivities';
import SPNotifications from './page/SPNotifications';
import SPSettings from './page/SPSettings';
import SPComment from './page/SPComment';
// since 2017-11-06
import SPSignupWow from './page/SPSignupWow';

// header
import SPSearchForm from './header/SPSearchForm';

// modal
import SPCommentDelete from './modal/SPCommentDelete';
import SPFlush from './modal/SPFlush';
import SPAnnounce from './page/SPAnnounce';

// const _symbol = Symbol();
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

/**
 * <p>ページ振り分けを行います</p>
 * <p>UT.app.Router instance を作成し routing を監視します<br>
 * url に沿ったページ作成 Class をコールします</p>
 * 全て static です
 */
export default class SPPage {
  // /**
  //  * static class です, instance を作成しません
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'SPPage is static Class. not use new SPPage().' );
  //
  //   }
  // }

  /**
   * Page 初期化, UT.app.Router event を listen します
   */
  static init() {
    // page 上部に貼り付ける
    SPPage.bindScroll();
    setTimeout(SPPage.reserveSticky, 25);

    // user login check
    UT.app.User.init();

    // modal
    SPCommentDelete.start();
    // flush
    SPFlush.start();
    // app banner
    SPAppBanner.start();

    // router
    const Router = UT.app.Router;
    const router = Router.factory();

    SPPage.router = router;

    // index
    router.on(Router.INDEX, SPPage.index);
    // category
    router.on(Router.CATEGORY, SPPage.category);
    // single(detail|p)
    router.on(Router.SINGLE, SPPage.single);
    // search
    router.on(Router.SEARCH, SPPage.search);

    // comment
    router.on(Router.COMMENT, SPPage.comment);
    router.on(Router.COMMENT_REPLY, SPPage.commentReply);

    // 管理系
    // signup
    router.on(Router.SIGNUP, SPPage.signup);
    // login
    router.on(Router.LOGIN, SPPage.login);
    // logout
    router.on(Router.LOGOUT, SPPage.logout);
    /*
     // reset_password
     router.on( Router.RESET_PASSWORD, SPPage.password );
     // reset_password/resetting
     router.on( Router.RESET_PASSWORD_RESETTING, SPPage.passwordResetting );
     */
    // mypage
    router.on(Router.MYPAGE, SPPage.mypage);
    // mypage/activities
    router.on(Router.MYPAGE_ACTIVITIES, SPPage.activities);
    // notifications
    router.on(Router.NOTIFICATIONS, SPPage.notifications);
    // settings
    router.on(Router.SETTING, SPPage.settings);
    // settings/interest
    router.on(Router.SETTING_INTEREST, SPPage.interest);

    // settings/social
    router.on(Router.SETTING_SOCIAL, SPPage.social);

    // settings/deactivate
    router.on(Router.SETTING_DEACTIVATE, SPPage.deactivate);

    // sp only /signup_login
    router.on(Router.SIGNUP_LOGIN, SPPage.signupLogin);

    // 404
    router.on(Router.NOT_FOUND, SPPage.notFound);

    // area - from 2017-09-04
    router.on(Router.CATEGORY_AREA, SPPage.area);

    // signup-wow from 2017-11-06
    router.on(Router.SIGNUP_WOW, SPPage.signupWow);

    router.route();

    window.addEventListener('load', SPPage.sticky, false);

    // let whole = Dom.page();
    // whole.style.cssText = 'position: fixed; left: 0; top: 0; width: 100%;';
    // document.body.style.cssText = 'position: fixed; left: 0; top: 0; width: 100%;';
  }
  /**
   * scroll, wheel を監視し event が発生したら sticky をキャンセルする
   */
  static bindScroll() {
    // scroll event listen
    window.addEventListener('scroll', SPPage.onScroll, false);
    window.addEventListener('wheel', SPPage.onScroll, false);
    window.addEventListener('mousewheel', SPPage.onScroll, false);
    window.addEventListener('DOMMouseScroll', SPPage.onScroll, false);
    document.body.addEventListener('touchstart', SPPage.onTouchStart, false);
    document.body.addEventListener('touchend', SPPage.onTouchEnd, false);
  }
  /**
   * scroll, wheel 監視をキャンセルし
   * body style を空にする
   */
  static disposeScroll() {
    _scrolled = true;
    // load event unbind
    window.removeEventListener('load', SPPage.sticky);
    // scroll event unbind
    window.removeEventListener('scroll', SPPage.onScroll);
    window.removeEventListener('wheel', SPPage.onScroll);
    window.removeEventListener('mousewheel', SPPage.onScroll);
    window.removeEventListener('DOMMouseScroll', SPPage.onScroll);
    document.body.removeEventListener('touchstart', SPPage.onTouchStart);
    document.body.removeEventListener('touchmove', SPPage.onScroll);
    document.body.removeEventListener('touchend', SPPage.onTouchEnd);

    document.body.style.cssText = '';
    if (_tween !== null) {
      _tween.kill();
      _tween = null;
    }
    // console.log( 'disposeScroll', _tween, document.body.style.cssText );

    // iOS Browser rendering bug で 真っ白になるの対策
    // 強制再描画させてる
    setTimeout(function() {
      window.scrollBy(0, 1);
    }, 0);
  }
  /**
   * touchstart で touchmove 監視
   */
  static onTouchStart() {
    // console.log( 'onTouchStart', arguments );
    document.body.addEventListener('touchmove', SPPage.onScroll, false);
  }
  /**
   * touchend で touchmove 監視キャンセル
   */
  static onTouchEnd() {
    // console.log( 'onTouchEnd', arguments );
    document.body.removeEventListener('touchmove', SPPage.onScroll);
  }
  /**
   * scroll 関連 event handler
   */
  static onScroll() {
    // console.log( 'onScroll', arguments );
    SPPage.disposeScroll();
  }
  /**
   * window.onload での stickyを予約する
   */
  static reserveSticky() {
    window.addEventListener('load', SPPage.sticky, false);
    
    if (!_scrolled) {
      // fixed にして貼り付ける
      document.body.style.cssText = 'position: fixed; left: 0; top: 0; width: 100%;';
    }
  }
  /**
   * scroll 位置を top に戻す
   */
  static sticky() {
    window.removeEventListener('load', SPPage.sticky);
    // console.log( 'sticky ', _scrolled );
    // ユーザーがスクロールしたらキャンセルする
    if (!_scrolled) {
      _tween = UT.util.Scroll.sticky(0.1, 1, null, SPPage.disposeScroll, true);
    } else {
      SPPage.disposeScroll();
    }
  }
  // /**
  //  * scroll 位置を top に戻す
  //  */
  // static sticky():void {
  //   window.removeEventListener( 'load', SPPage.sticky );
  //   // let whole = Dom.page();
  //   // whole.style.cssText = 'position: fixed: left: 0; top: 0; width: 100%;';
  //   // setTimeout( function() {
  //   //   // whole.style.cssText = '';
  //   //   // console.log( 'start scroll', whole );
  //   //   UT.util.Scroll.sticky( 0.1, 0.5, function() {
  //   //     whole.style.cssText = '';
  //   //     // console.log( 'end scroll', whole );
  //   //   } );
  //   // }, 25 );
  //   UT.util.Scroll.sticky( 1.0, 0.6, function() {
  //     document.body.style.cssText = '';
  //   }, function() {
  //     setTimeout( function() {
  //       window.scrollBy(0, 1);
  //     }, 0 );
  //   } );
  // }
  /**
   * event unbind
   */
  static dispose() {
    const Router = UT.app.Router;
    const router = SPPage.router;

    // index
    router.off(Router.INDEX, SPPage.index);
    // category
    router.off(Router.CATEGORY, SPPage.category);
    // single(detail|p)
    router.off(Router.SINGLE, SPPage.single);
    // search
    router.off(Router.SEARCH, SPPage.search);

    // comment
    router.off(Router.COMMENT, SPPage.comment);
    router.off(Router.COMMENT_REPLY, SPPage.commentReply);

    // 管理系
    // signup
    router.off(Router.SIGNUP, SPPage.signup);
    // login
    router.off(Router.LOGIN, SPPage.login);
    // logout
    router.off(Router.LOGOUT, SPPage.logout);

    // mypage
    router.off(Router.MYPAGE, SPPage.mypage);
    // mypage/activities
    router.off(Router.MYPAGE_ACTIVITIES, SPPage.activities);
    // notifications
    router.off(Router.NOTIFICATIONS, SPPage.notifications);
    // settings
    router.off(Router.SETTING, SPPage.settings);
    // settings/interest
    router.off(Router.SETTING_INTEREST, SPPage.interest);

    // settings/social
    router.off(Router.SETTING_SOCIAL, SPPage.social);

    // settings/deactivate
    router.off(Router.SETTING_DEACTIVATE, SPPage.deactivate);

    // sp only /signup_login
    router.off(Router.SIGNUP_LOGIN, SPPage.signupLogin);

    // 404
    router.off(Router.NOT_FOUND, SPPage.notFound);
    // area - from 2017-09-04
    router.off(Router.CATEGORY_AREA, SPPage.area);
    // signup-wow from 2017-11-06
    router.off(Router.SIGNUP_WOW, SPPage.signupWow);
  }
  /**
   * 404 not found
   */
  static notFound() {
    // console.log('SPPage.notFound');
    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();

    SPHeader.start();

    // syn.
    SPSyn.start();

    // event unbind
    SPPage.dispose();

    // first
    SPFirstVisit.start();
    // announce
    SPAnnounce.start('all');
  }
  /**
   * home, index page
   */
  static index() {
    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();
    // index
    SPIndex.start();
    // nav
    SPNav.start('home');
    // syn.
    SPSyn.start();

    // event unbind
    SPPage.dispose();

    // first
    SPFirstVisit.start();
    // announce
    SPAnnounce.start('all');
  }
  /**
   * category page
   * @param {Object} event Router event object
   */
  static category(event) {
    const slug = event.slug;
    // const type = event.slugType;
    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();
    // category
    // SPCategory.start(slug, type);
    SPCategory.start(slug);
    // nav
    SPNav.start(slug);
    // syn.
    SPSyn.start();

    // event unbind
    SPPage.dispose();

    // first
    SPFirstVisit.start();
    // announce
    SPAnnounce.start(slug);
  }
  /**
   * single, detail page
   * @param {Object} event Router event object
   */
  static single(event) {
    const articleId = event.id;
    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();
    // single
    SPSingle.start(articleId);
    // syn.
    SPSyn.start();

    // event unbind
    SPPage.dispose();

    // first
    SPFirstVisit.start();
  }
  /**
   * コメント詳細
   * @param {Object} event Router event object
   */
  static comment(event) {
    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();

    SPComment.user('comment', event.article, event.comment);
    // syn.
    SPSyn.start();

    // event unbind
    SPPage.dispose();

    // first
    SPFirstVisit.start();
    // announce
    SPAnnounce.start('all');
  }
  /**
   * コメント返信 詳細
   * @param {Object} event Router event object
   */
  static commentReply(event ) {
    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();

    SPComment.user('reply', event.article, event.comment, event.article);
    // syn.
    SPSyn.start();

    // event unbind
    SPPage.dispose();

    // first
    SPFirstVisit.start();
    // announce
    SPAnnounce.start('all');
  }
  /**
   * 検索ページ
   * @param {Object} event Router.SEARCH event object
   */
  static search(event) {
    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();

    SPSearch.start(event.keyword);
    // syn.
    SPSyn.start();

    // event unbind
    SPPage.dispose();

    // first
    SPFirstVisit.start();
    // announce
    SPAnnounce.start('all');
  }
  // ----------------------------------------------------
  // header, footer いらない
  /**
   * signup page
   */
  static signup() {
    SPSignup.start();
  }
  /**
   * signup-wow page
   * @since 2017-11-06
   */
  static signupWow() {
    SPSignupWow.start();
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
    SPPage.dispose();
  }

  /**
   * logout
   */
  static logout():void {
    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();

    SPSidebar.start();
    SPHeader.start();

    if (UT.app.User.sign) {
      const logoutElement = Dom.logout();
      if (logoutElement !== null) {
        const logout = new UT.view.login.ViewLogout(logoutElement);
        logout.start();
      }
    }
    // event unbind
    SPPage.dispose();
  }
  /**
   * signup_login
   */
  static signupLogin() {
    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();
    // header
    SPHeader.start();

    // syn.
    SPSyn.start();

    // event unbind
    SPPage.dispose();
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
    SPPageTop.start();
    // search from
    SPSearchForm.start();

    // SPSidebar.start();
    SPHeader.start();

    if ( UT.app.User.sign ) {
      // login only
      SPUserProfile.ext();
      SPBookmarks.start();
    }
    // syn.
    SPSyn.start();

    // event unbind
    SPPage.dispose();
  }
  /**
   * マイページ / アクティビティーズ一覧
   */
  static activities() {
    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();

    // SPSidebar.start();
    SPHeader.start();

    if ( UT.app.User.sign ) {
      // login only
      SPUserProfile.ext();
      SPActivities.start();
    }
    // syn.
    SPSyn.start();

    // event unbind
    SPPage.dispose();
  }
  /**
   * マイページ / お知らせ一覧
   */
  static notifications() {
    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();

    // SPSidebar.start();
    SPHeader.start();
    if ( UT.app.User.sign ) {
      // login only
      SPUserProfile.start();
      SPNotifications.start();
    }
    // syn.
    SPSyn.start();

    // event unbind
    SPPage.dispose();
  }
  // ------------------------------
  // settings 設定
  /**
   * 設定 基本情報設定
   */
  static settings() {
    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();

    // SPSidebar.start();
    SPHeader.start();

    if ( UT.app.User.sign ) {
      // login only
      SPSettings.account();
    }
    // syn.
    SPSyn.start();

    // event unbind
    SPPage.dispose();
  }
  /**
   * 設定 パーソナライズ設定 興味のある競技
   */
  static interest() {
    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();

    // SPSidebar.start();
    SPHeader.start();

    if ( UT.app.User.sign ) {
      // login only
      SPSettings.interest();
    }
    // syn.
    SPSyn.start();

    // event unbind
    SPPage.dispose();
  }
  /**
   * 設定 ソーシャル連携
   */
  static social() {
    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();

    // SPSidebar.start();
    SPHeader.start();
    // syn.
    SPSyn.start();

    // event unbind
    SPPage.dispose();
  }
  /**
   * 退会
   */
  static deactivate() {
    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();

    // SPSidebar.start();
    SPHeader.start();

    if ( UT.app.User.sign ) {
      // login only
      SPSettings.deactivate();
    }
    // syn.
    SPSyn.start();

    // event unbind
    SPPage.dispose();
  }
  /**
   * 地域別記事 - category のように 表示
   * @param {Object} event Router event object
   * @since 2017-09-04
   */
  static area(event) {
    // like category
    const { slug, mode, pref } = event;
    // const slug = 'area';
    // console.log('SPPage.area', mode, slug, event);
    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();
    // category
    SPCategory.area(slug, mode, pref);
    // nav
    SPNav.start(slug);
    // syn.
    SPSyn.start();

    // event unbind
    SPPage.dispose();

    // first
    SPFirstVisit.start();
    // announce
    SPAnnounce.start(slug);
  }
}
