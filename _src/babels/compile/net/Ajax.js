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
        reject(error);
        return;
      }

      // flag off
      this.disable();

      // https://github.com/github/fetch
      // request を開始します
      fetch(url, {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        // check status
        var status = response.status;

        if (status >= 200 && status < 300) {
          // ok, may be >= 200 && < 300
          return response;
        } else {
          // bad response, サーバーからのエラーメッセージ
          var error = new Error('status:' + status + ', message:' + response.statusText);
          error.response = response;
          throw error;
        }
      }).then(function (response) {
        // parse JSON
        try {
          // json が壊れている可能性があるので安全を期す
          return {
            data: response.json(),
            response: response
          };
        } catch (err) {
          var error = new Error('status:' + err.code + ', message:' + err.message);
          error.response = response;
          throw error;
        }
      }).then(function (result) {

        if (_Codes.Codes.status(result.response.status.code)) {
          // something bad
          var code = result.response.status.code;
          var error = new Error('status:' + code + ', message:' + _Codes.Codes.jp(code));
          error.response = result.response;
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