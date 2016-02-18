/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/15 - 21:49
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
exports.Category = undefined;

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
 * <h3>category 一覧</h3>
 * 全て static です
 */

var Category = exports.Category = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function Category(target) {
    (0, _classCallCheck3.default)(this, Category);

    if (_symbol !== target) {

      throw new Error('Category is static Class. not use new Category().');
    }
  }
  /**
   * rendering 開始
   * @param {string} slug category slug
   * @param {string} [type=''] ranking | video \ '' の 3つ
   */

  (0, _createClass3.default)(Category, null, [{
    key: 'start',
    value: function start(slug) {
      var type = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

      // header
      _Header.Header.start();

      // list
      var archive = new UT.view.ViewCategory(slug, _Dom.Dom.board(), _Dom.Dom.boardMore());
      archive.start();

      // sidebar
      _Sidebar.Sidebar.start(slug);

      // title
      console.log('type', slug, type);
    }
  }]);
  return Category;
}();