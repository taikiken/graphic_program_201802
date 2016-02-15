/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/14
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionAuthBehavior = undefined;

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

var _ActionAuth2 = require('./ActionAuth');

var _Result = require('../data/Result');

var _Safety = require('../data/Safety');

var _Types = require('../net/Types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Ajax request, POST / PUT / DELETE
 */

var ActionAuthBehavior = exports.ActionAuthBehavior = function (_ActionAuth) {
  (0, _inherits3.default)(ActionAuthBehavior, _ActionAuth);

  /**
   * GET 以外の token 付きリクエストに使用します
   * @param {string} token Authorization token
   * @param {Type} types Types instance, Ajax request に使用します
   * @param {FormData} [formData=null] FormData リクエストで必要の場合に使用します
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {*|Result} [ResultClass=Result] 成功結果をセットする data class
   */

  function ActionAuthBehavior(token, types) {
    var formData = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var resolve = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    var reject = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];
    var ResultClass = arguments.length <= 5 || arguments[5] === undefined ? _Result.Result : arguments[5];
    (0, _classCallCheck3.default)(this, ActionAuthBehavior);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ActionAuthBehavior).call(this, token, types, resolve, reject, ResultClass));

    _this._data = formData;
    return _this;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * 設定された FormData instance
   * @returns {FormData} 設定された FormData instance を返します
   */

  (0, _createClass3.default)(ActionAuthBehavior, [{
    key: 'start',

    // ---------------------------------------------------
    //  METHOD
    // ---------------------------------------------------
    /**
     * Ajax request を開始します
     * @param {string} [method=this.method] request method GET|POST|DELETE|PUT...
     */
    value: function start() {
      var method = arguments.length <= 0 || arguments[0] === undefined ? this.method : arguments[0];

      method = _Safety.Safety.string(method, this.method);
      this._ajax.start(this.url, method, this.success.bind(this), this.fail.bind(this), this._resultClass, this._headers, this._data);
    }
  }, {
    key: 'data',
    get: function get() {
      return this._data;
    }
    /**
     * FormData instance 設定します
     * @param {FormData} formData FormData instance
     */
    ,
    set: function set(formData) {
      this._data = formData;
    }
  }]);
  return ActionAuthBehavior;
}(_ActionAuth2.ActionAuth);