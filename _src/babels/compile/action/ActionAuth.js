/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/27 - 17:52
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
exports.ActionAuth = undefined;

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

var _Action2 = require('./Action');

var _User = require('../app/User');

var _HeadersOption = require('../app/HeadersOption');

var _Safety = require('../data/Safety');

var _Result = require('../data/Result');

var _Types = require('../net/Types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * **要認証** Ajax 処理を行います<br>
 * Template Pattern として使用します<br>
 * 各 Class で extends して下さい
 */

var ActionAuth = exports.ActionAuth = function (_Action) {
  (0, _inherits3.default)(ActionAuth, _Action);

  /**
   * **要認証** Ajax 処理
   * @param {string} token Authorization token
   * @param {Type} types Types instance, Ajax request に使用します
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {*|Result} [ResultClass=Result] 成功結果をセットする data class
   */

  function ActionAuth(token, types) {
    var resolve = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var reject = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    var ResultClass = arguments.length <= 4 || arguments[4] === undefined ? _Result.Result : arguments[4];
    (0, _classCallCheck3.default)(this, ActionAuth);

    if (!_User.User.sign) {
      // not login
      throw new Error('Authorization required.');
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ActionAuth).call(this, types, resolve, reject, ResultClass));

    _this._headers = _HeadersOption.HeadersOption.token(token);
    return _this;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   * @param {string} [method=this.method] request method GET|POST|DELETE|PUT...
   */

  (0, _createClass3.default)(ActionAuth, [{
    key: 'start',
    value: function start() {
      var method = arguments.length <= 0 || arguments[0] === undefined ? this.method : arguments[0];

      method = _Safety.Safety.string(method, this.method);
      this._ajax.start(this.url, method, this.success.bind(this), this.fail.bind(this), this._resultClass, this._headers);
    }
  }]);
  return ActionAuth;
}(_Action2.Action);