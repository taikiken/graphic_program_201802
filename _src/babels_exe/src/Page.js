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

import {SearchFrom} from './header/SearchFrom';

import {CommentDelete} from './modal/CommentDelete';
import {Flush} from './modal/Flush';

let _symbol = Symbol();

// UT
let UT = self.UT;
let Dom = UT.app.Dom;

let Sagen = self.Sagen;

/**
 * <h3>ページ振り分け</h3>
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

    // scroll 位置調整
    window.addEventListener( 'load', Page.stick, false );
  }
  /**
   * scroll 位置を top に戻す
   */
  static stick():void {
    window.removeEventListener( 'load', Page.stick );
    //
    // if ( Sagen.Browser.IE.is() ) {
    //   // ie
    //   setTimeout( Page.ieStick, 200 );
    // } else {
    //   // not ie
    //   // setTimeout( window.scrollTo( 0, 0 ), 200 );
    //   setTimeout( Page.ieStick, 200 );
    // }
    // PC browser 全部
    setTimeout( Page.ieStick, 1 );
  }

  /**
   * 遷移時に上部張り付くになるようにする
   */
  static ieStick():void {
    // IE 11 動かないので animation してみる
    let whole = Dom.whole();
    whole.style.cssText = 'position: fixed: left: 0; top: 0; width: 100%;';
    UT.util.Scroll.motion( 0, 0.1, 0, null, function() {
      whole.style.cssText = '';
    } );
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
    SearchFrom.start();

    // Sidebar.start();
    Header.start();

    // event unbind
    Page.dispose();
  }
  /**
   * home, index page
   */
  static index():void {
    // page top
    PageTop.start();
    // search from
    SearchFrom.start();
    // index
    Index.start();
    // nav
    Nav.start( 'home' );

    // event unbind
    Page.dispose();
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
    SearchFrom.start();
    // category
    Category.start( slug, type );
    // nav
    Nav.start( slug );

    // event unbind
    Page.dispose();
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
    SearchFrom.start();
    // single
    Single.start( articleId );

    // event unbind
    Page.dispose();
  }
  /**
   * コメント詳細
   * @param {Object} event Router event object
   */
  static comment( event:Object ):void {

    // page top
    PageTop.start();
    // search from
    SearchFrom.start();

    Comment.user( 'comment', event.article, event.comment );

    // event unbind
    Page.dispose();
  }
  /**
   * コメント返信 詳細
   * @param {Object} event Router event object
   */
  static commentReply( event:Object ):void {

    // page top
    PageTop.start();
    // search from
    SearchFrom.start();

    Comment.user( 'reply', event.article, event.comment, event.article );

    // event unbind
    Page.dispose();
  }
  /**
   * 検索ページ
   * @param {Object} event Router.SEARCH event object
   */
  static search( event:Object ):void {
    // page top
    PageTop.start();
    // search from
    SearchFrom.start();

    Search.start( event.keyword );

    // event unbind
    Page.dispose();
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
    SearchFrom.start();

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
    SearchFrom.start();

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
    SearchFrom.start();

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
    SearchFrom.start();

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
    SearchFrom.start();

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
    SearchFrom.start();

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
    SearchFrom.start();
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
    SearchFrom.start();

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
