/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 15:42
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
exports.SPSearch = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _SPHeader = require('./SPHeader');

var _SPSidebar = require('./SPSidebar');

var _Dom = require('../dom/Dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

// UT
var UT = self.UT;

var SPSearch = exports.SPSearch = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function SPSearch(target) {
    (0, _classCallCheck3.default)(this, SPSearch);

    if (_symbol !== target) {

      throw new Error('SPSearch is static Class. not use new SPSearch().');
    }
  }
  /**
   * 検索ページ rendering 開始
   * @param {string} keyword 検索キーワード
   */

  (0, _createClass3.default)(SPSearch, null, [{
    key: 'start',
    value: function start(keyword) {

      // header
      _SPHeader.SPHeader.start();

      // list
      // 検索キーワードで page 取得
      // 結果セットを使い sidebar を rendering
      var boardElement = _Dom.Dom.board();
      var moreElement = _Dom.Dom.boardMore();
      if (boardElement !== null && moreElement !== null) {
        var search = new UT.view.ViewSearch(keyword, boardElement, moreElement);
        search.start();
      }

      // 検索結果が同じカテゴリーとは限らないので all で表示します
      _SPSidebar.SPSidebar.start();
    }
  }]);
  return SPSearch;
}();