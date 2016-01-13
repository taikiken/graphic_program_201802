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
   *  Ajax 成功時にdataを保存します
   * @param {{status: *, responce: *}} json json パース後データ
   */

  function Result(json) {
    (0, _classCallCheck3.default)(this, Result);

    this._json = json;
  }

  /**
   * parsed JSON プロパティ
   * @returns {*} パース済みJSON(Object)を返します
   */

  (0, _createClass3.default)(Result, [{
    key: 'data',
    get: function get() {

      return this._json;
    }

    /**
     * 生 responce
     * @returns {*} 生 responce(JSON) を返します
     */

  }, {
    key: 'responce',
    get: function get() {

      return this.data.responce;
    }

    /**
     * responce.status
     * @returns {{code: number, user_massage: string,developer_message: string}} responce.status を返します
     */

  }, {
    key: 'status',
    get: function get() {

      return this.data.status;
    }
  }]);
  return Result;
}();