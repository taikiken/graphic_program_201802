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
exports.SPIndex = undefined;

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

/**
 * <h3>Home(index)</h3>
 * 全て static です
 */

var SPIndex = exports.SPIndex = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function SPIndex(target) {
    (0, _classCallCheck3.default)(this, SPIndex);

    if (_symbol !== target) {

      throw new Error('SPIndex is static Class. not use new SPIndex().');
    }
  }
  /**
   * home rendering 開始
   */

  (0, _createClass3.default)(SPIndex, null, [{
    key: 'start',
    value: function start() {

      // header
      _SPHeader.SPHeader.start();

      /*
      sp pickup なし
      // ---------------------------------------------------------
      // pickup
      let pickupElement = Dom.pickup();
      if ( pickupElement !== null ) {
        let pickup = new UT.view.home.ViewPickup( pickupElement );
        pickup.start();
      }
      */

      // ---------------------------------------------------------
      // headline
      var headlineElement = _Dom.Dom.headline();
      if (headlineElement !== null) {
        var headline = new UT.sp.view.home.SPViewHeadLine(headlineElement);
        headline.start();
      }

      // ---------------------------------------------------------
      // news
      var boardElement = _Dom.Dom.board();
      var moreElement = _Dom.Dom.boardMore();
      if (boardElement !== null && moreElement !== null) {
        var archive = new UT.sp.view.home.SPViewNews(boardElement, moreElement);
        archive.start();
      }

      // sidebar, slug なし(=all)
      _SPSidebar.SPSidebar.start();
    }
  }]);
  return SPIndex;
}();