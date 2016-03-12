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
exports.SPCategory = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _SPHeader = require('./SPHeader');

var _Dom = require('../dom/Dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();

// UT
var UT = self.UT;

/**
 * <h3>category 一覧</h3>
 * 全て static です
 */

var SPCategory = exports.SPCategory = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function SPCategory(target) {
    (0, _classCallCheck3.default)(this, SPCategory);

    if (_symbol !== target) {

      throw new Error('SPCategory is static Class. not use new SPCategory().');
    }
  }
  /**
   * rendering 開始
   * @param {string} slug category slug
   * @param {string} [type=''] ranking | video \ '' の 3つ
   */

  (0, _createClass3.default)(SPCategory, null, [{
    key: 'start',
    value: function start(slug) {
      var type = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

      // header
      _SPHeader.SPHeader.start();

      var element = _Dom.Dom.category();

      if (element !== null) {

        // list
        var archive = new UT.sp.view.category.SPViewCategoryRoot(slug, element);
        archive.start();
      }
    }
  }]);
  return SPCategory;
}();