/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 17:03
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
exports.ArticleDae = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Safety = require('../data/Safety');

var _Format = require('../util/Format');

var _CategoryDae = require('./CategoryDae');

var _MediaDae = require('./MediaDae');

var _UserDae = require('./UserDae');

var _CommentsPopularDae = require('./CommentsPopularDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * articles 記事一つのデータを管理します
 */

var ArticleDae = exports.ArticleDae = function () {
  /**
   * archive系で取得した記事配列から 1件取り出し<br>
   * データを管理します
   *
   * @param {Object} [article={}] articles配列にセットされている article 記事1件データ
   */

  function ArticleDae() {
    var article = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, ArticleDae);

    this._article = article;
    // article.category
    this._category = new _CategoryDae.CategoryDae(article.category);
    // article.media
    this._media = new _MediaDae.MediaDae(article.media);
    // article.user
    this._user = new _UserDae.UserDae(article.user);
    // article.comments_popular
    this._popular = new _CommentsPopularDae.CommentsPopularDae(article.comments_popular);

    // Safety.check, object に key が存在しタイプがあっているかを調べます
    // comments_count check
    if (!_Safety.Safety.check(article, 'comments_count', 'number')) {

      article.comments_count = 0;
    }
    // date check
    if (_Safety.Safety.check(article, 'date')) {

      article.formatDate = _Format.Format.date(article.date);
    }

    this._index = -1;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {number|*|Number} index number を返します, default -1, -1 の時は未設定なので使用してはいけない
   */

  (0, _createClass3.default)(ArticleDae, [{
    key: 'index',
    get: function get() {
      return this._index;
    }

    /**
     * index number を設定します
     * @param {Number} index index number
     */
    ,
    set: function set(index) {
      this._index = index;
    }
    /**
     * @return {Object|*} article 記事単1データ
     */

  }, {
    key: 'article',
    get: function get() {
      return this._article;
    }
    /**
     *
     * @return {CategoryDae|*} article.category
     */

  }, {
    key: 'category',
    get: function get() {
      return this._category;
    }
    /**
     *
     * @return {Number} article.comments_count
     */

  }, {
    key: 'commentsCount',
    get: function get() {
      return parseInt(this.article.comments_count, 10);
    }
    /**
     * @return {CommentsPopularDae|*} article.comments_popular
     */

  }, {
    key: 'commentsPopular',
    get: function get() {
      return this._popular;
    }
    /**
     * @return {string} article.date
     */

  }, {
    key: 'date',
    get: function get() {
      return this.article.date;
    }
    /**
     * @return {string} article.date を日本語日付に変換し返します
     */

  }, {
    key: 'formatDate',
    get: function get() {
      return this.article.formatDate;
    }
    /**
     *
     * @return {string} article.display_date
     */

  }, {
    key: 'displayDate',
    get: function get() {
      return this.article.display_date;
    }
    /**
     *
     * @return {string} article.description
     */

  }, {
    key: 'description',
    get: function get() {
      return this.article.description;
    }
    /**
     *
     * @return {string} article.id
     */

  }, {
    key: 'id',
    get: function get() {
      return this.article.id;
    }
    /**
     *
     * @return {boolean} article.is_bookmarked
     */

  }, {
    key: 'isBookmarked',
    get: function get() {
      return this.article.is_bookmarked;
    }
    /**
     *
     * @return {MediaDae} article.media
     */

  }, {
    key: 'media',
    get: function get() {
      return this._media;
    }
    /**
     *
     * @return {string} article.media_type
     */

  }, {
    key: 'mediaType',
    get: function get() {
      return this.article.media_type;
    }
    /**
     *
     * @return {string} article.title
     */

  }, {
    key: 'title',
    get: function get() {
      return this.article.title;
    }
    /**
     *
     * @return {string} article.url
     */

  }, {
    key: 'url',
    get: function get() {
      return this.article.url;
    }
    /**
     *
     * @return {UserDae} article.user
     */

  }, {
    key: 'user',
    get: function get() {
      return this._user;
    }
  }]);
  return ArticleDae;
}();