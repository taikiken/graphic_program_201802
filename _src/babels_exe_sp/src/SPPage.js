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

import {SPPageTop} from './ui/SPPageTop';
import {SPNav} from './ui/SPNav';
import {SPSyn} from './ui/SPSyn';
import {SPFirstVisit} from './ui/SPFirstVisit';

import {SPIndex} from './page/SPIndex';
import {SPCategory} from './page/SPCategory';
import {SPSingle} from './page/SPSingle';
import {SPSearch} from './page/SPSearch';
import {SPSignup} from './page/SPSignup';
import {SPUserProfile} from './page/SPUserProfile';
import {SPSidebar} from './page/SPSidebar';
import {SPHeader} from './page/SPHeader';
import {SPBookmarks} from './page/SPBookmarks';
import {SPActivities} from './page/SPActivities';
import {SPNotifications} from './page/SPNotifications';
import {SPSettings} from './page/SPSettings';
import {SPComment} from './page/SPComment';

import {SPSearchForm} from './header/SPSearchForm';

import {SPCommentDelete} from './modal/SPCommentDelete';
import {SPFlush} from './modal/SPFlush';

let _symbol = Symbol();

let _scrolled:Boolean = false;

let _tween = null;

// UT
let UT = self.UT;
let Dom = UT.app.Dom;

