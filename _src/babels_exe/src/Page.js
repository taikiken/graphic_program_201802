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
'use strict';

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

import {SearchFrom} from './header/SearchFrom';

import {CommentDelete} from './modal/CommentDelete';

import {Dom} from './dom/Dom';

let _symbol = Symbol();

// UT
let UT = self.UT;

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

      throw new Error( `Page is static Class. not use new Page().` );

    }
  }
  /**
   * Page 初期化, UT.app.Router event を listen します
   */
  static init():void {

    // user login check
    UT.app.User.init();

    // modal
    CommentDelete.start();

    // router
    let Router = UT.app.Router;
    let router = Router.factory();

    // index
    router.on( Router.INDEX, Page.index );
    // category
    router.on( Router.CATEGORY, Page.category );
    // single(detail|p)
    router.on( Router.SINGLE, Page.single );
    // search
    router.on( Router.SEARCH, Page.search );

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
    // router.on( Router.SETTING_SOCIAL, Page.social );

    // settings/deactivate
    router.on( Router.SETTING_DEACTIVATE, Page.deactivate );

    router.route();

    // page top
    let pageTop = new PageTop();
    pageTop.init();

    // search from
    SearchFrom.start();

  }
  /**
   * home, index page
   */
  static index():void {
    Index.start();
    Nav.start( 'home' );
  }
  /**
   * category page
   * @param {Object} event Router event object
   */
  static category( event:Object ):void {

    let slug = event.slug;
    let type = event.slugType;

    Category.start( slug, type );
    Nav.start( slug );

  }
  /**
   * single, detail page
   * @param {Object} event Router event object
   */
  static single( event ):void {

    let articleId = event.id;

    Single.start( articleId );

  }
  static comment():void {

  }
  /**
   * 検索ページ
   * @param {Object} event Router.SEARCH event object
   */
  static search( event ):void {

    Search.start( event.keyword );

  }
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
  }

  /**
   * logout
   */
  static logout():void {
    let logoutElement = Dom.logout();
    if ( logoutElement !== null ) {
      let logout = new UT.view.login.ViewLogout( logoutElement );
      logout.start();
    }
  }
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

    Sidebar.start();
    Header.start();

    if ( UT.app.User.sign ) {
      // login only
      UserProfile.start();
      Bookmarks.start();
    }

  }
  /**
   * マイページ / アクティビティーズ一覧
   */
  static activities():void {

    Sidebar.start();
    Header.start();

    if ( UT.app.User.sign ) {
      // login only
      UserProfile.start();
      Activities.start();
    }

  }
  /**
   * マイページ / お知らせ一覧
   */
  static notifications():void {

    Sidebar.start();
    Header.start();
    if ( UT.app.User.sign ) {
      // login only
      UserProfile.start();
      Notifications.start();
    }

  }
  // ------------------------------
  // settings 設定
  /**
   * 設定 基本情報設定
   */
  static settings():void {

    Sidebar.start();
    Header.start();

    if ( UT.app.User.sign ) {
      // login only
      Settings.account();
    }

  }
  /**
   * 設定 パーソナライズ設定 興味のある競技
   */
  static interest():void {

    Sidebar.start();
    Header.start();

    if ( UT.app.User.sign ) {
      // login only
      Settings.interest();
    }

  }
  ///**
  // * 設定 ソーシャル連携
  // */
  //static social():void {
  //  if ( !UT.app.User.sign ) {
  //    // not login
  //    return;
  //  }
  //
  //  Sidebar.start();
  //  Header.start();
  //
  //  Settings.social();
  //}
  /**
   * 退会
   */
  static deactivate():void {

    Sidebar.start();
    Header.start();

    if ( UT.app.User.sign ) {
      // login only
      Settings.deactivate();
    }

  }
}
