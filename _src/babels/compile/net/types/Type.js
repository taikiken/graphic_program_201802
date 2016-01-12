/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/09 - 17:03
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

/**
 * method / url 2つのpropertyを持ちます
 * method: POST | GET
 * utl: API request先
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Type = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Type = exports.Type = function () {
  /**
   * @param {string} url API request先
   * @param {string=GET} [method] POST | GET
   */

  function Type(url) {
    var method = arguments.length <= 1 || arguments[1] === undefined ? 'GET' : arguments[1];
    (0, _classCallCheck3.default)(this, Type);

    this._url = url;
    this._method = method;
  }

  /**
   * @returns {string} API request先を返します
   */

  (0, _createClass3.default)(Type, [{
    key: 'url',
    get: function get() {

      return this._url;
    }

    /**
     * API request先を設定します
     * @param {string} url API request先
     */
    ,
    set: function set(url) {

      this._url = url;
    }

    /**
     * @returns {string} POST | GET を返します
     */

  }, {
    key: 'method',
    get: function get() {

      return this._method;
    }

    /**
     * POST | GET を設定します
     * @param {string} method POST | GETの値
     */
    ,
    set: function set(method) {

      var methodUpper = method.toUpperCase();

      if (methodUpper !== 'GET' && methodUpper !== 'POST') {

        methodUpper = 'GET';
      }

      this._method = methodUpper;
    }
  }]);
  return Type;
}();