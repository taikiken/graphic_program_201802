/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/21 - 13:39
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

/**
 * FormData へ append する key, value
 */

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Data = undefined;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Data = exports.Data = function () {
  /**
   * Ajax request に使用する FormData へ append する key, value
   * @param {string} key form key(name)
   * @param {string} value form value 値
   */

  function Data(key, value) {
    (0, _classCallCheck3.default)(this, Data);

    this._key = key;
    this._value = value;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {string|*} form key(name) を返します
   */

  (0, _createClass3.default)(Data, [{
    key: 'key',
    get: function get() {
      return this._key;
    }
    /**
     *
     * @return {string|*} form value 値 を返します
     */

  }, {
    key: 'value',
    get: function get() {
      return this._value;
    }
  }]);
  return Data;
}();