export class SPPage {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( 'SPPage is static Class. not use new SPPage().' );

    }
  }

  /**
   * Page 初期化, UT.app.Router event を listen します
   */
  static init():void {

    // page 上部に貼り付ける
    SPPage.bindScroll();
    setTimeout( SPPage.reserveSticky, 25);

    // user login check
    UT.app.User.init();

    // modal
    SPCommentDelete.start();
    // flush
    SPFlush.start();

    // router
    let Router = UT.app.Router;
    let router = Router.factory();

    SPPage.router = router;

    // index
    router.on( Router.INDEX, SPPage.index );
    // category
    router.on( Router.CATEGORY, SPPage.category );
    // single(detail|p)
    router.on( Router.SINGLE, SPPage.single );
    // search
    router.on( Router.SEARCH, SPPage.search );

    // comment
    router.on( Router.COMMENT, SPPage.comment );
    router.on( Router.COMMENT_REPLY, SPPage.commentReply );

    // 管理系
    // signup
    router.on( Router.SIGNUP, SPPage.signup );
    // login
    router.on( Router.LOGIN, SPPage.login );
    // logout
    router.on( Router.LOGOUT, SPPage.logout );
    /*
     // reset_password
     router.on( Router.RESET_PASSWORD, SPPage.password );
     // reset_password/resetting
     router.on( Router.RESET_PASSWORD_RESETTING, SPPage.passwordResetting );
     */
    // mypage
    router.on( Router.MYPAGE, SPPage.mypage );
    // mypage/activities
    router.on( Router.MYPAGE_ACTIVITIES, SPPage.activities );
    // notifications
    router.on( Router.NOTIFICATIONS, SPPage.notifications );
    // settings
    router.on( Router.SETTING, SPPage.settings );
    // settings/interest
    router.on( Router.SETTING_INTEREST, SPPage.interest );

    // settings/social
    router.on( Router.SETTING_SOCIAL, SPPage.social );

    // settings/deactivate
    router.on( Router.SETTING_DEACTIVATE, SPPage.deactivate );

    // sp only /signup_login
    router.on( Router.SIGNUP_LOGIN, SPPage.signupLogin );

    // 404
    router.on( Router.NOT_FOUND, SPPage.notFound );

    router.route();

    window.addEventListener( 'load', SPPage.sticky, false );

    // let whole = Dom.page();
    // whole.style.cssText = 'position: fixed; left: 0; top: 0; width: 100%;';
    // document.body.style.cssText = 'position: fixed; left: 0; top: 0; width: 100%;';
  }
  /**
   * scroll, wheel を監視し event が発生したら sticky をキャンセルする
   */
  static bindScroll():void {
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
  static disposeScroll():void {
    _scrolled = true;
    // load event unbind
    window.removeEventListener( 'load', SPPage.sticky );
    // scroll event unbind
    window.removeEventListener('scroll', SPPage.onScroll);
    window.removeEventListener('wheel', SPPage.onScroll);
    window.removeEventListener('mousewheel', SPPage.onScroll);
    window.removeEventListener('DOMMouseScroll', SPPage.onScroll);
    document.body.removeEventListener('touchstart', SPPage.onTouchStart);
    document.body.removeEventListener('touchmove', SPPage.onScroll);
    document.body.removeEventListener('touchend', SPPage.onTouchEnd);

    document.body.style.cssText = '';
    if ( _tween !== null ) {
      _tween.kill();
      _tween = null;
    }
    // console.log( 'disposeScroll', _tween, document.body.style.cssText );

    // iOS Browser rendering bug で 真っ白になるの対策
    // 強制再描画させてる
    setTimeout( function() {
      window.scrollBy(0, 1);
    }, 0 );
  }
  /**
   * touchstart で touchmove 監視
   */
  static onTouchStart():void {
    // console.log( 'onTouchStart', arguments );
    document.body.addEventListener('touchmove', SPPage.onScroll, false);
  }
  /**
   * touchend で touchmove 監視キャンセル
   */
  static onTouchEnd():void {
    // console.log( 'onTouchEnd', arguments );
    document.body.removeEventListener('touchmove', SPPage.onScroll);
  }
  /**
   * scroll 関連 event handler
   */
  static onScroll():void {
    // console.log( 'onScroll', arguments );
    SPPage.disposeScroll();
  }
  /**
   * window.onload での stickyを予約する
   */
  static reserveSticky():void {
    window.addEventListener( 'load', SPPage.sticky, false );
    
    if (!_scrolled) {
      // fixed にして貼り付ける
      document.body.style.cssText = 'position: fixed; left: 0; top: 0; width: 100%;';
    }
  }
  /**
   * scroll 位置を top に戻す
   */
  static sticky():void {
    window.removeEventListener( 'load', SPPage.sticky );
    // console.log( 'sticky ', _scrolled );
    // ユーザーがスクロールしたらキャンセルする
    if ( !_scrolled ) {
      _tween = UT.util.Scroll.sticky( 0.1, 1, null, SPPage.disposeScroll, true );
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
  static dispose():void {
    let Router = UT.app.Router;
    let router = SPPage.router;

    // index
    router.off( Router.INDEX, SPPage.index );
    // category
    router.off( Router.CATEGORY, SPPage.category );
    // single(detail|p)
    router.off( Router.SINGLE, SPPage.single );
    // search
    router.off( Router.SEARCH, SPPage.search );

    // comment
    router.off( Router.COMMENT, SPPage.comment );
    router.off( Router.COMMENT_REPLY, SPPage.commentReply );

    // 管理系
    // signup
    router.off( Router.SIGNUP, SPPage.signup );
    // login
    router.off( Router.LOGIN, SPPage.login );
    // logout
    router.off( Router.LOGOUT, SPPage.logout );

    // mypage
    router.off( Router.MYPAGE, SPPage.mypage );
    // mypage/activities
    router.off( Router.MYPAGE_ACTIVITIES, SPPage.activities );
    // notifications
    router.off( Router.NOTIFICATIONS, SPPage.notifications );
    // settings
    router.off( Router.SETTING, SPPage.settings );
    // settings/interest
    router.off( Router.SETTING_INTEREST, SPPage.interest );

    // settings/social
    router.off( Router.SETTING_SOCIAL, SPPage.social );

    // settings/deactivate
    router.off( Router.SETTING_DEACTIVATE, SPPage.deactivate );

    // sp only /signup_login
    router.off( Router.SIGNUP_LOGIN, SPPage.signupLogin );

    // 404
    router.off( Router.NOT_FOUND, SPPage.notFound );
  }
  /**
   * 404 not found
   */
  static notFound():void {
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
  }
  /**
   * home, index page
   */
  static index():void {
    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();
    // index
    SPIndex.start();
    // nav
    SPNav.start( 'home' );
    // syn.
    SPSyn.start();

    // event unbind
    SPPage.dispose();

    // first
    SPFirstVisit.start();
  }
  /**
   * category page
   * @param {Object} event Router event object
   */
  static category( event:Object ):void {

    let slug = event.slug;
    let type = event.slugType;
    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();
    // category
    SPCategory.start( slug, type );
    // nav
    SPNav.start( slug );
    // syn.
    SPSyn.start();

    // event unbind
    SPPage.dispose();

    // first
    SPFirstVisit.start();
  }
  /**
   * single, detail page
   * @param {Object} event Router event object
   */
  static single( event:Object ):void {

    let articleId = event.id;
    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();
    // single
    SPSingle.start( articleId );
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
  static comment( event:Object ):void {

    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();

    SPComment.user( 'comment', event.article, event.comment );
    // syn.
    SPSyn.start();

    // event unbind
    SPPage.dispose();

    // first
    SPFirstVisit.start();
  }
  /**
   * コメント返信 詳細
   * @param {Object} event Router event object
   */
  static commentReply( event:Object ):void {

    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();

    SPComment.user( 'reply', event.article, event.comment, event.article );
    // syn.
    SPSyn.start();

    // event unbind
    SPPage.dispose();

    // first
    SPFirstVisit.start();
  }
  /**
   * 検索ページ
   * @param {Object} event Router.SEARCH event object
   */
  static search( event:Object ):void {
    // page top
    SPPageTop.start();
    // search from
    SPSearchForm.start();

    SPSearch.start( event.keyword );
    // syn.
    SPSyn.start();

    // event unbind
    SPPage.dispose();

    // first
    SPFirstVisit.start();
  }
  // ----------------------------------------------------
  // header, footer いらない
  /**
   * signup page
   */
  static signup():void {
    SPSignup.start();
  }
  /**
   * login page
   */
  static login():void {
    let loginElement = Dom.login();
    if ( loginElement !== null ) {
      let login = new UT.view.login.ViewLogin( loginElement );
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

    if ( UT.app.User.sign ) {
      let logoutElement = Dom.logout();
      if ( logoutElement !== null ) {
        let logout = new UT.view.login.ViewLogout( logoutElement );
        logout.start();
      }
    }

    // event unbind
    SPPage.dispose();
  }
  /**
   * signup_login
   */
  static signupLogin():void {
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
  static mypage():void {
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
  static activities():void {
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
  static notifications():void {
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
  static settings():void {
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
  static interest():void {
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
  static social():void {
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
  static deactivate():void {
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
}
