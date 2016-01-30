/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/28 - 22:36
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
exports.CommentsListDae = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _CommentsDae = require('./comments/CommentsDae');

var _Safety = require('../data/Safety');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * コメント一覧表示
 */

var CommentsListDae = exports.CommentsListDae = function () {
  /**
   * コメント一覧表示 reply 含む
   * <p>再帰的に処理する必要があったため少々複雑な処理工程を辿ります</p>
   * <ol>
   * <li>CommentsListDae</li>
   * <li>CommentsDae</li>
   * <li>PopularDae</li>
   * <li>ReplyDae</li>
   * <li>CommentsPopularDae</li>
   * </ol>
   *
   * ToDo: @example
   * @param {Object} response JSON.response
   */

  function CommentsListDae() {
    var response = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, CommentsListDae);

    response = _Safety.Safety.object(response);
    this._response = response;
    console.log('CommentsListDae ', response, response.comments);
    this._comments = new _CommentsDae.CommentsDae(response.comments);
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {Object|*} JSON.response を返します
   */

  (0, _createClass3.default)(CommentsListDae, [{
    key: 'response',
    get: function get() {
      return this._response;
    }
    /**
     * 総コメント数
     * @return {Number} response.count を返します
     */

  }, {
    key: 'total',
    get: function get() {
      return this.response.count;
    }
    /**
     * alias this.total
     * @return {Number} response.count を返します
     */

  }, {
    key: 'count',
    get: function get() {
      return this.total;
    }
    /**
     * @return {CommentsDae|*} response.comments を CommentsDae instance に内包し返します
     */

  }, {
    key: 'comments',
    get: function get() {
      return this._comments;
    }
  }]);
  return CommentsListDae;
}();