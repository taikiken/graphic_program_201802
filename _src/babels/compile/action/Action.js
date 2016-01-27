/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/13 - 15:00
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
exports.Action = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Result = require('../data/Result');

var _Ajax = require('../net/Ajax');

var _Types = require('../net/Types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// interface
// 基本機能を設定し Interface として使用します

/**
 * Ajax 処理を行います<br>
 * Template Pattern として使用します<br>
 * 各 Class で extends します
 */

var Action = exports.Action = function () {
  /**
   * Ajax 処理, query なし<br>
   * 1回だけのリクエストに使用します
   * @param {Types} types Types instance, Ajax request に使用します
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {*|Result} [ResultClass=Result] 成功結果をセットする data class
   */

  function Action(types) {
    var resolve = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var reject = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var ResultClass = arguments.length <= 3 || arguments[3] === undefined ? _Result.Result : arguments[3];
    (0, _classCallCheck3.default)(this, Action);

    this._types = types;
    this._resolve = resolve;
    this._reject = reject;
    this._ajax = new _Ajax.Ajax();
    this._url = types.url;
    this._method = types.method;
    this._resultClass = ResultClass;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * url を作成します
   * @return {string} 作成した url を返します
   */

  (0, _createClass3.default)(Action, [{
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

      this._ajax.start(this.url, method, this.success.bind(this), this.fail.bind(this), this._resultClass);
    }
    /**
     * Ajax success callback
     * @param {Result} result Ajax成功結果
     */

  }, {
    key: 'success',
    value: function success(result) {

      // success
      var resolve = this._resolve;

      if (typeof resolve === 'function') {

        resolve(result);
      }
    }
    /**
     * Ajax error callback
     * @param {Error} error Ajax失敗結果
     */

  }, {
    key: 'fail',
    value: function fail(error) {

      // error
      var reject = this._reject;

      if (typeof reject === 'function') {

        reject(error);
      }
    }
  }, {
    key: 'url',
    get: function get() {
      return this._url;
    }

    /**
     * @return {string|*} method, GET|POST|DELETE|PUT... を返します
     */

  }, {
    key: 'method',
    get: function get() {
      return this._method;
    }
  }]);
  return Action;
}();