/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/09 - 20:44
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoticeArticleDae = undefined;

var _Safety = require('../../data/Safety');

var _PopularDae = require('../comments/PopularDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * お知らせ 記事情報
 */

var NoticeArticleDae = exports.NoticeArticleDae = function () {
  /**
   * お知らせ 記事情報 JSON response.notifications.article
   * @param {Object} [article={}] お知らせ 記事情報
   */

  function NoticeArticleDae() {
    var article = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, NoticeArticleDae);

    article = _Safety.Safety.object(article);

    this._article = article;
    this._comment = new _PopularDae.PopularDae(article.comment);
    this._reply = new _PopularDae.PopularDae(article.reply);
  }
  /**
   *
   * @return {Object|*} お知らせ 記事情報 を返します
   */

  (0, _createClass3.default)(NoticeArticleDae, [{
    key: 'article',
    get: function get() {
      return this._article;
    }
    /**
     * @return {string} 記事タイトル を返します
     */

  }, {
    key: 'title',
    get: function get() {
      return this.article.title;
    }
    /**
     * @return {string} 記事 url を返します
     */

  }, {
    key: 'url',
    get: function get() {
      return this.article.url;
    }
    /**
     * @return {PopularDae|*} article.comment を返します
     */

  }, {
    key: 'comment',
    get: function get() {
      return this._comment;
    }
    /**
     * @return {PopularDae|*} article.reply を返します
     */

  }, {
    key: 'reply',
    get: function get() {
      return this._reply;
    }
  }]);
  return NoticeArticleDae;
}();