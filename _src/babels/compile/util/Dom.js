/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/08
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
'use strict';

/**
 * HTMLElement 要素にアクセスするヘルパー
 */

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dom = undefined;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dom = exports.Dom = function () {
  /**
   * element 要素処理ヘルパー
   * @param {Element} element 処理対象 Element
   */

  function Dom(element) {
    (0, _classCallCheck3.default)(this, Dom);

    this._element = element;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * getBoundingClientRect を計算します
   * @returns {ClientRect} getBoundingClientRect を返します
   */

  (0, _createClass3.default)(Dom, [{
    key: 'offset',
    value: function offset() {
      return Dom.offset(this._element);
    }
    // ---------------------------------------------------
    //  static METHOD
    // ---------------------------------------------------
    /**
     * getBoundingClientRect を計算します
     * ```https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect```
     * {{top: Number, right: Number, left: Number, bottom: Number, width: Number, height: Number}}
     * @param {Element} element 処理対象 Element
     * @returns {ClientRect} getBoundingClientRect を返します
     */

  }], [{
    key: 'offset',
    value: function offset(element) {
      return element.getBoundingClientRect();
    }
  }]);
  return Dom;
}();