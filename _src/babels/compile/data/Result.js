/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/13 - 15:04
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

/**
 * Ajax 結果を成功時に保存します
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Result = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Result = exports.Result = function () {
  /**
   * Ajax 成功時にdataを保存します<br>
   * success event handler で結果(Result instance)を受け取れます<br>
   *
   * @example
   * let success = (result) => {
   *   // response section 取得
   *   response.response
   *   // status section 取得
   *   response.status
   * }
   *
   * @param {{status: *, response: *}} json json パース後データ
   */

  function Result(json) {
    (0, _classCallCheck3.default)(this, Result);

    this._json = json;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * parsed JSON プロパティ
   * @return {*} パース済みJSON(Object)を返します
   */

  (0, _createClass3.default)(Result, [{
    key: 'data',
    get: function get() {

      return this._json;
    }
    /**
     * 取得 JSON response section
     * @return {Object|undefined} 取得 JSON response section を返します、見つからない時は undefined を返します
     */

  }, {
    key: 'response',
    get: function get() {

      return this.data.response;
    }
    /**
     * 取得 JSON response.articles
     * @return {Array|undefined} 取得 JSON response.articles を返します、見つからない時は undefined を返します
     */

  }, {
    key: 'articles',
    get: function get() {

      var response = this.response;
      var articles = undefined;
      // response.articles を調べる
      // 1. response 存在チェック
      // 2. response に articles key が存在する
      // 3. response.articles が配列
      if (!!response && response.hasOwnProperty('articles') && Array.isArray(response.articles)) {

        articles = response.articles;
      }

      return articles;
    }
    /**
     * 取得 JSON response.count
     * @return {Number|undefined} 取得 JSON response.articles を返します、見つからない時は undefined を返します
     */

  }, {
    key: 'total',
    get: function get() {

      var response = this.response;
      var total = undefined;

      if (!!response && response.hasOwnProperty('count')) {

        total = parseInt(response.count, 10);
      }

      return total;
    }
    /**
     * alias total, 取得 JSON response.count
     * @return {Number|undefined} 取得 JSON response.articles を返します、見つからない時は undefined を返します
     */

  }, {
    key: 'count',
    get: function get() {
      return this.total;
    }
    /**
     * 取得 JSON status section
     * @return {{code: number, user_massage: string,developer_message: string}|undefined} response.status を返します、見つからない時は undefined を返します
     */

  }, {
    key: 'status',
    get: function get() {

      return this.data.status;
    }
    /**
     * request offset, length を返します
     * @return {{offset: number, length: number}|undefined} 取得 JSON request section を返します、見つからない時は undefined を返します
     */

  }, {
    key: 'request',
    get: function get() {

      return this.data.request;
    }
  }]);
  return Result;
}();