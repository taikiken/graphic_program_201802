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


import {PageTop} from './ui/PageTop';
import {Nav} from './ui/Nav';
import {FirstVisit} from './ui/FirstVisit';
import {Context} from './ui/Context';

import {Index} from './page/Index';
import {Category} from './page/Category';
import {Single} from './page/Single';
import {Search} from './page/Search';
import {Signup} from './page/Signup';
import {UserProfile} from './page/UserProfile';
import {Sidebar} from './page/Sidebar';
import {Header} from './page/Header';
import {Bookmarks} from './page/Bookmarks';
import {Activities} from './page/Activities';
import {Notifications} from './page/Notifications';
import {Settings} from './page/Settings';
import {Comment} from './page/Comment';

import {SearchForm} from './header/SearchForm';

import {CommentDelete} from './modal/CommentDelete';
import {Flush} from './modal/Flush';

let _symbol = Symbol();

let _scrolled:Boolean = false;

let _tween = null;

// UT
let UT = self.UT;
let Dom = UT.app.Dom;

// let Sagen = self.Sagen;

/**
 * <p>ページ振り分けを行います</p>
 * <p>UT.app.Router instance を作成し routing を監視します<br>
 * url に沿ったページ作成 Class をコールします</p>
 * 全て static です
 */
export class Page {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( 'Page is static Class. not use new Page().' );

    }
  }
  /**
   * Page 初期化, UT.app.Router event を listen します
   */
  static init():void {

    // 右クリック禁止
    Context.disable();

    // page 上部に貼り付ける
    Page.bindScroll();
    setTimeout( Page.reserveSticky, 25);
    
    // user login check
    UT.app.User.init();

    // modal
    // delete
    CommentDelete.start();
    // flush
    Flush.start();

    // router
    let Router = UT.app.Router;
    let router = Router.factory();

    Page.router = router;

    // index
    router.on( Router.INDEX, Page.index );
    // category
    router.on( Router.CATEGORY, Page.category );
    // single(detail|p)
    router.on( Router.SINGLE, Page.single );
    // search
    router.on( Router.SEARCH, Page.search );

    // comment
    router.on( Router.COMMENT, Page.comment );
    router.on( Router.COMMENT_REPLY, Page.commentReply );

    // 管理系
    // signup
    router.on( Router.SIGNUP, Page.signup );
    // login
    router.on( Router.LOGIN, Page.login );
    // logout
    router.on( Router.LOGOUT, Page.logout );
    /*
    // reset_password
    router.on( Router.RESET_PASSWORD, Page.password );
    // reset_password/resetting
    router.on( Router.RESET_PASSWORD_RESETTING, Page.passwordResetting );
    */
    // mypage
    router.on( Router.MYPAGE, Page.mypage );
    // mypage/activities
    router.on( Router.MYPAGE_ACTIVITIES, Page.activities );
    // notifications
    router.on( Router.NOTIFICATIONS, Page.notifications );
    // settings
    router.on( Router.SETTING, Page.settings );
    // settings/interest
    router.on( Router.SETTING_INTEREST, Page.interest );

    // settings/social
    router.on( Router.SETTING_SOCIAL, Page.social );

    // settings/deactivate
    router.on( Router.SETTING_DEACTIVATE, Page.deactivate );

    // 404
    router.on( Router.NOT_FOUND, Page.notFound );

    router.route();
  }
  /**
   * scroll, wheel を監視し event が発生したら sticky をキャンセルする
   */
  static bindScroll():void {
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
  static disposeScroll():void {
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
    if ( _tween !== null ) {
      _tween.kill();
      _tween = null;
    }

  }
  /**
   * touchstart で touchmove 監視
   */
  static onTouchStart():void {
    // console.log( 'onTouchStart', arguments );
    document.body.addEventListener('touchmove', Page.onScroll, false);
  }
  /**
   * touchend で touchmove 監視キャンセル
   */
  static onTouchEnd():void {
    // console.log( 'onTouchEnd', arguments );
    document.body.removeEventListener('touchmove', Page.onScroll);
  }
  /**
   * scroll 関連 event handler
   */
  static onScroll():void {
    Page.disposeScroll();
  }
  /**
   * window.onload での stickyを予約する
   */
  static reserveSticky():void {
    window.addEventListener( 'load', Page.sticky, false );

    if (!_scrolled) {
      // fixed にして貼り付ける
      document.body.style.cssText = 'position: fixed; left: 0; top: 0; width: 100%;';
    }
  }
  /**
   * scroll 位置を top に戻す
   */
  static sticky():void {
    window.removeEventListener( 'load', Page.sticky );
    // ユーザーがスクロールしたらキャンセルする
    if ( !_scrolled ) {
      _tween = UT.util.Scroll.sticky( 0.1, 1, null, Page.disposeScroll, true );
    } else {
      Page.disposeScroll();
    }
  }
  /**
   * event unbind
   */
  static dispose():void {
    let Router = UT.app.Router;
    let router = Page.router;

    // index
    router.off( Router.INDEX, Page.index );
    // category
    router.off( Router.CATEGORY, Page.category );
    // single(detail|p)
    router.off( Router.SINGLE, Page.single );
    // search
    router.off( Router.SEARCH, Page.search );

    // comment
    router.off( Router.COMMENT, Page.comment );
    router.off( Router.COMMENT_REPLY, Page.commentReply );

    // 管理系
    // signup
    router.off( Router.SIGNUP, Page.signup );
    // login
    router.off( Router.LOGIN, Page.login );
    // logout
    router.off( Router.LOGOUT, Page.logout );

    // mypage
    router.off( Router.MYPAGE, Page.mypage );
    // mypage/activities
    router.off( Router.MYPAGE_ACTIVITIES, Page.activities );
    // notifications
    router.off( Router.NOTIFICATIONS, Page.notifications );
    // settings
    router.off( Router.SETTING, Page.settings );
    // settings/interest
    router.off( Router.SETTING_INTEREST, Page.interest );

    // settings/social
    router.off( Router.SETTING_SOCIAL, Page.social );

    // settings/deactivate
    router.off( Router.SETTING_DEACTIVATE, Page.deactivate );

    // 404
    router.off( Router.NOT_FOUND, Page.notFound );
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
  }
  /**
   * home, index page
   */
  static index():void {
    // page top
    PageTop.start();
    // search from
    SearchForm.start();
    // index
    Index.start();
    // nav
    Nav.start( 'home' );

    // event unbind
    Page.dispose();

    // first
    FirstVisit.start();
  }
  /**
   * category page
   * @param {Object} event Router event object
   */
  static category( event:Object ):void {

    let slug = event.slug;
    let type = event.slugType;
    // page top
    PageTop.start();
    // search from
    SearchForm.start();
    // category
    Category.start( slug, type );
    // nav
    Nav.start( slug );

    // event unbind
    Page.dispose();

    // first
    FirstVisit.start();
  }
  /**
   * single, detail page
   * @param {Object} event Router event object
   */
  static single( event:Object ):void {

    let articleId = event.id;
    // page top
    PageTop.start();
    // search from
    SearchForm.start();
    // single
    Single.start( articleId );

    // event unbind
    Page.dispose();

    // first
    FirstVisit.start();
  }
  /**
   * コメント詳細
   * @param {Object} event Router event object
   */
  static comment( event:Object ):void {

    // page top
    PageTop.start();
    // search from
    SearchForm.start();

    Comment.user( 'comment', event.article, event.comment );

    // event unbind
    Page.dispose();

    // first
    FirstVisit.start();
  }
  /**
   * コメント返信 詳細
   * @param {Object} event Router event object
   */
  static commentReply( event:Object ):void {

    // page top
    PageTop.start();
    // search from
    SearchForm.start();

    Comment.user( 'reply', event.article, event.comment, event.article );

    // event unbind
    Page.dispose();

    // first
    FirstVisit.start();
  }
  /**
   * 検索ページ
   * @param {Object} event Router.SEARCH event object
   */
  static search( event:Object ):void {
    // page top
    PageTop.start();
    // search from
    SearchForm.start();

    Search.start( event.keyword );

    // event unbind
    Page.dispose();

    // first
    FirstVisit.start();
  }
  // ----------------------------------------------------
  // header, footer いらない
  /**
   * signup page
   */
  static signup():void {
    Signup.start();
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
    Page.dispose();
  }

  /**
   * logout
   */
  static logout():void {
    // page top
    PageTop.start();
    // search from
    SearchForm.start();

    Sidebar.start();
    Header.start();

    if ( UT.app.User.sign ) {
      let logoutElement = Dom.logout();
      if ( logoutElement !== null ) {
        let logout = new UT.view.login.ViewLogout( logoutElement );
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
  static mypage():void {
    // page top
    PageTop.start();
    // search from
    SearchForm.start();

    Sidebar.start();
    Header.start();

    if ( UT.app.User.sign ) {
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
  static activities():void {
    // page top
    PageTop.start();
    // search from
    SearchForm.start();

    Sidebar.start();
    Header.start();

    if ( UT.app.User.sign ) {
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
  static notifications():void {
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
  static settings():void {
    // page top
    PageTop.start();
    // search from
    SearchForm.start();

    Sidebar.start();
    Header.start();

    if ( UT.app.User.sign ) {
      // login only
      Settings.account();
    }

    // event unbind
    Page.dispose();
  }
  /**
   * 設定 パーソナライズ設定 興味のある競技
   */
  static interest():void {
    // page top
    PageTop.start();
    // search from
    SearchForm.start();

    Sidebar.start();
    Header.start();

    if ( UT.app.User.sign ) {
      // login only
      Settings.interest();
    }

    // event unbind
    Page.dispose();
  }
  /**
   * 設定 ソーシャル連携
   */
  static social():void {
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
  static deactivate():void {
    // page top
    PageTop.start();
    // search from
    SearchForm.start();

    Sidebar.start();
    Header.start();

    if ( UT.app.User.sign ) {
      // login only
      Settings.deactivate();
    }

    // event unbind
    Page.dispose();
  }
}
