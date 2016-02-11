/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/09 - 20:10
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
exports.NoticeDae = undefined;

var _Safety = require('../../data/Safety');

var _Format = require('../../util/Format');

var _UserDae = require('../UserDae');

var _NoticeArticleDae = require('./NoticeArticleDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 通知単独データ
 */

var NoticeDae = exports.NoticeDae = function () {
  /**
   * 通知
   * @param {Object} [notice={}] JSON response.notifications 配列単独データ
   */

  function NoticeDae() {
    var notice = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, NoticeDae);

    notice = _Safety.Safety.object(notice);

    // date check
    if (_Safety.Safety.check(notice, 'date')) {

      this._formatDate = _Format.Format.date(notice.date);
    }

    this._notice = notice;

    // user
    this._user = new _UserDae.UserDae(notice.user);

    // article
    this._article = new _NoticeArticleDae.NoticeArticleDae(notice.article);
  }
  /**
   * @return {Object|*} JSON response.notifications 配列単独データ を返します
   */

  (0, _createClass3.default)(NoticeDae, [{
    key: 'notice',
    get: function get() {
      return this._notice;
    }
    /**
     * @return {Number} notifications id を返します
     */

  }, {
    key: 'id',
    get: function get() {
      return this.notice.id;
    }
    /**
     * @return {string} ISO8601 日付を返します
     */

  }, {
    key: 'date',
    get: function get() {
      return this.notice.date;
    }
    /**
     * @return {string} ISO8601 を日本語形式日付にし返します
     */

  }, {
    key: 'formatDate',
    get: function get() {
      return this._formatDate;
    }
    /**
     * @return {string} 相対日付返します
     */

  }, {
    key: 'displayDate',
    get: function get() {
      return this.notice.display_date;
    }
    /**
     * アクティビティの種類
     * - reply : 返信された
     * - good : goodされた
     * - bad : badされた
     * - notice : ニュース的通知
     *
     * @return {string} アクティビティの種類を返します
     */

  }, {
    key: 'action',
    get: function get() {
      return this.notice.action;
    }
    /**
     * @return {UserDae|*} 誰からの通知かユーザー情報を返します
     */

  }, {
    key: 'user',
    get: function get() {
      return this._user;
    }
    /**
     * @return {NoticeArticleDae|*} 対象記事情報を返します
     */

  }, {
    key: 'article',
    get: function get() {
      return this._article;
    }
  }]);
  return NoticeDae;
}();