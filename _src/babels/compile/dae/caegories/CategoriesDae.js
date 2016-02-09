/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/09 - 14:50
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
exports.CategoriesDae = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Safety = require('../../data/Safety');

var _SlugDae = require('./SlugDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * カテゴリー一覧 response を管理します
 */

var CategoriesDae = exports.CategoriesDae = function () {
  /**
   * カテゴリー一覧 response を管理します
   * @param {Object} [response={}] JSON response
   */

  function CategoriesDae() {
    var response = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, CategoriesDae);

    response = _Safety.Safety.object(response);
    var categories = _Safety.Safety.array(response.categories);

    var cats = [];
    var bank = {};

    // categories からデータを取り出し SlugDae instance を作成
    // cats: 配列にそのまま保持
    // bank: slug をキーにそ保持
    categories.forEach(function (category) {

      var slugDae = new _SlugDae.SlugDae(category);
      cats.push(slugDae);
      bank[slugDae.slug] = slugDae;
    });

    this._response = response;
    this._categories = categories;
    this._cats = cats;
    this._bank = bank;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {Object|*} JSON response を返します
   */

  (0, _createClass3.default)(CategoriesDae, [{
    key: 'bySlug',

    // ---------------------------------------------------
    //  METHOD
    // ---------------------------------------------------
    /**
     * @param {string} slug 検索したい slug
     * @return {SlugDae} 該当 SlugDae を返します
     */
    value: function bySlug(slug) {
      return this._bank[slug];
    }
  }, {
    key: 'response',
    get: function get() {
      return this._response;
    }
    /**
     * @return {Array|*} JSON response.categories を返します
     */

  }, {
    key: 'categories',
    get: function get() {
      return this._categories;
    }
    /**
     * @return {Array<SlugDae>|*} response.categories を SlugDae instance 配列にし返します
     */

  }, {
    key: 'all',
    get: function get() {
      return this._cats;
    }
    /**
     * @return {{}|*} slug をキーにした SlugDae instance 全て
     */

  }, {
    key: 'bank',
    get: function get() {
      return this._bank;
    }
    /**
     * alias total
     * @return {Number} JSON response.count を返します
     */

  }, {
    key: 'count',
    get: function get() {
      return this.total;
    }
    /**
     * @return {Number} JSON response.count を返します
     */

  }, {
    key: 'total',
    get: function get() {
      return this.response.count;
    }
  }]);
  return CategoriesDae;
}();