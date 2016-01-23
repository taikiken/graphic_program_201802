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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Safety = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

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

      return object.hasOwnProperty(keyName) && (0, _typeof3.default)(object[keyName]) === type;
    }
  }]);
  return Safety;
}();