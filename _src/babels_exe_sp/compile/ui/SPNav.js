/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/29 - 23:08
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
exports.SPNav = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _Dom = require('../dom/Dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

var Sagen = self.Sagen;

/**
 * メインメニューにかテゴリースラッグを追加
 */

var SPNav = exports.SPNav = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function SPNav(target) {
    (0, _classCallCheck3.default)(this, SPNav);

    if (_symbol !== target) {

      throw new Error('SPNav is static Class. not use new SPNav().');
    }
  }
  /**
   * global menu へ slug を css class として挿入
   * @param {string} slug category slug
   */

  (0, _createClass3.default)(SPNav, null, [{
    key: 'start',
    value: function start() {
      var slug = arguments.length <= 0 || arguments[0] === undefined ? 'all' : arguments[0];

      var nav = _Dom.Dom.nav();
      if (nav !== null && slug !== null && typeof slug !== 'undefined') {
        Sagen.Dom.addClass(nav, slug);
      }
    }
  }]);
  return SPNav;
}();