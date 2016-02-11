/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/26 - 21:35
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// 記事詳細 関連記事結果

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RelatedDae = undefined;

var _Safety = require('../data/Safety');

var _Format = require('../util/Format');

var _CategoryDae = require('./CategoryDae');

var _MediaDae = require('./MediaDae');

var _UserDae = require('./UserDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 記事詳細 関連記事 JSON
 */

var RelatedDae = exports.RelatedDae = function () {
  /**
   * 記事詳細 関連記事結果 JSON をセットアップします
   * @param {Object} [response={}] JSON.response
   */

  function RelatedDae() {
    var response = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, RelatedDae);

    response = _Safety.Safety.object(response);

    this._response = response;
    // response.category
    this._category = new _CategoryDae.CategoryDae(response.category);
    // response.media
    this._media = new _MediaDae.MediaDae(response.media);
    // response.user
    this._user = new _UserDae.UserDae(response.user);

    // date check
    if (_Safety.Safety.check(response, 'date')) {

      this._formatDate = _Format.Format.date(response.date);
    }
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {Object|*} JSON.response を返します
   */

  (0, _createClass3.default)(RelatedDae, [{
    key: 'response',
    get: function get() {
      return this._response;
    }
    /**
     *
     * @return {Number} 記事 ID を返します
     */

  }, {
    key: 'id',
    get: function get() {
      return this.response.id;
    }
    /**
     *
     * @return {string} ISO8601 日付
     */

  }, {
    key: 'date',
    get: function get() {
      return this.response.date;
    }
    /**
     * @return {string} response.date を日本語日付に変換し返します
     */

  }, {
    key: 'formatDate',
    get: function get() {
      return this._formatDate;
    }
    /**
     *
     * @return {string} article.display_date
     */

  }, {
    key: 'displayDate',
    get: function get() {
      return this.response.display_date;
    }
    /**
     *
     * @return {string} 記事タイトル
     */

  }, {
    key: 'title',
    get: function get() {
      return this.response.title;
    }
    /**
     *
     * @return {string} 記事概要
     */

  }, {
    key: 'description',
    get: function get() {
      return this.response.description;
    }
    /**
     *
     * @return {CategoryDae|*} カテゴリー
     */

  }, {
    key: 'category',
    get: function get() {
      return this._category;
    }
    /**
     *
     * @return {string} 記事URL
     */

  }, {
    key: 'url',
    get: function get() {
      return this.response.url;
    }
    /**
     *
     * @return {boolean} response.is_bookmarked
     */

  }, {
    key: 'isBookmarked',
    get: function get() {
      return this.response.is_bookmarked;
    }
    /**
     *
     * @return {string} response.media_type
     */

  }, {
    key: 'mediaType',
    get: function get() {
      return this.response.media_type;
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
     * @return {UserDae} article.user
     */

  }, {
    key: 'user',
    get: function get() {
      return this._user;
    }
  }]);
  return RelatedDae;
}();