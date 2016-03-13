/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 15:22
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
exports.SPSearchFrom = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _Dom = require('../dom/Dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

// UT
var UT = self.UT;

/**
 * <h3>header user information / signup</h3>
 * 全て static です
 */

var SPSearchFrom = exports.SPSearchFrom = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function SPSearchFrom(target) {
    (0, _classCallCheck3.default)(this, SPSearchFrom);

    if (_symbol !== target) {

      throw new Error('SPSearchFrom is static Class. not use new SPSearchFrom().');
    }
  }
  /**
   * search form rendering 開始
   */

  (0, _createClass3.default)(SPSearchFrom, null, [{
    key: 'start',
    value: function start() {
      // header.user
      var searchElement = _Dom.Dom.search();
      var opener = _Dom.Dom.searchOpener();
      if (searchElement !== null && opener !== null) {
        var searchFrom = new UT.sp.view.header.SPViewHeaderSearch(searchElement, opener);
        searchFrom.start();
      }
    }
  }]);
  return SPSearchFrom;
}();