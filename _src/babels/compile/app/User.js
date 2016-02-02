/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/12 - 15:54
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
exports.User = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _Cookie = require('../net/Cookie');

var _Env = require('./Env');

var _UserStatus = require('../event/UserStatus');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();
var _sign = false;

/**
 * <h3>ユーザー情報を管理します</h3>
 * 全てstaticです
 */

var User = exports.User = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function User(target) {
    (0, _classCallCheck3.default)(this, User);

    if (_symbol !== target) {

      throw new Error('User is static Class. not use new User().');
    }
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * sign in / out 状態を表します
   * @return {boolean} sign in / out 状態を返します
   */

  (0, _createClass3.default)(User, null, [{
    key: 'login',

    // ---------------------------------------------------
    //  METHOD
    // ---------------------------------------------------
    /**
     * ログイン設定をします
     */
    value: function login() {
      User.sign = true;
    }
    /**
     * ログアウト設定をします
     */

  }, {
    key: 'logout',
    value: function logout() {
      User.sign = false;
    }
  }, {
    key: 'sign',
    get: function get() {

      return _sign;
    }
    /**
     * sign in / out 状態を表します
     * @param {boolean} bool sign in / out 状態の真偽値, true: sign in
     */
    ,
    set: function set(bool) {

      _sign = bool;

      if (bool) {

        _UserStatus.UserStatus.factory().login();
      } else {

        _UserStatus.UserStatus.factory().logout();
      }
    }
    /**
     *
     * @return {string} token を返します, 見つからない時はnullを返します
     */

  }, {
    key: 'token',
    get: function get() {

      if (_sign) {
        switch (_Env.Env.mode) {

          case _Env.Env.TEST:
          case _Env.Env.DEVELOP:
            // return [ 'fee1a989f120b99cec0f8206d68f6365', '608c8868d866a46fa3ae6566ce62e0be', '7c36cbc887ca4d0035440a3b05005f6f' ][ Math.floor( Math.random() * 3 ) ];
            return 'fee1a989f120b99cec0f8206d68f6365';

          case _Env.Env.PRODUCTION:
          default:
            return _Cookie.Cookie.item(_Cookie.Cookie.TARGET);

        }
      } else {
        // 非ログインは空文字を返す
        // debugger
        // Authorization:OAuth realm=undotsushin.com, oautn_token=
        return '';
      }
    }
  }]);
  return User;
}();