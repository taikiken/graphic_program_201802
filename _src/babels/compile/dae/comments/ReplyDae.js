/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/28 - 23:11
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
exports.ReplyDae = undefined;

var _CommentsPopularDae = require('../CommentsPopularDae');

var _Safety = require('../../data/Safety');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * コメントへの返信
 */

var ReplyDae = exports.ReplyDae = function () {
  /**
   * コメントへの返信を表示するために使用します
   * @param {Object} [reply={}] comments.reply をセットします
   */

  function ReplyDae() {
    var reply = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, ReplyDae);

    reply = _Safety.Safety.object(reply);

    var total = parseInt(reply.count, 10);
    //if ( !Number.isInteger( total ) ) {
    //  total = 0;
    //}
    total = _Safety.Safety.integer(total, 0);
    this._total = total;
    this._comments = new _CommentsPopularDae.CommentsPopularDae(reply.comments);
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * reply 総数
   * @return {Number|*} reply 総数を返します
   */

  (0, _createClass3.default)(ReplyDae, [{
    key: 'total',
    get: function get() {
      return this._total;
    }
    /**
     * reply.comments
     * @return {CommentsPopularDae|*} reply.comments を CommentsPopularDae instance として返します
     */

  }, {
    key: 'comments',
    get: function get() {
      return this._comments;
    }
  }]);
  return ReplyDae;
}();