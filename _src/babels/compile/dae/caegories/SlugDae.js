/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/09 - 14:54
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
exports.SlugDae = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Safety = require('../../data/Safety');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * カテゴリー一覧, カテゴリー毎のデータ
 */

var SlugDae = exports.SlugDae = function () {
  /**
   * カテゴリー一覧, カテゴリー毎のデータ
   * @param {Object} [category={}] カテゴリー一覧, 1 カテゴリーdata
   */

  function SlugDae() {
    var category = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, SlugDae);

    category = _Safety.Safety.object(category);
    this._category = category;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {Object|*} 1 カテゴリーdata
   */

  (0, _createClass3.default)(SlugDae, [{
    key: 'category',
    get: function get() {
      return this._category;
    }
    /**
     * @return {Number} category Id を返します
     */

  }, {
    key: 'id',
    get: function get() {
      return this.category.id;
    }
    /**
     * @return {string} category label を返します
     */

  }, {
    key: 'label',
    get: function get() {
      return this.category.label;
    }
    /**
     * @return {string} category slug を返します
     */

  }, {
    key: 'slug',
    get: function get() {
      return this.category.slug;
    }
    /**
     * @return {string} category url を返します
     */

  }, {
    key: 'url',
    get: function get() {
      return this.category.url;
    }
  }]);
  return SlugDae;
}();