/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/15 - 21:37
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
exports.Index = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _Header = require('./Header');

var _Sidebar = require('./Sidebar');

var _Dom = require('../dom/Dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

// UT
var UT = self.UT;

/**
 * <h3>Home(index)</h3>
 * 全て static です
 */

var Index = exports.Index = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function Index(target) {
    (0, _classCallCheck3.default)(this, Index);

    if (_symbol !== target) {

      throw new Error('Index is static Class. not use new Index().');
    }
  }
  /**
   * home rendering 開始
   */

  (0, _createClass3.default)(Index, null, [{
    key: 'start',
    value: function start() {

      // header
      _Header.Header.start();

      // ---------------------------------------------------------
      // pickup
      var pickup = new UT.view.home.ViewPickup(_Dom.Dom.pickup());
      pickup.start();

      // ---------------------------------------------------------
      // headline
      var headline = new UT.view.home.ViewHeadline(_Dom.Dom.headline());
      headline.start();

      // ---------------------------------------------------------
      // news
      var archive = new UT.view.home.ViewNews(_Dom.Dom.board(), _Dom.Dom.boardMore());
      archive.start();

      // sidebar, slug なし(=all)
      _Sidebar.Sidebar.start();
    }
  }]);
  return Index;
}();