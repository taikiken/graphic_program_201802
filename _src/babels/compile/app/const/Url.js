/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/11 - 13:48
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
exports.Url = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

/**
 * <h3>Page 遷移 URL</h3>
 * 全て static です
 */

var Url = exports.Url = function () {
  /**
   * <h4>Page 遷移 URL</h4>
   * <p>a tag href へハードコードされる URL 定義</p>
   * [参照](https://docs.google.com/spreadsheets/d/1raMO0x5aeG-bk45PK528ib9HUU-Q4DbHq56oxDQ1h7c/)
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function Url(target) {
    (0, _classCallCheck3.default)(this, Url);

    if (_symbol !== target) {

      throw new Error('Url is static Class. not use new Url().');
    }
  }
  // ---------------------------------------------------
  //  CONST 代わり
  // ---------------------------------------------------
  /**
   * @return {string} category/slug 置き換え文字定数
   */

  (0, _createClass3.default)(Url, null, [{
    key: 'index',

    // ---------------------------------------------------
    //  METHOD
    // ---------------------------------------------------
    /**
     * URL index
     * @return {string} index url を返します
     */
    value: function index() {
      return '/';
    }

    /**
     * category url
     * @param {string} [slug=all] category slug
     * @return {string} category url を返します
     */

  }, {
    key: 'category',
    value: function category() {
      var slug = arguments.length <= 0 || arguments[0] === undefined ? 'all' : arguments[0];

      return Url.CATEGORY.replace(Url.CATEGORY_SLUG, slug);
    }
    /**
     * category ranking url
     * @param {string} [slug=all] category slug
     * @return {string} category ranking url を返します
     */

  }, {
    key: 'ranking',
    value: function ranking() {
      var slug = arguments.length <= 0 || arguments[0] === undefined ? 'all' : arguments[0];

      return Url.CATEGORY.replace(Url.CATEGORY_SLUG, slug) + 'ranking/';
    }
    /**
     * category video url
     * @param {string} [slug=all] category slug
     * @return {string} category video url を返します
     */

  }, {
    key: 'video',
    value: function video() {
      var slug = arguments.length <= 0 || arguments[0] === undefined ? 'all' : arguments[0];

      return Url.CATEGORY.replace(Url.CATEGORY_SLUG, slug) + 'video/';
    }
    /**
     * 検索ページ url
     * @param {string} keyword 検索ワード
     * @return {*string} 検索ページ url を返します
     */

  }, {
    key: 'search',
    value: function search(keyword) {
      return '/search/' + keyword;
    }
    /**
     * signup url
     * @param {string} [path=''] path option
     * @return {string} signup url を返します
     */

  }, {
    key: 'signup',
    value: function signup() {
      var path = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      var base = '/signup/';

      switch (path) {

        case 'account':
          return base + 'account';

        case 'interest':
          return base + 'interest';

        case '':
          return base;

        default:
          console.warn('signup illegal value: ' + path + ', instead use default');
          return base;

      }
    }
    /**
     * login url
     * @return {string} login url を返します
     */

  }, {
    key: 'login',
    value: function login() {
      return '/login/';
    }

    /**
     * logout url
     * @return {string} logout url を返します
     */

  }, {
    key: 'logout',
    value: function logout() {
      return '/logout/';
    }
    /**
     * reset_password url
     * @param {string} [path=''] path option
     * @return {*} reset_password url を返します
     */

  }, {
    key: 'password',
    value: function password() {
      var path = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      var base = '/reset_password/';

      switch (path) {

        case 'resetting':
          return base + 'resetting';

        case '':
          return base;

        default:
          console.warn('password illegal value: ' + path + ', instead use default');
          return base;
      }
    }
    /**
     * mypage url
     * @param {string} [path=''] path option
     * @return {*} mypage url を返します
     */

  }, {
    key: 'mypage',
    value: function mypage() {
      var path = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      var base = '/mypage/';

      switch (path) {

        case 'activities':
          return base + 'activities';

        case '':
          return base;

        default:
          console.warn('mypage illegal value: ' + path + ', instead use default');
          return base;
      }
    }
    /**
     * notifications url
     * @return {string} notifications url を返します
     */

  }, {
    key: 'notifications',
    value: function notifications() {
      return '/notifications/';
    }
    /**
     * settings url
     * @param {string} [path=''] path option
     * @return {*} settings url を返します
     */

  }, {
    key: 'settings',
    value: function settings() {
      var path = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      var base = '/settings/';

      switch (path) {

        case 'interest':
          return base + 'interest';

        case 'social':
          return base + 'social';

        case 'deactivate':
          return base + 'deactivate';

        case '':
          return base;

        default:
          console.warn('settings illegal value: ' + path + ', instead use default');
          return base;
      }
    }
  }, {
    key: 'CATEGORY_SLUG',
    get: function get() {
      return '__SLUG__';
    }
    /**
     * @return {string} category url base
     */

  }, {
    key: 'CATEGORY',
    get: function get() {
      return '/category/' + Url.CATEGORY_SLUG + '/';
    }
  }]);
  return Url;
}();