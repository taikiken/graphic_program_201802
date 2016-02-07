/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/29 - 18:09
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

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommentsType = undefined;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

/**
 * <h3>コメント種類</h3>
 * 全て static です
 */

var CommentsType = exports.CommentsType = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function CommentsType(target) {
    (0, _classCallCheck3.default)(this, CommentsType);

    if (_symbol !== target) {

      throw new Error('CommentsType is static Class. not use new CommentsType().');
    }
  }
  // ---------------------------------------------------
  //  static METHOD
  // ---------------------------------------------------
  /**
   * @return {string} comment type 'self' を返します
   */

  (0, _createClass3.default)(CommentsType, null, [{
    key: 'SELF',
    get: function get() {
      return 'self';
    }
    /**
     * @return {string} comment type 'normal' を返します
     */

  }, {
    key: 'NORMAL',
    get: function get() {
      return 'normal';
    }
    /**
     * @return {string} comment type 'official' を返します
     */

  }, {
    key: 'OFFICIAL',
    get: function get() {
      return 'official';
    }
    /**
     * @return {string} comment type '' を返します
     */

  }, {
    key: 'ALL',
    get: function get() {
      return '';
    }
  }]);
  return CommentsType;
}();