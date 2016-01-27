/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/27 - 18:48
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
exports.Cookie = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

/**
 * <h3>cookie を取得します</h3>
 * 全て static です
 */

var Cookie = exports.Cookie = function () {
  /**
   * <p>取得機能だけを実装しました</p>
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function Cookie(target) {
    (0, _classCallCheck3.default)(this, Cookie);

    if (_symbol !== target) {

      throw new Error('Cookie is static Class. not use new Cookie().');
    }
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {string} cookie key name を返します
   */

  (0, _createClass3.default)(Cookie, null, [{
    key: 'item',

    /**
     * cookie value を取得します
     * @param {string} keyName cookie key name
     * @return {string|null} cookie 値を返します、取得できない時は null を返します
     */
    // ---------------------------------------------------
    //  METHOD
    // ---------------------------------------------------
    value: function item(keyName) {
      return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(keyName).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
    }
  }, {
    key: 'TARGET',
    get: function get() {
      return 'COOKIE_NAME';
    }
  }]);
  return Cookie;
}();