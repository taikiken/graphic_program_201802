/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/28 - 21:21
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
exports.CommentsDae = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _PopularDae = require('./PopularDae');

var _ReplyDae = require('./ReplyDae');

var _Safety = require('../../data/Safety');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * コメント一覧表示配列の各コメント
 */

// import {CommentsPopularDae} from '../CommentsPopularDae';

var CommentsDae = exports.CommentsDae = function () {
  /**
   * コメント一覧表示の個別コメント, reply 含む
   * @param {Array} [comments=[]] responce.comments
   */

  function CommentsDae() {
    var comments = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    (0, _classCallCheck3.default)(this, CommentsDae);

    // comment.id を key にデータを保存します
    var bank = {};
    // comment.id を 順に保存します
    var list = [];

    comments = _Safety.Safety.array(comments);
    console.log('CommentsDae comments ', comments);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(comments), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var comment = _step.value;

        // reply の前まではこれで処理できているはず...
        var dae = new _PopularDae.PopularDae(comment);

        // key / value にデータを保存します
        bank[dae.id] = {
          comment: dae,
          reply: new _ReplyDae.ReplyDae(comment.reply)
        };

        list.push(dae.id);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this._bank = bank;
    this._list = list;

    console.log('CommentsDae', this._bank, this._list);
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * comment を comment id をキー としたObjectに保存します
   * <dl>
   *   <dt>comment</dt>
   *   <dd>PopularDae</dd>
   *   <dt>reply</dt>
   *   <dd>ReplyDae</dd>
   * </dl>
   *
   * @return {Object|*}  comment id をキー としたObjectを返します
   */

  (0, _createClass3.default)(CommentsDae, [{
    key: 'bank',
    get: function get() {
      return this._bank;
    }
    /**
     * comment id を順に保存しています
     * @return {Array|*} comment id を保持した配列を返します
     */

  }, {
    key: 'list',
    get: function get() {
      return this._list;
    }
  }]);
  return CommentsDae;
}();