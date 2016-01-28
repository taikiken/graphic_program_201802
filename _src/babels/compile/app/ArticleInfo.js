/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/28 - 18:44
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
exports.ArticleInfo = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _ArticleDae = require('../dae/ArticleDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();
var _article = undefined;

/**
 * <h3>articles の個別記事詳細情報</h3>
 * 全てstaticです<br>
 * **Singleton**
 * <p>
 * ArticleDae を保持します。
 * </p>
 */

var ArticleInfo = exports.ArticleInfo = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function ArticleInfo(target) {
    (0, _classCallCheck3.default)(this, ArticleInfo);

    if (_symbol !== target) {

      throw new Error('Article is static Class. not use new Article().');
    }
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * 現在表示の記事詳細情報
   * @return {ArticleDae} 現在表示の記事詳細情報 ArticleDae instance を返します
   */

  (0, _createClass3.default)(ArticleInfo, null, [{
    key: 'dae',
    get: function get() {
      return _article;
    }

    /**
     * @param {ArticleDae} article 現在表示の記事詳細情報 ArticleDae instance
     */
    ,
    set: function set(article) {
      _article = article;
    }
  }]);
  return ArticleInfo;
}();