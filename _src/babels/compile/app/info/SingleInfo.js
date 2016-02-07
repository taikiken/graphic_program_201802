/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/28 - 19:01
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
exports.SingleInfo = undefined;

var _SingleDae = require('../../dae/SingleDae');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _symbol = (0, _symbol3.default)();
var _single = undefined;

/**
 * <h3>記事詳細情報</h3>
 * 全てstaticです<br>
 * **Singleton**
 * <p>
 * SingleDae を保持します。
 * </p>
 */

var SingleInfo = exports.SingleInfo = function () {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */

  function SingleInfo(target) {
    (0, _classCallCheck3.default)(this, SingleInfo);

    if (_symbol !== target) {

      throw new Error('Article is static Class. not use new Article().');
    }
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * 現在表示の記事詳細情報
   * @return {SingleDae} 現在表示の記事詳細情報 SingleDae instance を返します
   */

  (0, _createClass3.default)(SingleInfo, null, [{
    key: 'dae',
    get: function get() {
      return _single;
    }

    /**
     * @param {SingleDae} article 現在表示の記事詳細情報 SingleDae instance
     */
    ,
    set: function set(article) {
      _single = article;
    }
  }]);
  return SingleInfo;
}();