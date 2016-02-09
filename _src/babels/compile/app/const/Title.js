/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/09 - 15:52
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
exports.Title = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();
var _category = {
  all: '新着順',
  ranking: 'ランキング',
  video: '動画'
};

/**
 * 各ページのタイトル
 */

var Title = exports.Title = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function Title(target) {
    (0, _classCallCheck3.default)(this, Title);

    if (_symbol !== target) {

      throw new Error('Title is static Class. not use new Title().');
    }
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {string} 検索キーワード置き換え文字列
   */

  (0, _createClass3.default)(Title, null, [{
    key: 'searchTitle',

    // ---------------------------------------------------
    //  METHOD
    // ---------------------------------------------------
    /**
     * 検索タイトルの雛形 から 検索文字列 を使用しタイトルを生成します
     * @param {string} keyword 検索文字列
     * @return {string} 検索タイトルの雛形 から 検索文字列 を使用しタイトルを生成し返します
     */
    value: function searchTitle(keyword) {
      return Title.search.replace(Title.SEARCH_WORD, keyword);
    }
    /**
     *
     * @param {string} slug category slug, type
     * @return {*}
     */

  }, {
    key: 'categoryTitle',
    value: function categoryTitle(slug) {
      return _category[slug];
    }
  }, {
    key: 'SEARCH_WORD',
    get: function get() {
      return '|__SEARCH_WORD__|';
    }
    /**
     * @return {string} カテゴリー slug all のタイトルを返します
     */

  }, {
    key: 'all',
    get: function get() {
      return _category.all;
    }
    /**
     * @return {string} カテゴリー type ranking のタイトルを返します
     */

  }, {
    key: 'ranking',
    get: function get() {
      return _category.ranking;
    }
    /**
     * @return {string} カテゴリー type video のタイトルを返します
     */

  }, {
    key: 'video',
    get: function get() {
      return _category.video;
    }
    /**
     * @return {string} 検索タイトルの雛形を返します
     */

  }, {
    key: 'search',
    get: function get() {
      return '「' + Title.SEARCH_WORD + '」の検索結果';
    }
  }]);
  return Title;
}();