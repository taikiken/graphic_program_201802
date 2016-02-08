/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 17:08
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
exports.CategoryDae = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Safety = require('../data/Safety');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * article.category を管理します
 */

var CategoryDae = exports.CategoryDae = function () {
  /**
   * article.category を管理します
   * @param {Object} [category={}]
   */

  function CategoryDae() {
    var category = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, CategoryDae);

    category = _Safety.Safety.object(category);
    this._category = category;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {Object|*} article.category を返します
   */

  (0, _createClass3.default)(CategoryDae, [{
    key: 'category',
    get: function get() {
      return this._category;
    }
    /**
     *
     * @return {string|undefined} article.category.label を返します
     */

  }, {
    key: 'label',
    get: function get() {
      return this.category.label;
    }
    /**
     *
     * @return {string|undefined} article.category.slug を返します
     */

  }, {
    key: 'slug',
    get: function get() {
      return this.category.slug;
    }
  }]);
  return CategoryDae;
}();