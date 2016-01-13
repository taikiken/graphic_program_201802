/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/09 - 16:19
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
exports.Ajax = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Codes = require('./Codes');

var _Result = require('../data/Result');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 非同期通信でJSONを取得します
 */

var Ajax = exports.Ajax = function () {
  /**
   * instanceを作成します
   *
   */

  function Ajax() {
    (0, _classCallCheck3.default)(this, Ajax);

    // 実行可否判断 flag は trueです
    this._can = true;
  }

  /**
   *
   * @param {string} url request URL
   * @param {string} method POST|GET...
   * @param {Function} resolve success callback
   * @param {Function} reject fail callback
   */

  (0, _createClass3.default)(Ajax, [{
    key: 'start',
    value: function start(url, method, resolve, reject) {

      var fetch = self.fetch;
      var _this = this;

      // 実行可否をチェックし, false の時は何もしません
      if (!this.can) {

        var error = new Error('status:999, message:duplicate or busy.');
        error.response = {};
        error.number = 999;
        reject(error);
        return;
      }

      // flag off
      this.disable();

      console.log('ajax.start: ' + url + ', ' + method);

      // https://github.com/github/fetch
      // request を開始します
      fetch(url, {
        method: method
      }).then(function (response) {
        // check status (Server)
        var status = response.status;

        if (status >= 200 && status < 300) {
          // may be ok
          return response;
        } else {

          // bad response, サーバーからのエラーメッセージ
          var error = new Error('status:' + status + ', message:' + response.statusText);
          error.response = response;
          error.number = status;
          throw error;
        }
      }).then(function (response) {

        // parse JSON
        return response.json();
      }).then(function (json) {
        // parsed JSON
        var result = new _Result.Result(json);

        if (!_Codes.Codes.status(result.status.code)) {
          // something bad
          var code = result.status.code;
          var error = new Error('status:' + code + ', user:' + result.status.user_message + ', dev:' + result.status.developer_message);
          error.response = result.response;
          error.number = result.status.code;
          throw error;
        }

        _this.enable();
        resolve(result);
      }).catch(function (error) {

        _this.enable();
        reject(error);
      });
    }

    /**
     * 実行可否 flag を true にします
     */

  }, {
    key: 'enable',
    value: function enable() {

      this._can = true;
    }
    /**
     * 実行可否 flag を false にします
     */

  }, {
    key: 'disable',
    value: function disable() {

      this._can = false;
    }

    /**
     *
     * @return {boolean} 実行可否 flag を返します
     */

  }, {
    key: 'can',
    get: function get() {

      return this._can;
    }
  }]);
  return Ajax;
}();