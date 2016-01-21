/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/09 - 16:19
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
exports.Api = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _Types = require('./Types');

var _User = require('./User');

var _ApiDae = require('./dae/ApiDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

/**
 * <h3>サーバーリクエストAPIを管理します</h3>
 * 全て static
 */

var Api = exports.Api = function () {
  /**
   * static class です、instance を作成できません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function Api(target) {
    (0, _classCallCheck3.default)(this, Api);

    if (_symbol !== target) {

      throw new Error('Api is not new Api().');
    }
  }

  /**
   * /api/ 前 domain を再生成します
   * test, develop 切り替えに使用します
   */

  (0, _createClass3.default)(Api, null, [{
    key: 'rebuild',
    value: function rebuild() {

      _ApiDae.ApiDae.rebuild();
    }

    /**
     * login API を取得します
     * @returns {Types} login API をTypes instanceで返します
     */

  }, {
    key: 'login',
    value: function login() {

      return _ApiDae.ApiDae.api('login');
    }

    /**
     * home API を login している / していない に合わせ取得します
     * @returns {Types} home API(home / self)をTypes instanceで返します
     */

  }, {
    key: 'home',
    value: function home() {

      return _User.User.sign ? _ApiDae.ApiDae.api('self') : _ApiDae.ApiDae.api('home');
    }

    /**
     * ログインなしユーザーのhome API
     * @returns {Types} ログインなしユーザーのhome APIをTypes instanceで返します
     */

  }, {
    key: 'homeAPi',
    value: function homeAPi() {

      return _ApiDae.ApiDae.api('home');
    }

    /**
     * ログイン済みユーザーのhome API
     * @method selfAPi
     * @returns {Types} ログイン済みユーザーのhome APIをTypes instanceで返します
     */

  }, {
    key: 'selfAPi',
    value: function selfAPi() {

      return _ApiDae.ApiDae.api('self');
    }

    /**
     * category API を取得します
     * @returns {Types} category API を Types instance で取得します
     */

  }, {
    key: 'category',
    value: function category() {

      return _ApiDae.ApiDae.api('category');
    }

    /**
     * search API を取得します
     * @returns {Types} category API をTypes instanceで返します
     */

  }, {
    key: 'search',
    value: function search() {

      return _ApiDae.ApiDae.api('search');
    }

    /**
     * category API を取得します
     * @returns {Types} category API をTypes instanceで返します
     */

  }, {
    key: 'detail',
    value: function detail() {

      return _ApiDae.ApiDae.api('detail');
    }

    /**
     * bookmark API を取得します
     * @param {string} [action=add] path option を指定します
     * @returns {Types} bookmark API をTypes instanceで返します
     */

  }, {
    key: 'bookmark',
    value: function bookmark() {
      var action = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      switch (action) {
        case 'delete':
          return _ApiDae.ApiDae.api('bookmark:delete');

        case 'add':
          return _ApiDae.ApiDae.api('bookmark:add');

        case '':
          return _ApiDae.ApiDae.api('bookmark');

        default:
          console.warn('bookmark illegal action: ' + action + ', instead use default');
          return _ApiDae.ApiDae.api('bookmark');
      }
    }

    /**
     * comment API を取得します
     * @param {string} [action=''] path option を指定します
     * @returns {Types} comment API をTypes instanceで返します
     */

  }, {
    key: 'comment',
    value: function comment() {
      var action = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      switch (action) {
        case 'send':
          return _ApiDae.ApiDae.api('comment:send');

        case 'reply':
          return _ApiDae.ApiDae.api('comment:reply');

        case 'send:edit':
          return _ApiDae.ApiDae.api('comment:send:edit');

        case 'reply:edit':
          return _ApiDae.ApiDae.api('comment:reply:edit');

        case 'send:delete':
          return _ApiDae.ApiDae.api('comment:send:delete');

        case 'reply:delete':
          return _ApiDae.ApiDae.api('comment:reply:delete');

        case 'good:add':
          return _ApiDae.ApiDae.api('comment:good:add');

        case 'good:delete':
          return _ApiDae.ApiDae.api('comment:good:delete');

        case 'bad:add':
          return _ApiDae.ApiDae.api('comment:bad:add');

        case 'bad:delete':
          return _ApiDae.ApiDae.api('comment:bad:delete');

        case '':
          return _ApiDae.ApiDae.api('comment');

        default:
          console.warn('comment illegal action: ' + action + ', instead use default');
          return _ApiDae.ApiDae.api('comment');
      }
    }

    /**
     * users API を取得します
     * @param {string} [action=''] path option を指定します
     * @returns {Types} category users をTypes instanceで返します
     */

  }, {
    key: 'users',
    value: function users() {
      var action = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      switch (action) {
        case 'notice':
          return _ApiDae.ApiDae.api('users:notice');

        case 'notice:read':
          return _ApiDae.ApiDae.api('users:notice:read');

        case 'bookmark':
          return _ApiDae.ApiDae.api('users:bookmark');

        case 'activity':
          return _ApiDae.ApiDae.api('users:activity');

        case '':
          return _ApiDae.ApiDae.api('users');

        default:
          console.warn('users illegal action: ' + action + ', instead use default');
          return _ApiDae.ApiDae.api('users');

      }
    }
  }]);
  return Api;
}();