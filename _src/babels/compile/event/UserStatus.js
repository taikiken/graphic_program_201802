/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/02 - 20:54
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
exports.UserStatus = undefined;

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

var _EventDispatcher2 = require('./EventDispatcher');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();
var _instance = null;

/**
 * ログイン / ログアウト を通知
 */

var UserStatus = exports.UserStatus = function (_EventDispatcher) {
  (0, _inherits3.default)(UserStatus, _EventDispatcher);

  /**
   * ログイン / ログアウト を通知する SingleTon
   * @example
   * var userStatus = UserStatus.factory();
   *
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {UserStatus} UserStatus インスタンスを返します
   */

  function UserStatus(target) {
    var _ret;

    (0, _classCallCheck3.default)(this, UserStatus);

    if (_symbol !== target) {

      throw new Error('UserStatus is static Class. not use new UserStatus().');
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(UserStatus).call(this));

    return _ret = _this, (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  /**
   * UserStatus.LOGE_IN event を fire します
   */

  (0, _createClass3.default)(UserStatus, [{
    key: 'login',
    value: function login() {
      this.dispatch({ type: UserStatus.LOGE_IN });
    }
    /**
     * UserStatus.LOGE_OUT event を fire します
     */

  }, {
    key: 'logout',
    value: function logout() {
      this.dispatch({ type: UserStatus.LOGE_OUT });
    }
    /**
     * LOGE_IN event
     * @return {string} LOGE_IN event type を返します
     */

  }], [{
    key: 'factory',

    /**
     * instance を生成します
     * @return {UserStatus} UserStatus instance を返します
     */
    value: function factory() {

      if (_instance === null) {

        _instance = new UserStatus(_symbol);
      }

      return _instance;
    }
  }, {
    key: 'LOGE_IN',
    get: function get() {
      return 'logIn';
    }
    /**
     * LOGE_OUT event
     * @return {string} LOGE_OUT event type を返します
     */

  }, {
    key: 'LOGE_OUT',
    get: function get() {
      return 'logOut';
    }
  }]);
  return UserStatus;
}(_EventDispatcher2.EventDispatcher);