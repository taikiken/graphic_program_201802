/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/11 - 16:43
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
exports.SPSyn = undefined;

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
 * Syn. menu + open / close UI
 */

var SPSyn = exports.SPSyn = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function SPSyn(target) {
    (0, _classCallCheck3.default)(this, SPSyn);

    if (_symbol !== target) {

      throw new Error('SPSyn is static Class. not use new SPSyn().');
    }
  }
  /**
   * side menu + Syn.
   */

  (0, _createClass3.default)(SPSyn, null, [{
    key: 'start',
    value: function start() {
      var element = _Dom.Dom.service();
      var button = _Dom.Dom.serviceOpener();
      var menu = _Dom.Dom.serviceMenu();

      var syn = new UT.sp.view.SPViewSyn(element, button, menu);
      syn.start();
    }
  }]);
  return SPSyn;
}();