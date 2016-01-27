/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/27 - 18:05
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
exports.OffsetAuth = undefined;

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

var _Offset2 = require('./Offset');

var _User = require('../app/User');

var _HeadersOption = require('../app/HeadersOption');

var _Result = require('../data/Result');

var _Types = require('../net/Types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * **要認証** Ajax 処理を行います<br>
 * Template Pattern として使用します<br>
 * 各 Class で extends して下さい
 */

var OffsetAuth = exports.OffsetAuth = function (_Offset) {
  (0, _inherits3.default)(OffsetAuth, _Offset);

  /**
   * **要認証** Ajax 処理, queryあり<br>
   * **Next 読込** がある時に使用します
   * @param {string} token Authorization token
   * @param {Type} types Types instance, Ajax request に使用します
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [offset=0] query offset 値
   * @param {Number} [length=10] query length 値
   * @param {*|Result} [ResultClass=Result] 成功結果をセットする data class
   */

  function OffsetAuth(token, types) {
    var resolve = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var reject = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    var offset = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
    var length = arguments.length <= 5 || arguments[5] === undefined ? 10 : arguments[5];
    var ResultClass = arguments.length <= 6 || arguments[6] === undefined ? _Result.Result : arguments[6];
    (0, _classCallCheck3.default)(this, OffsetAuth);

    if (!_User.User.sign) {
      // not login
      throw new Error('Authorization required.');
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(OffsetAuth).call(this, types, resolve, reject, offset, length, ResultClass));

    _this._headers = _HeadersOption.HeadersOption.token(token);
    return _this;
  }
  /**
   * 次の読込を開始します<br>
   * start の代わりに使用します
   * @param {string} [method=this.method] request method GET|POST|DELETE|PUT...
   */

  (0, _createClass3.default)(OffsetAuth, [{
    key: 'next',
    value: function next() {
      var method = arguments.length <= 0 || arguments[0] === undefined ? this.method : arguments[0];

      // next data があるかないかを調べます
      // next がある時は Ajax を実行します
      if (this.hasNext()) {

        this._ajax.start(this.url, method, this.success.bind(this), this.fail.bind(this), this._resultClass, this._headers);
      }
    }
  }]);
  return OffsetAuth;
}(_Offset2.Offset);