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

/**
 * article.comments_popular
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommentsPopularDae = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommentsPopularDae = exports.CommentsPopularDae = function () {
  /**
   * article.comments_popular
   * @param {Array} [comments=[]] article.comments_popular
   */

  function CommentsPopularDae() {
    var comments = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    (0, _classCallCheck3.default)(this, CommentsPopularDae);

    this._comments = comments;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {Array|*} article.comments_popular
   */

  (0, _createClass3.default)(CommentsPopularDae, [{
    key: 'comments',
    get: function get() {
      return this._comments;
    }
    /**
     * @return {Number} article.comments_popular.length
     */

  }, {
    key: 'length',
    get: function get() {
      return this.comments.length;
    }
  }]);
  return CommentsPopularDae;
}();