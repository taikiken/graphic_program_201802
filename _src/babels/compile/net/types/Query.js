/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/10 - 16:32
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

/**
 * Api query option を key ごとに管理します
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Query = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Query = exports.Query = function () {
  /**
   * Api query option 情報を保持します
   *
   * <code>?key=value</code>
   *
   * key, value型, default値, 必須情報...
   *
   * @param {string} key query key
   * @param {string} type query value type
   * @param {string|Number|null} [defaultValue=null] default value, あれば...
   * @param {boolean} [require=false] 必須フラグ
   */

  function Query(key, type) {
    var defaultValue = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

    var require = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

    (0, _classCallCheck3.default)(this, Query);

    this._key = key;
    this._type = type;
    this._require = require;
    this._value = defaultValue;
  }

  /**
   * @param {string} key query key
   * @return {boolean} query key が存在するかを返します
   */

  (0, _createClass3.default)(Query, [{
    key: 'has',
    value: function has(key) {

      return this._key === key;
    }

    /**
     * @param {string} key query key
     * @return {*} {{key: string, type: string, require: boolean, value: *}}|null を返します
     */

  }, {
    key: 'search',
    value: function search(key) {

      if (this.has(key)) {

        return {
          key: this._key,
          type: this._type,
          require: this._require,
          value: this._value
        };
      }

      return null;
    }
  }]);
  return Query;
}();