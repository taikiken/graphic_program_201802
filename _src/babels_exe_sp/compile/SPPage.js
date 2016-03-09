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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SPPage = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _SPPageTop = require('./ui/SPPageTop');

var _SPNav = require('./ui/SPNav');

var _SPIndex = require('./page/SPIndex');

var _SPCategory = require('./page/SPCategory');

var _SPSingle = require('./page/SPSingle');

var _SPSearch = require('./page/SPSearch');

var _SPSignup = require('./page/SPSignup');

var _SPUserProfile = require('./page/SPUserProfile');

var _SPSidebar = require('./page/SPSidebar');

var _SPHeader = require('./page/SPHeader');

var _SPBookmarks = require('./page/SPBookmarks');

var _SPActivities = require('./page/SPActivities');

var _SPNotifications = require('./page/SPNotifications');

var _SPSettings = require('./page/SPSettings');

var _SPComment = require('./page/SPComment');

var _SPSearchFrom = require('./header/SPSearchFrom');

var _SPCommentDelete = require('./modal/SPCommentDelete');

var _Dom = require('./dom/Dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

// UT
var UT = self.UT;

var SPPage = exports.SPPage = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function SPPage(target) {
    (0, _classCallCheck3.default)(this, SPPage);

    if (_symbol !== target) {

      throw new Error('SPPage is static Class. not use new SPPage().');
    }
  }

  /**
   * Page 初期化, UT.app.Router event を listen します
   */

  (0, _createClass3.default)(SPPage, null, [{
    key: 'init',
    value: function init() {

      // user login check
      UT.app.User.init();

      // modal
      _SPCommentDelete.SPCommentDelete.start();

      // router
      var Router = UT.app.Router;
      var router = Router.factory();

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

      router.route();
    }
    /**
     * home, index page
     */

  }, {
    key: 'index',
    value: function index() {
      // page top
      _SPPageTop.SPPageTop.start();
      // search from
      _SPSearchFrom.SPSearchFrom.start();
      // index
      _SPIndex.SPIndex.start();
      // nav
      _SPNav.SPNav.start('home');
    }
    /**
     * category page
     * @param {Object} event Router event object
     */

  }, {
    key: 'category',
    value: function category(event) {

      var slug = event.slug;
      var type = event.slugType;
      // page top
      _SPPageTop.SPPageTop.start();
      // search from
      _SPSearchFrom.SPSearchFrom.start();
      // category
      _SPCategory.SPCategory.start(slug, type);
      // nav
      _SPNav.SPNav.start(slug);
    }
    /**
     * single, detail page
     * @param {Object} event Router event object
     */

  }, {
    key: 'single',
    value: function single(event) {

      var articleId = event.id;
      // page top
      _SPPageTop.SPPageTop.start();
      // search from
      _SPSearchFrom.SPSearchFrom.start();
      // single
      _SPSingle.SPSingle.start(articleId);
    }
    /**
     * コメント詳細
     * @param {Object} event Router event object
     */

  }, {
    key: 'comment',
    value: function comment(event) {

      // page top
      _SPPageTop.SPPageTop.start();
      // search from
      _SPSearchFrom.SPSearchFrom.start();

      _SPComment.SPComment.user('comment', event.article, event.comment);
    }
    /**
     * コメント返信 詳細
     * @param {Object} event Router event object
     */

  }, {
    key: 'commentReply',
    value: function commentReply(event) {

      // page top
      _SPPageTop.SPPageTop.start();
      // search from
      _SPSearchFrom.SPSearchFrom.start();

      _SPComment.SPComment.user('reply', event.article, event.comment, event.article);
    }
    /**
     * 検索ページ
     * @param {Object} event Router.SEARCH event object
     */

  }, {
    key: 'search',
    value: function search(event) {
      // page top
      _SPPageTop.SPPageTop.start();
      // search from
      _SPSearchFrom.SPSearchFrom.start();

      _SPSearch.SPSearch.start(event.keyword);
    }
    // ----------------------------------------------------
    // header, footer いらない
    /**
     * signup page
     */

  }, {
    key: 'signup',
    value: function signup() {
      _SPSignup.SPSignup.start();
    }
    /**
     * login page
     */

  }, {
    key: 'login',
    value: function login() {
      var loginElement = _Dom.Dom.login();
      if (loginElement !== null) {
        var _login = new UT.view.login.ViewLogin(loginElement);
        _login.start();
      }
    }

    /**
     * logout
     */

  }, {
    key: 'logout',
    value: function logout() {
      // page top
      _SPPageTop.SPPageTop.start();
      // search from
      _SPSearchFrom.SPSearchFrom.start();

      _SPSidebar.SPSidebar.start();
      _SPHeader.SPHeader.start();

      if (UT.app.User.sign) {
        var logoutElement = _Dom.Dom.logout();
        if (logoutElement !== null) {
          var _logout = new UT.view.login.ViewLogout(logoutElement);
          _logout.start();
        }
      }
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

  }, {
    key: 'mypage',
    value: function mypage() {
      // page top
      _SPPageTop.SPPageTop.start();
      // search from
      _SPSearchFrom.SPSearchFrom.start();

      _SPSidebar.SPSidebar.start();
      _SPHeader.SPHeader.start();

      if (UT.app.User.sign) {
        // login only
        _SPUserProfile.SPUserProfile.start();
        _SPBookmarks.SPBookmarks.start();
      }
    }
    /**
     * マイページ / アクティビティーズ一覧
     */

  }, {
    key: 'activities',
    value: function activities() {
      // page top
      _SPPageTop.SPPageTop.start();
      // search from
      _SPSearchFrom.SPSearchFrom.start();

      _SPSidebar.SPSidebar.start();
      _SPHeader.SPHeader.start();

      if (UT.app.User.sign) {
        // login only
        _SPUserProfile.SPUserProfile.start();
        _SPActivities.SPActivities.start();
      }
    }
    /**
     * マイページ / お知らせ一覧
     */

  }, {
    key: 'notifications',
    value: function notifications() {
      // page top
      _SPPageTop.SPPageTop.start();
      // search from
      _SPSearchFrom.SPSearchFrom.start();

      _SPSidebar.SPSidebar.start();
      _SPHeader.SPHeader.start();
      if (UT.app.User.sign) {
        // login only
        _SPUserProfile.SPUserProfile.start();
        _SPNotifications.SPNotifications.start();
      }
    }
    // ------------------------------
    // settings 設定
    /**
     * 設定 基本情報設定
     */

  }, {
    key: 'settings',
    value: function settings() {
      // page top
      _SPPageTop.SPPageTop.start();
      // search from
      _SPSearchFrom.SPSearchFrom.start();

      _SPSidebar.SPSidebar.start();
      _SPHeader.SPHeader.start();

      if (UT.app.User.sign) {
        // login only
        _SPSettings.SPSettings.account();
      }
    }
    /**
     * 設定 パーソナライズ設定 興味のある競技
     */

  }, {
    key: 'interest',
    value: function interest() {
      // page top
      _SPPageTop.SPPageTop.start();
      // search from
      _SPSearchFrom.SPSearchFrom.start();

      _SPSidebar.SPSidebar.start();
      _SPHeader.SPHeader.start();

      if (UT.app.User.sign) {
        // login only
        _SPSettings.SPSettings.interest();
      }
    }
    /**
     * 設定 ソーシャル連携
     */

  }, {
    key: 'social',
    value: function social() {
      // page top
      _SPPageTop.SPPageTop.start();
      // search from
      _SPSearchFrom.SPSearchFrom.start();
      _SPSidebar.SPSidebar.start();
      _SPHeader.SPHeader.start();
    }
    /**
     * 退会
     */

  }, {
    key: 'deactivate',
    value: function deactivate() {
      // page top
      _SPPageTop.SPPageTop.start();
      // search from
      _SPSearchFrom.SPSearchFrom.start();

      _SPSidebar.SPSidebar.start();
      _SPHeader.SPHeader.start();

      if (UT.app.User.sign) {
        // login only
        _SPSettings.SPSettings.deactivate();
      }
    }
  }]);
  return SPPage;
}();