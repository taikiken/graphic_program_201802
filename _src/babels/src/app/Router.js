/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/31 - 18:03
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {EventDispatcher} from '../event/EventDispatcher';
import {User} from './User';
import {Loc} from '../util/Loc';

let _symbol = Symbol();
let _instance = null;

/**
 * <h3>location.pathnameから現在地を調べます</h3>
 * 全て static です
 */
export class Router extends EventDispatcher {
  /**
   * singleton class です。
   * **routing** を管理します
   * @example
   * var router = Router.factory();
   *
   * router.on( Router.INDEX, function() {} );
   * router.on( Router.SINGLE, function( event ) {
   *    console.log( event.id );// article id
   * } );
   *
   * router.route();
   *
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {Router} Router instance を返します
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( `Router is static Class. not use new Router(). instead Router.factory()` );

    }

    if ( _instance === null ) {
      super();
      this.init( _symbol );
      _instance = this;
    }
    return _instance;
  }
  /**
   * inner methodです。呼び出しできません
   * @param {Symbol} target private を担保する Symbol
   */
  init( target ):void {

    if ( _symbol !== target ) {
      throw new Error( `init is private method.` );
    }

    var _this = this;

    this._rule = {
      '/': _this.index,
      '/category/': _this.category.bind( _this ),
      '/p/': _this.single.bind( _this ),
      '/search/': _this.search.bind( _this ),
      '/signup/': _this.signup.bind( _this ),
      '/login/': _this.login.bind( _this ),
      '/logout/': _this.logout.bind( _this ),
      '/reset_password/': _this.password.bind( _this ),
      // '/reset_password/resetting': _this.passwordResetting,
      '/mypage/': _this.mypage.bind( _this ),
      // '/mypage/activities': _this.activities,
      '/notifications/': _this.notifications.bind( _this ),
      '/settings/': _this.settings.bind( _this )
      // '/settings/interest': _this.interest,
      // '/settings/social': _this.social,
      // '/settings/deactivate': _this.deactivate
    };
  }
  /**
   * <code>location.pathname</code> から経路探索を行います
   */
  route():void {
    let rule = this._rule;
    let path = Loc.path;
    let pathLength = path.length;
    let found = false;
    console.log( 'route ', path, pathLength );
    if ( pathLength !== 1 ) {

      for ( var key in rule ) {

        if ( rule.hasOwnProperty( key ) ) {

          var keyLength = key.length;

          if ( keyLength !== 1 ) {

            // not kyeLength 1,
            // 通常 key
            if ( path.substr( 0, keyLength ) === key ) {
              console.log( 'rote activate ', key );
              rule[ key ]();
              found = true;
              break;
            }
          }// keyLength

        }// hasOwnProperty

      }// for

    } else {

      // pathname length が 1 '/'
      this.index();
      found = true;

    }

    if ( !found ) {
      // path pattern に該当しない
      this.page404();
    }

  }
  /**
   * 404 not found event fire
   * @param {string} [where=''] 発火場所
   */
  page404( where:string = '' ):void {

    this.dispatch( { type: Router.NOT_FOUND, where: where } );

  }
  /**
   * 403 forbidden event fire
   * @param {string} [where=''] 発火場所
   */
  authorityError( where:string = '' ):void {

    this.dispatch( { type: Router.AUTHORITY_ERROR, where: where } );

  }
  /**
   * index (home) page
   */
  index():void {
    this.dispatch( { type: Router.INDEX } );
  }
  /**
   * category page
   */
  category():void {

    let [ slug, slugType ] = Loc.path.replace( '/category/', '' ).split('/');

    if ( slug.indexOf( '.html' ) !== -1 ) {
      slug = '';
    }

    if ( slug === '' ) {
      slug = 'all';
    }

    this.dispatch( { type: Router.CATEGORY, slug: slug, slugType: slugType } );
  }
  /**
   * single detail page
   */
  single():void {
    // comment, comment reply 振り分け
    let [ articleId, comment, commentId, replyId ] = Loc.path.replace( '/p/', '' ).split('/');

    if ( !!articleId && Number.isInteger( parseInt( articleId, 10 ) ) ) {

      // article Id 存在
      if ( comment === 'comment' ) {

        // in comment
        this.comment( articleId, commentId, replyId );

      } else {

        // single page
        this.dispatch( { type: Router.SINGLE, id: articleId } );

      }

    } else {

      // article Id ない
      this.page404( 'single' );

    }

  }
  /**
   * comment / comment reply page
   * @param {string} articleId article Id 記事 Id
   * @param {string} commentId comment Id
   * @param {string} [replyId=undefined] comment reply Id
   */
  comment( articleId:string, commentId:string, replyId:string ):void {

    // articleId 存在チェック済み
    if ( !!commentId && Number.isInteger( parseInt( commentId, 10 ) ) ) {

      if ( !!replyId && Number.isInteger( parseInt( replyId, 10 ) ) ) {

        // reply Id あり, comment reply page
        this.dispatch( { type: Router.COMMENT_REPLY, article: articleId, comment: commentId, reply: replyId } );

      } else {

        // reply Id なし, comment page
        this.dispatch( { type: Router.COMMENT, article: articleId, comment: commentId, reply: replyId } );

      }

    } else {

      // comment Id がない
      this.page404( 'comment' );

    }

  }
  /**
   * search 検索 page
   */
  search():void {

    let [ keyword ] = Loc.path.replace( '/search/', '' ).split('/');

    if ( !!keyword ) {

      this.dispatch( { type: Router.SEARCH, keyword: keyword } );

    } else {

      // keyword がない
      this.page404( 'search' );

    }

  }
  /**
   * signup / signup interest / signup account page
   */
  signup():void {

    /*
    let [ option ] = Loc.path.replace( '/signup/', '' ).split('/');

    if ( option === 'account' ) {

      // /signup/account/
      this.dispatch( { type: Router.SIGNUP_ACCOUNT } );

    } else if ( option === 'interest' ) {

      // /signup/interest/
      this.dispatch( { type: Router.SIGNUP_INTEREST } );

    } else {

      // /signup/
      this.dispatch( { type: Router.SIGNUP } );

    }
    */

    console.log( 'signup page in fired' );
    // URL 遷移しない
    // 1 page コンテンツ
    this.dispatch( { type: Router.SIGNUP } );

  }
  /**
   * login page
   */
  login():void {
    this.dispatch( { type: Router.LOGIN } );
  }

