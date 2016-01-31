/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 18:31
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
exports.CommentsPopularDae = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _PopularDae = require('./comments/PopularDae');

var _Safety = require('../data/Safety');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * article.comments_popular
 */

var CommentsPopularDae = exports.CommentsPopularDae = function () {
  /**
   * article.comments_popular
   * @param {Array} [comments=[]] article.comments_popular
   */

  function CommentsPopularDae() {
    var comments = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    (0, _classCallCheck3.default)(this, CommentsPopularDae);

    comments = _Safety.Safety.array(comments);

    this._comments = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(comments), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var comment = _step.value;

        this._comments.push(new _PopularDae.PopularDae(comment));
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
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {Array<CommentsDae>} article.comments_popular 配列, CommentsDae型を返します
   */

  (0, _createClass3.default)(CommentsPopularDae, [{
    key: 'comments',
    get: function get() {
      return this._comments;
    }
    /**
     * this.total alias
     * @return {Number} article.comments_popular.length
     */

  }, {
    key: 'length',
    get: function get() {
      return this.total;
    }
    /**
     * comments_popular 配列数
     * @return {Number} article.comments_popular.length
     */

  }, {
    key: 'total',
    get: function get() {
      return this.comments.length;
    }
    /**
     * comment 1 件目の存在有無
     * @return {boolean} article.comments_popular 1件目があるかないかの真偽値を返します
     */

  }, {
    key: 'hasFirst',
    get: function get() {
      return this.total > 0;
    }
    /**
     * comment 2 件目以降の存在有無
     * @return {boolean} article.comments_popular 2件目以降があるかないかの真偽値を返します
     */

  }, {
    key: 'hasSecond',
    get: function get() {
      return this.total > 1;
    }
    /**
     * 先頭のCommentsDae
     * @return {CommentsDae} 1件目のCommentsDaeを返します
     */

  }, {
    key: 'first',
    get: function get() {
      return this.comments[0];
    }
    /**
     * 先頭以外の配列
     * @return {Array.<CommentsDae>} 2件目以降の配列を返します
     */

  }, {
    key: 'exceptFirst',
    get: function get() {

      var clone = undefined;

      if (this.hasSecond) {
        clone = this.comments.splice(0);
        clone.shift();
      }
      return clone;
    }
    /**
     * 先頭以外の配列, alias this.exceptFirst
     * @return {Array.<CommentsDae>} 2件目以降の配列を返します
     */

  }, {
    key: 'seconds',
    get: function get() {
      return this.exceptFirst;
    }
  }]);
  return CommentsPopularDae;
}();