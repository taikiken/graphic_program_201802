/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/25 - 22:15
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
exports.PopularDae = undefined;

var _Safety = require('../../data/Safety');

var _Format = require('../../util/Format');

var _UserDae = require('../UserDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * article.comments_popular 配列内 1 data
 */

var PopularDae = exports.PopularDae = function () {
  /**
   * article.comments_popular:[]
   * @param {Object} [comment={}] response.comment Object
   */

  function PopularDae() {
    var comment = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, PopularDae);

    comment = _Safety.Safety.object(comment);

    if (_Safety.Safety.check(comment, 'date')) {

      this._formatDate = _Format.Format.date(comment.date);
    }

    // comments_popular.user
    this._user = new _UserDae.UserDae(comment.user);
    // property
    this._comment = comment;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {Object|*} comment Object を返します
   */

  (0, _createClass3.default)(PopularDae, [{
    key: 'comment',
    get: function get() {
      return this._comment;
    }
    /**
     *
     * @return {Number} comment.id を返します
     */

  }, {
    key: 'id',
    get: function get() {
      return this.comment.id;
    }
    /**
     *
     * @return {string} ISO8601 日付を返します
     */

  }, {
    key: 'date',
    get: function get() {
      return this.comment.date;
    }
    /**
     *
     * @return {string} ISO8601 を日本語形式日付にし返します
     */

  }, {
    key: 'formatDate',
    get: function get() {
      return this._formatDate;
    }
    /**
     *
     * @return {string} 相対日付返します
     */

  }, {
    key: 'displayDate',
    get: function get() {
      return this.comment.display_date;
    }
    /**
     *
     * @return {string} コメント本文を返します
     */

  }, {
    key: 'body',
    get: function get() {
      return this.comment.body;
    }
    /**
     *
     * @return {boolean} 自分がGood済みかどうか を返します
     */

  }, {
    key: 'isLike',
    get: function get() {
      return this.comment.is_like;
    }
    /**
     *
     * @return {boolean} 自分がBad済みかどうか を返します
     */

  }, {
    key: 'isBad',
    get: function get() {
      return this.comment.is_bad;
    }
    /**
     *
     * @return {Number} Good数 を返します
     */

  }, {
    key: 'good',
    get: function get() {
      return this.comment.like;
    }
    /**
     * this.good alias
     * @return {Number} Good数 を返します
     */

  }, {
    key: 'like',
    get: function get() {
      return this.good;
    }
    /**
     *
     * @return {Number|number} Bad数 を返します
     */

  }, {
    key: 'bad',
    get: function get() {
      return this.comment.bad;
    }
    /**
     *
     * @return {string} コメント詳細のURLを返します
     */

  }, {
    key: 'url',
    get: function get() {
      return this.comment.url;
    }
    /**
     *
     * @return {UserDae|*} comment した user 情報を返します
     */

  }, {
    key: 'user',
    get: function get() {
      return this._user;
    }
  }]);
  return PopularDae;
}(); // class