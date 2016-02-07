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

var _isInteger = require('babel-runtime/core-js/number/is-integer');

var _isInteger2 = _interopRequireDefault(_isInteger);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = undefined;

var _EventDispatcher2 = require('../event/EventDispatcher');

var _User = require('./User');

var _Loc = require('../util/Loc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();
var _instance = null;

/**
 * <h3>location.pathnameから現在地を調べます</h3>
 * 全て static です
 */

var Router = exports.Router = function (_EventDispatcher) {
  (0, _inherits3.default)(Router, _EventDispatcher);

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
   */

  function Router(target) {
    var _ret;

    (0, _classCallCheck3.default)(this, Router);

    if (_symbol !== target) {

      throw new Error('Router is static Class. not use new Router(). instead Router.factory()');
    }

    if (_instance === null) {
      var _this2 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Router).call(this));

      _this2.init(_symbol);
      _instance = _this2;
    }
    return _ret = _instance, (0, _possibleConstructorReturn3.default)(_this2, _ret);
  }
  /**
   * inner methodです。呼び出しできません
   * @param {Symbol} target private を担保する Symbol
   */

  (0, _createClass3.default)(Router, [{
    key: 'init',
    value: function init(target) {

      if (_symbol !== target) {
        throw new Error('init is private method.');
      }

      var _this = this;

      this._rule = {
        '/': _this.index,
        '/category/': _this.category.bind(_this),
        '/p/': _this.single.bind(_this),
        '/search/': _this.search.bind(_this),
        '/signup/': _this.signup.bind(_this),
        '/login/': _this.login.bind(_this),
        '/logout/': _this.logout.bind(_this),
        '/reset_password/': _this.password.bind(_this),
        // '/reset_password/resetting': _this.passwordResetting,
        '/mypage/': _this.mypage.bind(_this),
        // '/mypage/activities': _this.activities,
        '/notifications': _this.notifications.bind(_this),
        '/settings': _this.settings.bind(_this)
        // '/settings/interest': _this.interest,
        // '/settings/social': _this.social,
        // '/settings/deactivate': _this.deactivate
      };
    }
    /**
     * <code>location.pathname</code> から経路探索を行います
     */

  }, {
    key: 'route',
    value: function route() {
      var rule = this._rule;
      var path = _Loc.Loc.path;
      var pathLength = path.length;
      var found = false;
      console.log('route ', path, pathLength);
      if (pathLength !== 1) {

        for (var key in rule) {

          if (rule.hasOwnProperty(key)) {

            var keyLength = key.length;

            if (keyLength !== 1) {

              // not kyeLength 1,
              // 通常 key
              if (path.substr(0, keyLength) === key) {
                rule[key]();
                found = true;
                break;
              }
            } // keyLength
          } // hasOwnProperty
        } // for
      } else {

          // pathname length が 1 '/'
          this.index();
          found = true;
        }

      if (!found) {
        // path pattern に該当しない
        this.page404();
      }
    }
    /**
     * 404 not found event fire
     * @param {string} [fire=''] 発火場所
     */

  }, {
    key: 'page404',
    value: function page404() {
      var fire = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      this.dispatch({ type: Router.NOT_FOUND, fire: fire });
    }
    /**
     * 403 forbidden event fire
     * @param {string} [fire=''] 発火場所
     */

  }, {
    key: 'authorityError',
    value: function authorityError() {
      var fire = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      this.dispatch({ type: Router.AUTHORITY_ERROR, fire: fire });
    }
    /**
     * index (home) page
     */

  }, {
    key: 'index',
    value: function index() {
      this.dispatch({ type: Router.INDEX });
    }
    /**
     * category page
     */

  }, {
    key: 'category',
    value: function category() {
      var _Loc$path$replace$spl = _Loc.Loc.path.replace('/category/', '').split('/');

      var _Loc$path$replace$spl2 = (0, _slicedToArray3.default)(_Loc$path$replace$spl, 2);

      var slug = _Loc$path$replace$spl2[0];
      var slugType = _Loc$path$replace$spl2[1];

      if (slug.indexOf('.html') !== -1) {
        slug = '';
      }

      if (slug === '') {
        slug = 'all';
      }

      this.dispatch({ type: Router.CATEGORY, slug: slug, slugType: slugType });
    }
    /**
     * single detail page
     */

  }, {
    key: 'single',
    value: function single() {
      // comment, comment reply 振り分け

      var _Loc$path$replace$spl3 = _Loc.Loc.path.replace('/p/', '').split('/');

      var _Loc$path$replace$spl4 = (0, _slicedToArray3.default)(_Loc$path$replace$spl3, 4);

      var articleId = _Loc$path$replace$spl4[0];
      var comment = _Loc$path$replace$spl4[1];
      var commentId = _Loc$path$replace$spl4[2];
      var replyId = _Loc$path$replace$spl4[3];

      if (!!articleId && (0, _isInteger2.default)(parseInt(articleId, 10))) {

        // article Id 存在
        if (comment === 'comment') {

          // in comment
          this.comment(articleId, commentId, replyId);
        } else {

          // single page
          this.dispatch({ type: Router.SINGLE, id: articleId });
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
     * @param {string} replyId comment reply Id
     */

  }, {
    key: 'comment',
    value: function comment(articleId, commentId, replyId) {

      // articleId 存在チェック済み
      if (!!commentId && (0, _isInteger2.default)(parseInt(commentId, 10))) {

        if (!!replyId && (0, _isInteger2.default)(parseInt(replyId, 10))) {

          // reply Id あり, comment reply page
          this.dispatch({ type: Router.COMMENT_REPLY, article: articleId, comment: commentId, reply: replyId });
        } else {

          // reply Id なし, comment page
          this.dispatch({ type: Router.COMMENT, article: articleId, comment: commentId, reply: replyId });
        }
      } else {

        // comment Id がない
        this.page404('comment');
      }
    }
    /**
     * search 検索 page
     */

  }, {
    key: 'search',
    value: function search() {
      var _Loc$path$replace$spl5 = _Loc.Loc.path.replace('/search/', '').split('/');

      var _Loc$path$replace$spl6 = (0, _slicedToArray3.default)(_Loc$path$replace$spl5, 1);

      var keyword = _Loc$path$replace$spl6[0];

      if (!!keyword) {

        this.dispatch({ type: Router.SEARCH, keyword: keyword });
      } else {

        // keyword がない
        this.page404('search');
      }
    }
    /**
     * signup / signup interest / signup account page
     */

  }, {
    key: 'signup',
    value: function signup() {
      var _Loc$path$replace$spl7 = _Loc.Loc.path.replace('/signup/', '').split('/');

      var _Loc$path$replace$spl8 = (0, _slicedToArray3.default)(_Loc$path$replace$spl7, 1);

      var option = _Loc$path$replace$spl8[0];

      if (option === 'account') {

        // /signup/account/
        this.dispatch({ type: Router.SIGNUP_ACCOUNT });
      } else if (option === 'interest') {

        // /signup/interest/
        this.dispatch({ type: Router.SIGNUP_INTEREST });
      } else {

        // /signup/
        this.dispatch({ type: Router.SIGNUP });
      }
    }
    /**
     * login page
     */

  }, {
    key: 'login',
    value: function login() {
      this.dispatch({ type: Router.LOGIN });
    }

    /**
     * logout page
     */

  }, {
    key: 'logout',
    value: function logout() {
      this.dispatch({ type: Router.LOGOUT });
    }

    /**
     * reset_password page
     */

  }, {
    key: 'password',
    value: function password() {
      var _Loc$path$replace$spl9 = _Loc.Loc.path.replace('/reset_password/', '').split('/');

      var _Loc$path$replace$spl10 = (0, _slicedToArray3.default)(_Loc$path$replace$spl9, 1);

      var option = _Loc$path$replace$spl10[0];

      if (option === 'resetting') {

        this.passwordResetting();
      } else {

        this.dispatch({ type: Router.RESET_PASSWORD });
      }
    }

    /**
     * reset_password resetting page
     */

  }, {
    key: 'passwordResetting',
    value: function passwordResetting() {

      this.dispatch({ type: Router.RESET_PASSWORD_RESETTING });
    }
    /**
     * mypage
     */

  }, {
    key: 'mypage',
    value: function mypage() {
      var _Loc$path$replace$spl11 = _Loc.Loc.path.replace('/mypage/', '').split('/');

      var _Loc$path$replace$spl12 = (0, _slicedToArray3.default)(_Loc$path$replace$spl11, 1);

      var activities = _Loc$path$replace$spl12[0];

      if (activities === 'activities') {

        this.activities();
      } else {

        if (_User.User.sign) {

          this.dispatch({ type: Router.MYPAGE });
        } else {

          this.authorityError('mypage');
        }
      }
    }
    /**
     * mypage activities page
     */

  }, {
    key: 'activities',
    value: function activities() {

      if (_User.User.sign) {

        this.dispatch({ type: Router.MYPAGE_ACTIVITIES });
      } else {

        this.authorityError('activities');
      }
    }
    /**
     * notifications page
     */

  }, {
    key: 'notifications',
    value: function notifications() {

      if (_User.User.sign) {

        this.dispatch({ type: Router.NOTIFICATIONS });
      } else {

        this.authorityError('notifications');
      }
    }
    /**
     * settings page
     */

  }, {
    key: 'settings',
    value: function settings() {
      var _Loc$path$replace$spl13 = _Loc.Loc.path.replace('/settings/', '').split('/');

      var _Loc$path$replace$spl14 = (0, _slicedToArray3.default)(_Loc$path$replace$spl13, 1);

      var option = _Loc$path$replace$spl14[0];

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
          if (_User.User.sign) {
            this.dispatch({ type: Router.SETTING });
          } else {
            this.authorityError('setting');
          }
          break;

      }
    }
    /**
     * settings interest page
     */

  }, {
    key: 'interest',
    value: function interest() {
      if (_User.User.sign) {
        this.dispatch({ type: Router.SETTING_INTEREST });
      } else {
        this.authorityError('interest');
      }
    }
    /**
     * settings social page
     */

  }, {
    key: 'social',
    value: function social() {
      if (_User.User.sign) {
        this.dispatch({ type: Router.SETTING_SOCIAL });
      } else {
        this.authorityError('social');
      }
    }
    /**
     * settings deactivate page
     */

  }, {
    key: 'deactivate',
    value: function deactivate() {
      if (_User.User.sign) {
        this.dispatch({ type: Router.SETTING_DEACTIVATE });
      } else {
        this.authorityError('deactivate');
      }
    }
    // ---------------------------------------------------
    //  const
    // ---------------------------------------------------
    /**
     * event type NOT_FOUND
     * @return {string} NOT_FOUND を返します
     */

  }], [{
    key: 'factory',

    // ---------------------------------------------------
    //  static method
    // ---------------------------------------------------
    /**
     * instance を生成します
     * @return {Router} Router instance を返します
     */
    value: function factory() {

      if (_instance === null) {

        _instance = new Router(_symbol);
      }

      return _instance;
    }
    // ---------------------------------------------------
    //  deprecated, 互換のために残します
    //  ToDo: 問題ないことが確認できたら削除する
    // ---------------------------------------------------
    /**
     * category page かを調べます
     * @return {boolean} category page なら true を返します
     */

  }, {
    key: 'isCategory',
    value: function isCategory() {
      return _Loc.Loc.path.substr(1, 9) === 'category/';
    }
    /**
     * single page かを調べます
     * @return {boolean} single page なら true を返します
     */

  }, {
    key: 'isSingle',
    value: function isSingle() {
      if (_Loc.Loc.path.substr(1, 2) === 'p/') {
        var split = _Loc.Loc.path.replace('/p/', '').split('/');
        if (_Loc.Loc.isLocal()) {
          split.pop();
        }
        return split.length === 1;
      }
    }
    /**
     * comment page かを調べます
     * @return {boolean} comment page なら true を返します
     */

  }, {
    key: 'isComment',
    value: function isComment() {
      if (_Loc.Loc.path.substr(1, 2) === 'p/') {
        var split = _Loc.Loc.path.replace('/p/', '').split('/');
        if (_Loc.Loc.isLocal()) {
          split.pop();
        }
        if (split.length > 1 && split[1] === 'comment') {
          return split.length === 3;
        }
      }
    }
    /**
     * comment replay page かを調べます
     * @return {boolean} comment replay page なら true を返します
     */

  }, {
    key: 'isReply',
    value: function isReply() {
      if (_Loc.Loc.path.substr(1, 2) === 'p/') {
        var split = _Loc.Loc.path.replace('/p/', '').split('/');
        if (_Loc.Loc.isLocal()) {
          split.pop();
        }
        if (split.length > 1 && split[1] === 'comment') {
          return split.length === 4;
        }
      }
    }
    /**
     * search page かを調べます
     * @return {boolean} search page なら true を返します
     */

  }, {
    key: 'isSearch',
    value: function isSearch() {
      return _Loc.Loc.path.substr(1, 7) === 'search/';
    }
    /**
     * signup page かを調べます
     * @return {boolean} signup page なら true を返します
     */

  }, {
    key: 'isSignup',
    value: function isSignup() {
      return _Loc.Loc.path.substr(1, 7) === 'signup/';
    }
    /**
     * mypage page かを調べます
     * @return {boolean} mypage page なら true を返します
     */

  }, {
    key: 'isMypage',
    value: function isMypage() {
      return _Loc.Loc.path.substr(1, 7) === 'mypage/';
    }
    /**
     * category slug, type を調べます
     * @return {{slug: string, type: string}} category slug, type を返します
     */

  }, {
    key: 'category',
    value: function category() {
      if (Router.isCategory()) {
        var _Loc$path$replace$spl15 = _Loc.Loc.path.replace('/category/', '').split('/');

        var _Loc$path$replace$spl16 = (0, _slicedToArray3.default)(_Loc$path$replace$spl15, 2);

        var slug = _Loc$path$replace$spl16[0];
        var type = _Loc$path$replace$spl16[1];

        if (slug.indexOf('.html') !== -1) {
          slug = '';
        }

        if (slug === '') {
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

  }, {
    key: 'keyword',
    value: function keyword() {
      if (Router.isSearch()) {
        var _Loc$path$replace$spl17 = _Loc.Loc.path.replace('/search/', '').split('/');

        var _Loc$path$replace$spl18 = (0, _slicedToArray3.default)(_Loc$path$replace$spl17, 1);

        var keyword = _Loc$path$replace$spl18[0];

        return keyword;
      }
    }
    /**
     * article Id を調べます
     * @return {string} article Id を返します
     */

  }, {
    key: 'articleId',
    value: function articleId() {
      if (Router.isSingle() || Router.isComment() || Router.isReply()) {
        return _Loc.Loc.path.replace('/p/', '').split('/').shift();
      }
    }
    /**
     * comment Id を調べます
     * @return {string} comment Id を返します
     */

  }, {
    key: 'commentId',
    value: function commentId() {
      if (Router.isComment()) {
        return _Loc.Loc.path.replace('/p/', '').split('/')[2];
      }
    }
    /**
     * reply Id を調べます
     * @return {string} reply Id を返します
     */

  }, {
    key: 'replyId',
    value: function replyId() {
      if (Router.isReply()) {
        return _Loc.Loc.path.replace('/p/', '').split('/')[3];
      }
    }
  }, {
    key: 'NOT_FOUND',
    get: function get() {
      return 'routeNotFound';
    }
    /**
     * event type AUTHORITY_ERROR
     * @return {string} AUTHORITY_ERROR を返します
     */

  }, {
    key: 'AUTHORITY_ERROR',
    get: function get() {
      return 'routeAuthorityError';
    }
    /**
     * event type INDEX
     * @return {string} INDEX を返します
     */

  }, {
    key: 'INDEX',
    get: function get() {
      return 'routeIndex';
    }
    /**
     * event type CATEGORY
     * @return {string} CATEGORY を返します
     */

  }, {
    key: 'CATEGORY',
    get: function get() {
      return 'routeCategory';
    }
    /**
     * event type SINGLE
     * @return {string} SINGLE を返します
     */

  }, {
    key: 'SINGLE',
    get: function get() {
      return 'routeSingle';
    }
    /**
     * event type COMMENT
     * @return {string} COMMENT を返します
     */

  }, {
    key: 'COMMENT',
    get: function get() {
      return 'routeComment';
    }
    /**
     * event type COMMENT_REPLY
     * @return {string} COMMENT_REPLY を返します
     */

  }, {
    key: 'COMMENT_REPLY',
    get: function get() {
      return 'routeCommentReply';
    }
    /**
     * event type SEARCH
     * @return {string} SEARCH を返します
     */

  }, {
    key: 'SEARCH',
    get: function get() {
      return 'routeSearch';
    }
    /**
     * event type SIGNUP
     * @return {string} SIGNUP を返します
     */

  }, {
    key: 'SIGNUP',
    get: function get() {
      return 'routeSignup';
    }
    /**
     * event type SIGNUP_ACCOUNT
     * @return {string} SIGNUP_ACCOUNT を返します
     */

  }, {
    key: 'SIGNUP_ACCOUNT',
    get: function get() {
      return 'routeSignupAccount';
    }
    /**
     * event type SIGNUP_INTEREST
     * @return {string} SIGNUP_INTEREST を返します
     */

  }, {
    key: 'SIGNUP_INTEREST',
    get: function get() {
      return 'routeSignupInterest';
    }
    /**
     * event type LOGIN
     * @return {string} LOGIN を返します
     */

  }, {
    key: 'LOGIN',
    get: function get() {
      return 'routeLogin';
    }
    /**
     * event type LOGOUT
     * @return {string} LOGOUT を返します
     */

  }, {
    key: 'LOGOUT',
    get: function get() {
      return 'routeLogout';
    }
    /**
     * event type RESET_PASSWORD
     * @return {string} RESET_PASSWORD を返します
     */

  }, {
    key: 'RESET_PASSWORD',
    get: function get() {
      return 'routeResetPassword';
    }
    /**
     * event type RESET_PASSWORD_RESETTING
     * @return {string} RESET_PASSWORD_RESETTING を返します
     */

  }, {
    key: 'RESET_PASSWORD_RESETTING',
    get: function get() {
      return 'routeResetPasswordResetting';
    }
    /**
     * event type MYPAGE
     * @return {string} MYPAGE を返します
     */

  }, {
    key: 'MYPAGE',
    get: function get() {
      return 'routeMypage';
    }
    /**
     * event type MYPAGE_ACTIVITIES
     * @return {string} MYPAGE_ACTIVITIES を返します
     */

  }, {
    key: 'MYPAGE_ACTIVITIES',
    get: function get() {
      return 'routeMypageActivities';
    }
    /**
     * event type NOTIFICATIONS
     * @return {string} NOTIFICATIONS を返します
     */

  }, {
    key: 'NOTIFICATIONS',
    get: function get() {
      return 'routeNotifications';
    }
    /**
     * event type SETTING
     * @return {string} SETTING を返します
     */

  }, {
    key: 'SETTING',
    get: function get() {
      return 'routeSetting';
    }
    /**
     * event type SETTING_INTEREST
     * @return {string} SETTING_INTEREST を返します
     */

  }, {
    key: 'SETTING_INTEREST',
    get: function get() {
      return 'routeSettingInterest';
    }
    /**
     * event type SETTING_SOCIAL
     * @return {string} SETTING_SOCIAL を返します
     */

  }, {
    key: 'SETTING_SOCIAL',
    get: function get() {
      return 'routeSettingSocial';
    }
    /**
     * event type SETTING_DEACTIVATE
     * @return {string} SETTING_DEACTIVATE を返します
     */

  }, {
    key: 'SETTING_DEACTIVATE',
    get: function get() {
      return 'routeSettingDeactivate';
    }
  }]);
  return Router;
}(_EventDispatcher2.EventDispatcher);