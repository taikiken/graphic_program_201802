/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 18:19
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

/**
 * article.user.type
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeDae = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TypeDae = exports.TypeDae = function () {
  /**
   * article.user.type
   * @param {Object} [type={}] article.user.type
   */

  function TypeDae() {
    var type = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, TypeDae);

    this._type = type;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {Object|*} article.user.type
   */

  (0, _createClass3.default)(TypeDae, [{
    key: 'type',
    get: function get() {
      return this._type;
    }
    /**
     * @return {string|*} article.user.type.id
     */

  }, {
    key: 'id',
    get: function get() {
      return this.type.id;
    }
    /**
     * @return {string|*} article.user.type.label
     */

  }, {
    key: 'label',
    get: function get() {
      return this.type.label;
    }
  }]);
  return TypeDae;
}();