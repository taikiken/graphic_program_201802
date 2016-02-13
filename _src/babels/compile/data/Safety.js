/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 16:49
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

var _isInteger = require('babel-runtime/core-js/number/is-integer');

var _isInteger2 = _interopRequireDefault(_isInteger);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Safety = undefined;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

/**
 * <h3>データが安全かを調べます</h3>
 * 全て static
 */

var Safety = exports.Safety = function () {
  /**
   * static class です、instance を作成できません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function Safety(target) {
    (0, _classCallCheck3.default)(this, Safety);

    if (_symbol !== target) {

      throw new Error('Safety is static Class. not use new Safety().');
    }
  }
  /**
   * object に keyName が存在することと type があっているかを調べます
   * @param {Object} object 調査対象 Object
   * @param {string} keyName 調査対象キー名称
   * @param {string} [type=string] 調査対象型
   * @return {boolean} 調べた結果を真偽値で返します
   */

  (0, _createClass3.default)(Safety, null, [{
    key: 'check',
    value: function check(object, keyName) {
      var type = arguments.length <= 2 || arguments[2] === undefined ? 'string' : arguments[2];

      type = Safety.string(type, 'string');
      type = type.toLowerCase();

      if (type === 'array') {

        return object.hasOwnProperty(keyName) && Array.isArray(object[keyName]);
      } else {

        return object.hasOwnProperty(keyName) && (0, _typeof3.default)(object[keyName]) === type;
      }
    }
    /**
     * 配列かを調べ必ず Array 型を返します
     * @param {*} [value=[]] 配列かを調べる対象
     * @return {Array} 必ず配列を返します。引数が配列で無い時は空配列を返します
     */

  }, {
    key: 'array',
    value: function array() {
      var value = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      if (!Array.isArray(value)) {
        return [].slice(0);
      }

      return value;
    }
    /**
     * Objectかを調べ null は {} に変え返します
     * @param {*} [value={}] Objectかを調べる対象
     * @return {Object} 必ずObjectを返します。引数が null の時は空Objectを返します
     */

  }, {
    key: 'object',
    value: function object() {
      var value = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      if (value === null || typeof value === 'undefined') {
        value = (0, _create2.default)({});
      }

      return value;
    }
    /**
     * string 型かを調べ null の時は default value をセットします
     * @param {string} value 調査対象
     * @param {string} defaultValue null の時にセットする値
     * @return {string} 文字型を返します
     */

  }, {
    key: 'string',
    value: function string(value, defaultValue) {

      if (value === null || typeof value === 'undefined') {
        value = defaultValue;
      }

      return value;
    }
    /**
     * integer かを調べ null の時は default value をセットします
     * @param {Number} value 調査対象
     * @param {Number} defaultValue null の時にセットする値
     * @return {Number} Number 型を返します
     */

  }, {
    key: 'integer',
    value: function integer(value, defaultValue) {

      if (!(0, _isInteger2.default)(value)) {
        value = defaultValue;
      }

      return value;
    }
    /**
     * Element かどうかを調べます
     * @param {Element} element
     * @returns {boolean} Element かどうかの真偽値を返します
     */

  }, {
    key: 'isElement',
    value: function isElement(element) {
      return element !== null && typeof element !== 'undefined' && 'appendChild' in element;
    }
    /**
     * ファイル名から拡張子を取得します
     * @param {string} fileName 取得したいファイル名称
     * @returns {string} ファイル名の拡張子を返します
     */

  }, {
    key: 'getExtension',
    value: function getExtension(fileName) {
      // http://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript
      var split = fileName.split('.');

      if (split.length === 1 || split[0] === '' && split.length === 2) {
        console.warn('not correct file name. ' + fileName);
        return '';
      }

      return split.pop().toLowerCase();
    }
    /**
     * 拡張子から画像ファイルかを調べます
     * @param {string} fileName 調査対象ファイル名
     * @returns {boolean} 'jpg', 'png', 'jpeg', 'gif', 'svg' のいづれかに該当するかの真偽値を返します
     */

  }, {
    key: 'isImg',
    value: function isImg(fileName) {
      return ['jpg', 'png', 'jpeg', 'gif', 'svg'].indexOf(Safety.getExtension(fileName)) !== -1;
    }
  }]);
  return Safety;
}();