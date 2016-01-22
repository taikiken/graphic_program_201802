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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();
var _sign = false;
var _id = -1;

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
    }

    /**
     * User id 情報
     * @return {number} User id を返します
     */

  }, {
    key: 'id',
    get: function get() {

      return _id;
    }

    /**
     * User id を設定します
     * @param {number} id User id
     */
    ,
    set: function set(id) {

      _id = id;
    }
  }]);
  return User;
}();