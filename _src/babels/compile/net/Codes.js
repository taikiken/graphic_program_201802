/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/09 - 17:31
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

/**
 * API Response Code を管理します
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Codes = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Codes = exports.Codes = function () {
  /**
   * ステータスコード・メッセージを日本語と英語で保存しています
   */

  function Codes() {
    (0, _classCallCheck3.default)(this, Codes);

    /**
     * ステータスコード：英語
     * @type {{200: string, 201: string, 202: string, 204: string, 400: string, 401: string, 403: string, 404: string, 405: string, 409: string, 415: string, 429: string, 500: string, 502: string}}
     */
    this._en = {
      200: 'OK',
      201: 'Created',
      202: 'Accepted',
      204: 'No Content',

      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      405: 'Method Not Allowed',
      409: 'Conflict',
      415: 'Unsupported Media Type',
      429: 'Too Many Requests',
      500: 'Internal Server Error',
      502: 'Service Unavailable'
    };
    /**
     * ステータスコード：日本語
     * @type {{200: string, 201: string, 202: string, 204: string, 400: string, 401: string, 403: string, 404: string, 405: string, 409: string, 415: string, 429: string, 500: string, 502: string}}
     */
    this._jp = {
      200: '成功',
      201: '新しいリソースを作成した',
      202: 'リクエストを受け付けた',
      204: '内容なし',

      400: 'エラー',
      401: '認証エラー',
      403: 'アクセス禁止',
      404: 'リソースが存在しない',
      405: 'メソッドが間違っている',
      409: 'リソースが競合している',
      415: '指定されたメディアタイプがサポートされていない',
      429: 'リクエストの回数制限に引っかかる',
      500: 'サーバ側の問題',
      502: '一時的にサービス出来ない'
    };
  }

  /**
   * @param {int} statusCode サーバーからのレスポンスコード int型
   * @returns {boolean} statusCodeが成功したか(true)失敗(false)を調べ返します
   */

  (0, _createClass3.default)(Codes, null, [{
    key: 'status',
    value: function status(statusCode) {

      return statusCode >= 200 && statusCode < 400;
    }

    /**
     * status codeの意味を調べます
     * @param {Number} code サーバーからのresponse status code
     * @returns {{en: string|*, jp: string|*}} status codeの意味を返します
     */

  }, {
    key: 'message',
    value: function message(code) {

      var codes = Codes.factory();

      return {
        en: codes._en[code],
        jp: codes._jp[code]
      };
    }

    /**
     * @param {Number} code status code
     * @return {*} 日本語メッセージを返します
     */

  }, {
    key: 'jp',
    value: function jp(code) {

      return Codes.factory()._jp[code];
    }

    /**
     * @param {Number} code status code
     * @return {*} 英語メッセージを返します
     */

  }, {
    key: 'en',
    value: function en(code) {

      return Codes.factory()._jp[code];
    }

    /**
     * @returns {Codes} Codes instance を返します
     */

  }, {
    key: 'factory',
    value: function factory() {

      return new Codes();
    }
  }]);
  return Codes;
}();