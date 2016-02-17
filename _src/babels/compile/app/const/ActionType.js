/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/17 - 19:27
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
exports.ActionType = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

/**
 * <h3>コメント種類</h3>
 * 全て static です
 */

var ActionType = exports.ActionType = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function ActionType(target) {
    (0, _classCallCheck3.default)(this, ActionType);

    if (_symbol !== target) {

      throw new Error('CommentsType is static Class. not use new CommentsType().');
    }
  }
  // ---------------------------------------------------
  //  CONST
  // ---------------------------------------------------
  // ---------------
  // add / delete
  /**
   * ADD
   * @return {string} ADD を返します
   */

  (0, _createClass3.default)(ActionType, null, [{
    key: 'ADD',
    get: function get() {
      return 'add';
    }
    /**
     * DELETE
     * @return {string} DELETE を返します
     */

  }, {
    key: 'DELETE',
    get: function get() {
      return 'delete';
    }
    // ---------------
    // good / bad
    /**
     * GOOD
     * @return {string} GOOD を返します
     */

  }, {
    key: 'GOOD',
    get: function get() {
      return 'good';
    }
    /**
     * BAD
     * @return {string} BAD を返します
     */

  }, {
    key: 'BAD',
    get: function get() {
      return 'bad';
    }
  }]);
  return ActionType;
}();