  /**
   * logout page
   */
  logout():void {
    this.dispatch( { type: Router.LOGOUT } );
  }

  /**
   * reset_password page
   */
  password():void {

    let [ option ] = Loc.path.replace( '/reset_password/', '' ).split('/');

    if ( option === 'resetting' ) {

      this.passwordResetting();

    } else {

      this.dispatch( { type: Router.RESET_PASSWORD } );

    }
  }

  /**
   * reset_password resetting page
   */
  passwordResetting():void {

    this.dispatch( { type: Router.RESET_PASSWORD_RESETTING } );

  }
  /**
   * mypage
   */
  mypage():void {

    let [ activities ] = Loc.path.replace( '/mypage/', '' ).split('/');

    if ( activities === 'activities' ) {

      this.activities();

    } else {

      if ( User.sign ) {

        this.dispatch( { type: Router.MYPAGE } );

      } else {

        this.authorityError( 'mypage' );

      }

    }

  }
  /**
   * mypage activities page
   */
  activities():void {

    if ( User.sign ) {

      this.dispatch( { type: Router.MYPAGE_ACTIVITIES } );

    } else {

      this.authorityError( 'activities' );

    }

  }
  /**
   * notifications page
   */
  notifications():void {

    if ( User.sign ) {

      this.dispatch( { type: Router.NOTIFICATIONS } );

    } else {

      this.authorityError( 'notifications' );

    }

  }
  /**
   * settings page
   */
  settings():void {

    let [ option ] = Loc.path.replace( '/settings/', '' ).split('/');

    switch ( option ) {

      case 'interest':
        this.interest();
        break;

      case 'social':
        this.social();
        break;

      case 'deactivate':
        this.deactivate();
        break;

      default:
        if ( User.sign ) {
          this.dispatch( { type: Router.SETTING } );
        } else {
          this.authorityError( 'setting' );
        }
        break;

    }

  }
  /**
   * settings interest page
   */
  interest():void {
    if ( User.sign ) {
      this.dispatch( { type: Router.SETTING_INTEREST } );
    } else {
      this.authorityError( 'interest' );
    }
  }
  /**
   * settings social page
   */
  social():void {
    if ( User.sign ) {
      this.dispatch( { type: Router.SETTING_SOCIAL } );
    } else {
      this.authorityError( 'social' );
    }
  }
  /**
   * settings deactivate page
   */
  deactivate():void {
    if ( User.sign ) {
      this.dispatch( { type: Router.SETTING_DEACTIVATE } );
    } else {
      this.authorityError( 'deactivate' );
    }
  }
  // ---------------------------------------------------
  //  const
  // ---------------------------------------------------
  /**
   * event type NOT_FOUND
   * @return {string} NOT_FOUND を返します
   */
  static get NOT_FOUND():string {
    return 'routeNotFound';
  }
  /**
   * event type AUTHORITY_ERROR
   * @return {string} AUTHORITY_ERROR を返します
   */
  static get AUTHORITY_ERROR():string {
    return 'routeAuthorityError';
  }
  /**
   * event type INDEX
   * @return {string} INDEX を返します
   */
  static get INDEX():string {
    return 'routeIndex';
  }
  /**
   * event type CATEGORY
   * @return {string} CATEGORY を返します
   */
  static get CATEGORY():string {
    return 'routeCategory';
  }
  /**
   * event type SINGLE
   * @return {string} SINGLE を返します
   */
  static get SINGLE():string {
    return 'routeSingle';
  }
  /**
   * event type COMMENT
   * @return {string} COMMENT を返します
   */
  static get COMMENT():string {
    return 'routeComment';
  }
  /**
   * event type COMMENT_REPLY
   * @return {string} COMMENT_REPLY を返します
   */
  static get COMMENT_REPLY():string {
    return 'routeCommentReply';
  }
  /**
   * event type SEARCH
   * @return {string} SEARCH を返します
   */
  static get SEARCH():string {
    return 'routeSearch';
  }
  /**
   * event type SIGNUP
   * @return {string} SIGNUP を返します
   */
  static get SIGNUP():string {
    return 'routeSignup';
  }
  /**
   * event type SIGNUP_ACCOUNT
   * @return {string} SIGNUP_ACCOUNT を返します
   */
  static get SIGNUP_ACCOUNT():string {
    return 'routeSignupAccount';
  }
  /**
   * event type SIGNUP_INTEREST
   * @return {string} SIGNUP_INTEREST を返します
   */
  static get SIGNUP_INTEREST():string {
    return 'routeSignupInterest';
  }
  /**
   * event type LOGIN
   * @return {string} LOGIN を返します
   */
  static get LOGIN():string {
    return 'routeLogin';
  }
  /**
   * event type LOGOUT
   * @return {string} LOGOUT を返します
   */
  static get LOGOUT():string {
    return 'routeLogout';
  }
  /**
   * event type RESET_PASSWORD
   * @return {string} RESET_PASSWORD を返します
   */
  static get RESET_PASSWORD():string {
    return 'routeResetPassword';
  }
  /**
   * event type RESET_PASSWORD_RESETTING
   * @return {string} RESET_PASSWORD_RESETTING を返します
   */
  static get RESET_PASSWORD_RESETTING():string {
    return 'routeResetPasswordResetting';
  }
  /**
   * event type MYPAGE
   * @return {string} MYPAGE を返します
   */
  static get MYPAGE():string {
    return 'routeMypage';
  }
  /**
   * event type MYPAGE_ACTIVITIES
   * @return {string} MYPAGE_ACTIVITIES を返します
   */
  static get MYPAGE_ACTIVITIES():string {
    return 'routeMypageActivities';
  }
  /**
   * event type NOTIFICATIONS
   * @return {string} NOTIFICATIONS を返します
   */
  static get NOTIFICATIONS():string {
    return 'routeNotifications';
  }
  /**
   * event type SETTING
   * @return {string} SETTING を返します
   */
  static get SETTING():string {
    return 'routeSetting';
  }
  /**
   * event type SETTING_INTEREST
   * @return {string} SETTING_INTEREST を返します
   */
  static get SETTING_INTEREST():string {
    return 'routeSettingInterest';
  }
  /**
   * event type SETTING_SOCIAL
   * @return {string} SETTING_SOCIAL を返します
   */
  static get SETTING_SOCIAL():string {
    return 'routeSettingSocial';
  }
  /**
   * event type SETTING_DEACTIVATE
   * @return {string} SETTING_DEACTIVATE を返します
   */
  static get SETTING_DEACTIVATE():string {
    return 'routeSettingDeactivate';
  }
  // ---------------------------------------------------
  //  static method
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {Router} Router instance を返します
   */
  static factory():Router {

    if ( _instance === null ) {

      _instance = new Router( _symbol );

    }

    return _instance;
  }
  // ---------------------------------------------------
  //  deprecated, 以下互換のために残します
  //  ToDo: 問題ないことが確認できたら削除する
  // ---------------------------------------------------
  /**
   * category page かを調べます
   * @return {boolean} category page なら true を返します
   */
  static isCategory():boolean {
    return Loc.path.substr(1, 9) === 'category/';
  }
  /**
   * single page かを調べます
   * @return {boolean} single page なら true を返します
   */
  static isSingle():boolean {
    if ( Loc.path.substr(1, 2) === 'p/' ) {
      let split = Loc.path.replace( '/p/', '' ).split( '/' );
      if ( Loc.isLocal() ) {
        split.pop();
      }
      return split.length === 1;
    }
  }
  /**
   * comment page かを調べます
   * @return {boolean} comment page なら true を返します
   */
  static isComment():boolean {
    if ( Loc.path.substr(1, 2) === 'p/' ) {
      let split = Loc.path.replace( '/p/', '' ).split( '/' );
      if ( Loc.isLocal() ) {
        split.pop();
      }
      if ( split.length > 1 && split[ 1 ] === 'comment' ) {
        return split.length === 3;
      }
    }
  }
  /**
   * comment replay page かを調べます
   * @return {boolean} comment replay page なら true を返します
   */
  static isReply():boolean {
    if ( Loc.path.substr(1, 2) === 'p/' ) {
      let split = Loc.path.replace( '/p/', '' ).split( '/' );
      if ( Loc.isLocal() ) {
        split.pop();
      }
      if ( split.length > 1 && split[ 1 ] === 'comment' ) {
        return split.length === 4;
      }
    }
  }
  /**
   * search page かを調べます
   * @return {boolean} search page なら true を返します
   */
  static isSearch():boolean {
    return Loc.path.substr(1, 7) === 'search/';
  }
  /**
   * signup page かを調べます
   * @return {boolean} signup page なら true を返します
   */
  static isSignup():boolean {
    return Loc.path.substr(1, 7) === 'signup/';
  }
  /**
   * mypage page かを調べます
   * @return {boolean} mypage page なら true を返します
   */
  static isMypage():boolean {
    return Loc.path.substr(1, 7) === 'mypage/';
  }
  /**
   * category slug, type を調べます
   * @return {{slug: string, type: string}} category slug, type を返します
   */
  static category():Object {
    if ( Router.isCategory() ) {
      let [ slug, type ] = Loc.path.replace( '/category/', '' ).split('/');

      if ( slug.indexOf( '.html' ) !== -1 ) {
        slug = '';
      }

      if ( slug === '' ) {
        slug = 'all';
      }

      return {
        slug: slug,
        type: type
      };
    }
  }
  /**
   * search keyword を調べます
   * @return {string} 検索キーワードを返します
   */
  static keyword():string {
    if ( Router.isSearch() ) {
      let [ keyword ] = Loc.path.replace( '/search/', '' ).split('/');
      return keyword;
    }
  }
  /**
   * article Id を調べます
   * @return {string} article Id を返します
   */
  static articleId():string {
    if ( Router.isSingle() || Router.isComment() || Router.isReply() ) {
      return Loc.path.replace( '/p/', '' ).split('/').shift();
    }
  }
  /**
   * comment Id を調べます
   * @return {string} comment Id を返します
   */
  static commentId():string {
    if ( Router.isComment() ) {
      return Loc.path.replace( '/p/', '' ).split('/')[ 2 ];
    }
  }
  /**
   * reply Id を調べます
   * @return {string} reply Id を返します
   */
  static replyId():string {
    if ( Router.isReply() ) {
      return Loc.path.replace( '/p/', '' ).split('/')[ 3 ];
    }
  }

}
