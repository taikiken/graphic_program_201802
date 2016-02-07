/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/27 - 19:55
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewsAuth = undefined;

var _OffsetAuth2 = require('../OffsetAuth');

var _Api = require('../../net/Api');

var _User = require('../../app/User');

var _Length = require('../../app/const/Length');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * **認証**（ログイン）<br>
 * home 通常記事一覧
 */

var NewsAuth = exports.NewsAuth = function (_OffsetAuth) {
  (0, _inherits3.default)(NewsAuth, _OffsetAuth);

  /**
   * <p>home 通常記事一覧を取得します<br>
   * length は取得件数です。</p>
   * ** default: 10 ** を必要なら変更します
   *
   * **認証**（ログイン）
   *
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [offset=0] query offset 値
   * @param {Number} [length=10] query length 値
   */

  function NewsAuth() {
    var resolve = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var reject = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var offset = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
    var length = arguments.length <= 3 || arguments[3] === undefined ? _Length.Length.archive : arguments[3];
    (0, _classCallCheck3.default)(this, NewsAuth);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NewsAuth).call(this, _User.User.token, _Api.Api.home(), resolve, reject, offset, length));
  }

  return NewsAuth;
}(_OffsetAuth2.OffsetAuth);