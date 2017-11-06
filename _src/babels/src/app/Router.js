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
/* eslint constructor-super: 0 */

import {EventDispatcher} from '../event/EventDispatcher';
// import {User} from './User';
import {Loc} from '../util/Loc';

// import Text from '../util/Text';

/**
 * single ton instance - inner Symbol
 * @type {Symbol}
 * @private
 */
const _symbol = Symbol('Router instance symbol');

/**
 * Router singleton instance
 * @type {?Router}
 * @private
 */
let _instance = null;

/**
 * <p>location.pathnameから現在地を調べます</p>
 * <p>全て static です</p>
 *
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
 */
export class Router extends EventDispatcher {
  // ---------------------------------------------------
  //  STATIC CONST
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
   * event type CATEGORY_AREA
   * @return {string} CATEGORY_AREA を返します
   */
  static get CATEGORY_AREA() {
    return 'routeCategoryArea';
  }
  /**
   * event type CATEGORY_PREF
   * @return {string} CATEGORY_PREF を返します
   */
  static get CATEGORY_PREF() {
    return 'routeCategoryPref';
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
   * event type SIGNUP_LOGIN
   * @return {string} SIGNUP_LOGIN を返します
   */
  static get SIGNUP_LOGIN():string {
    return 'routeSignupLogin';
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
   * event type SIGNUP_WOW
   * @returns {string} routerSignupWow
   * @since 2017-11-06
   */
  static get SIGNUP_WOW() {
    return 'routerSignupWow';
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
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {Router} Router instance を返します
   */
  static factory():Router {
    if (_instance === null) {
      _instance = new Router(_symbol);
    }
    return _instance;
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * <p>singleton class です。<br>
   * **routing** を管理します</p>
   *
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {Router} Router instance を返します
   */
  constructor( target ) {
    if ( _symbol !== target ) {
      throw new Error( 'Router is static Class. not use new Router(). instead Router.factory()' );
    }
    if (_instance) {
      return _instance;
    }
    // -------------
    super();
    // if ( _instance === null ) {
    //
    //   this.init( _symbol );
    //   _instance = this;
    // }
    // this 参照のために `bind` します
    this.index = this.index.bind(this);
    this.single = this.single.bind(this);
    this.singleA = this.singleA.bind(this);
    this.search = this.search.bind(this);
    this.signupLogin = this.signupLogin.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.password = this.password.bind(this);
    this.mypage = this.mypage.bind(this);
    this.notifications = this.notifications.bind(this);
    this.settings = this.settings.bind(this);
    this.signupWow = this.signupWow.bind(this);
    // -------------
    this._rule = {
      '/': this.index,
      '/category/': this.category,
      '/area/': this.category,
      '/p/': this.single,
      '/a/': this.single,
      '/search/': this.search,
      // '/search': this.search,
      '/signup_login/': this.signupLogin,
      // '/signup_login': this.signupLogin,
      '/signup/': this.signup,
      // '/signup': this.signup,
      '/login/': this.login,
      // '/login': this.login,
      '/logout/': this.logout,
      // '/logout': this.logout,
      '/reset_password/': this.password,
      '/mypage/': this.mypage,
      // '/mypage': this.mypage,
      '/notifications/': this.notifications,
      // '/notifications': this.notifications,
      '/settings/': this.settings,
      // '/settings': this.settings,
      // @see https://cloudpack.slack.com/archives/D7URD0FH7/p1509944048000078
      // @since 2017-11-06
      '/signup-wow/': this.signupWow,
    };
    // -------------
    return this;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  // init() {
  //   this._rule = {
  //     '/': this.index,
  //     '/category/': this.category,
  //     '/p/': this.single,
  //     '/a/': this.single,
  //     '/search/': this.search,
  //     // '/search': this.search,
  //     '/signup_login/': this.signupLogin,
  //     // '/signup_login': this.signupLogin,
  //     '/signup/': this.signup,
  //     // '/signup': this.signup,
  //     '/login/': this.login,
  //     // '/login': this.login,
  //     '/logout/': this.logout,
  //     // '/logout': this.logout,
  //     '/reset_password/': this.password,
  //     '/mypage/': this.mypage,
  //     // '/mypage': this.mypage,
  //     '/notifications/': this.notifications,
  //     // '/notifications': this.notifications,
  //     '/settings/': this.settings,
  //     // '/settings': this.settings,
  //   };
  // }
  // /**
  //  * inner methodです。呼び出しできません
  //  * @param {Symbol} target private を担保する Symbol
  //  */
  // init( target ):void {
  //
  //   if ( _symbol !== target ) {
  //     throw new Error( 'init is private method.' );
  //   }
  //
  //   const _this = this;
  //   /**
  //    * routing ルール
  //    * @type {{/: *, /category/: *, /p/: *, /a/: *, /search/: *, /search: *, /signup_login/: *, /signup_login: *, /signup/: *, /signup: *, /login/: *, /login: *, /logout/: *, /logout: *, /reset_password/: *, /mypage/: *, /mypage: *, /notifications/: *, /notifications: *, /settings/: *, /settings: *}}
  //    * @private
  //    */
  //   this._rule = {
  //     '/': _this.index.bind( _this ),
  //     '/category/': _this.category.bind( _this ),
  //     '/p/': _this.single.bind( _this ),
  //     '/a/': _this.single.bind( _this ),
  //     '/search/': _this.search.bind( _this ),
  //     '/search': _this.search.bind( _this ),
  //     '/signup_login/': _this.signupLogin.bind( _this ),
  //     '/signup_login': _this.signupLogin.bind( _this ),
  //     '/signup/': _this.signup.bind( _this ),
  //     '/signup': _this.signup.bind( _this ),
  //     '/login/': _this.login.bind( _this ),
  //     '/login': _this.login.bind( _this ),
  //     '/logout/': _this.logout.bind( _this ),
  //     '/logout': _this.logout.bind( _this ),
  //     '/reset_password/': _this.password.bind( _this ),
  //     // '/reset_password/resetting': _this.passwordResetting,
  //     '/mypage/': _this.mypage.bind( _this ),
  //     '/mypage': _this.mypage.bind( _this ),
  //     // '/mypage/activities': _this.activities,
  //     '/notifications/': _this.notifications.bind( _this ),
  //     '/notifications': _this.notifications.bind( _this ),
  //     '/settings/': _this.settings.bind( _this ),
  //     '/settings': _this.settings.bind( _this )
  //     // '/settings/interest': _this.interest,
  //     // '/settings/social': _this.social,
  //     // '/settings/deactivate': _this.deactivate
  //   };
  // }
  /**
   * <code>location.pathname</code> から経路探索を行います
   */
  route() {
    const rule = this._rule;
    const path = Loc.path;
    const pathLength = path.length;
    // let found = false;

    // console.log( 'route path, pathLength ', path, pathLength );
    if (pathLength === 1) {
      // pathname length が 1 '/'
      this.index();
      return;
    }
    // rule.key
    const result = Object.keys(rule).some((key) => {
      const keyLength = key.length;
      if (keyLength !== 1 && path.substr(0, keyLength) === key) {
        // const camel = Text.camel(key);
        // console.log('Router.route found', key, path);
        rule[key].call(this);
        return true;
      }
      return false;
    });
    // result check
    if (!result) {
      this.page404(path);
    }
    //
    // if ( pathLength !== 1 ) {
    //
    //   for ( var key in rule ) {
    //
    //     if ( rule.hasOwnProperty( key ) ) {
    //
    //       var keyLength = key.length;
    //
    //       if ( keyLength !== 1 ) {
    //
    //         // not kyeLength 1,
    //         // 通常 key
    //         if ( path.substr( 0, keyLength ) === key ) {
    //           // console.log( 'path substr ', path.substr( 0, keyLength ), key );
    //           rule[ key ]();
    //           found = true;
    //           break;
    //         }
    //       }// keyLength
    //
    //     }// hasOwnProperty
    //
    //   }// for
    //
    // } else {
    //
    //   // pathname length が 1 '/'
    //   this.index();
    //   found = true;
    //
    // }
    // // console.log( 'Router found', found, path );
    // if ( !found ) {
    //   // path pattern に該当しない
    //   this.page404( path );
    // }
  }
  /**
   * 404 not found event fire
   * @param {string} [where=''] 発火場所
   */
  page404(where = '') {
    // console.log( '404 ', where );
    this.dispatch( { type: Router.NOT_FOUND, where: where } );
  }
  /**
   * 403 forbidden event fire
   * @param {string} [where=''] 発火場所
   */
  authorityError(where = '') {
    // console.warn( 'authority error ', where );
    this.dispatch( { type: Router.AUTHORITY_ERROR, where: where } );
  }
  /**
   * index (home) page
   */
  index() {
    this.dispatch({ type: Router.INDEX });
  }
  /**
   * category page
   */
  category() {
    let [slug, slugType] = Loc.path.replace(/\/category\/|\/category/ig, '').split('/');
    // console.log('Router.category', slug, slugType === 'area', slugType);
    if (slugType === 'area') {
      this.area(slugType);
      return;
    }
    if (slug.indexOf('.html') !== -1) {
      slug = '';
    }
    if (slug === '') {
      slug = 'all';
    }
    this.dispatch({ type: Router.CATEGORY, slug, slugType });
  }
  /**
   * 地域 - category/area
   * @param {string} slugType 多分 `area`
   */
  area(slugType) {
    const [encoded] = Loc.path.replace(/\/area\/|\/area/ig, '').split('/');
    const mode = decodeURIComponent(encoded);
    // 区分が揺れている - 要確認 <- APIが正 - 以下正しい
    const areas = [
      '北海道',
      '東北',
      '関東',
      '北陸・甲信越',
      '東海',
      '関西',
      '中国',
      '四国',
      '九州・沖縄',
    ];
    const index = areas.indexOf(mode);
    let pref = true;
    // console.log('Router.area type', encoded, index, mode);
    if (index !== -1) {
      // 地域
      pref = false;
      this.dispatch({ type: Router.CATEGORY_AREA, slug: 'area', slugType, mode, pref });
    } else {
      // 都道府県
      // this.dispatch({ type: Router.CATEGORY_PREF, slugType, mode });
      this.page404('area');
    }
  }
  /**
   * single detail page
   */
  single():void {
    // comment, comment reply 振り分け
    const [articleId, comment, commentId, replyId] = Loc.path.replace('/p/', '').split('/');
    if (!!articleId && Number.isInteger(parseInt(articleId, 10))) {
      // article Id 存在
      if (comment === 'comment') {
        // in comment
        this.comment( articleId, commentId, replyId );
      } else {
        // single page
        this.dispatch( { type: Router.SINGLE, id: articleId } );
      }
    } else {
      // article Id ない
      this.page404('single');
    }
    // else {
    //     let [ articleId, comment, commentId, replyId ] = Loc.path.replace( '/a/', '' ).split('/');
    //     if ( !!articleId && Number.isInteger( parseInt( articleId, 10 ) ) ) {
    //
    //         // article Id 存在
    //         if ( comment === 'comment' ) {
    //
    //             // in comment
    //             this.comment( articleId, commentId, replyId );
    //
    //         } else {
    //
    //             // single page
    //             this.dispatch( { type: Router.SINGLE, id: articleId } );
    //
    //         }
    //
    //     } else {
    //
    //         // article Id ない
    //         this.page404( 'single' );
    //     }
    //
    //
    // }
  }
  /**
   * `/a/` な個別ページ
   */
  singleA() {
    const [articleId, comment, commentId, replyId] = Loc.path.replace( '/a/', '' ).split('/');
    if (!!articleId && Number.isInteger(parseInt(articleId, 10))) {
      // article Id 存在
      if (comment === 'comment') {
        // in comment
        this.comment( articleId, commentId, replyId );
      } else {
        // single page
        this.dispatch( { type: Router.SINGLE, id: articleId } );
      }
    } else {
      // article Id ない
      this.page404('single');
    }
  }
  /**
   * comment / comment reply page
   * @param {string} articleId article Id 記事 Id
   * @param {string} commentId comment Id
   * @param {string} [replyId=undefined] comment reply Id
   */
  comment(articleId, commentId, replyId) {
    // articleId 存在チェック済み
    if (!!commentId && Number.isInteger(parseInt(commentId, 10))) {
      if (!!replyId && Number.isInteger(parseInt(replyId, 10))) {
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
    const [keyword] = Loc.path.replace( /\/search\/|\/search/ig, '' ).split('/');

    if (!!keyword) {
      this.dispatch( { type: Router.SEARCH, keyword: keyword } );
    } else {
      // keyword がない
      this.dispatch( { type: Router.SEARCH, keyword: '' } );
      // this.page404( 'search' );
    }
  }
  /**
   * signup / signup interest / signup account page
   */
  signup() {
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

    // console.log( 'signup page in fired' );
    // URL 遷移しない
    // 1 page コンテンツ
    this.dispatch( { type: Router.SIGNUP } );

  }
  /**
   * signup-wow
   * @since 2017-11-06
   */
  signupWow() {
    this.dispatch( { type: Router.SIGNUP_WOW } );
  }
  /**
   * signup_login URL
   */
  signupLogin() {
    this.dispatch({ type: Router.SIGNUP_LOGIN });
  }
  /**
   * login page
   */
  login() {
    this.dispatch({ type: Router.LOGIN });
  }
  /**
   * logout page
   */
  logout() {
    this.dispatch({ type: Router.LOGOUT });
  }
  /**
   * reset_password page
   */
  password() {
    const [option] = Loc.path.replace( /\/reset_password\/|\/reset_password/ig, '' ).split('/');

    if (option === 'resetting') {
      this.passwordResetting();
    } else {
      this.dispatch({ type: Router.RESET_PASSWORD });
    }
  }
  /**
   * reset_password resetting page
   */
  passwordResetting() {
    this.dispatch({ type: Router.RESET_PASSWORD_RESETTING });
  }
  /**
   * mypage
   */
  mypage() {
    const [activities] = Loc.path.replace( /\/mypage\/|\/mypage/ig, '' ).split('/');
    if ( activities === 'activities' ) {
      this.activities();
    } else {
      this.dispatch( { type: Router.MYPAGE } );
    }
  }
  /**
   * mypage activities page
   */
  activities() {
    this.dispatch({ type: Router.MYPAGE_ACTIVITIES });
    /*
    if ( User.sign ) {

      this.dispatch( { type: Router.MYPAGE_ACTIVITIES } );

    } else {

      this.authorityError( 'activities' );

    }
    */
  }
  /**
   * notifications page
   */
  notifications() {
    this.dispatch( { type: Router.NOTIFICATIONS } );
    /*
    if ( User.sign ) {

      this.dispatch( { type: Router.NOTIFICATIONS } );

    } else {

      this.authorityError( 'notifications' );

    }*/
  }
  /**
   * settings page
   */
  settings() {
    const [option] = Loc.path.replace( /\/settings\/|\/settings/ig, '' ).split('/');
    // console.log( 'settings option ', option );
    switch (option) {
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
        /*
        if ( User.sign ) {
          this.dispatch( { type: Router.SETTING } );
        } else {
          this.authorityError( 'setting' );
        }
        */
        this.dispatch({ type: Router.SETTING });
        break;
    }
  }
  /**
   * settings interest page
   */
  interest() {
    this.dispatch({ type: Router.SETTING_INTEREST });
    /*
    if ( User.sign ) {
      this.dispatch( { type: Router.SETTING_INTEREST } );
    } else {
      this.authorityError( 'interest' );
    }*/
  }
  /**
   * settings social page
   */
  social() {
    this.dispatch({ type: Router.SETTING_SOCIAL });
    /*
    if ( User.sign ) {
      this.dispatch( { type: Router.SETTING_SOCIAL } );
    } else {
      this.authorityError( 'social' );
    }*/
  }
  /**
   * settings deactivate page
   */
  deactivate() {
    this.dispatch({ type: Router.SETTING_DEACTIVATE });
    /*
    if ( User.sign ) {
      this.dispatch( { type: Router.SETTING_DEACTIVATE } );
    } else {
      this.authorityError( 'deactivate' );
    }
    */
  }
}
