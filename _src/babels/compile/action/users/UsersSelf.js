/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/03 - 16:03
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
exports.UsersSelf = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ActionAuth2 = require('../ActionAuth');

var _Api = require('../../net/Api');

var _User = require('../../app/User');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * <h4>マイページの表示に利用</h4>
 * 自分の情報
 */

var UsersSelf = exports.UsersSelf = function (_ActionAuth) {
  (0, _inherits3.default)(UsersSelf, _ActionAuth);

  /**
   * <p>自分の情報 を取得する</p>
   * **認証**（ログイン）要
   *
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */

  function UsersSelf() {
    var resolve = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var reject = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    (0, _classCallCheck3.default)(this, UsersSelf);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(UsersSelf).call(this, _User.User.token, _Api.Api.users('self'), resolve, reject));
  }

  return UsersSelf;
}(_ActionAuth2.ActionAuth);