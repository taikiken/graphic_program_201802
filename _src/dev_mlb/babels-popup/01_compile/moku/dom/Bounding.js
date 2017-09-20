"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/06 - 22:02
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * Element の ClientRect 取得します
 * - bottom: float
 * - height: float
 * - left: float
 * - right: float
 * - top: float
 * - width: float
 * - x: float
 * - y: float
 *
 * [MSDN](https://msdn.microsoft.com/ja-jp/library/hh826029(v=vs.85).aspx)
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
 */
var Bounding = function () {
  _createClass(Bounding, null, [{
    key: "offset",

    // ----------------------------------------
    // STATIC METHOD
    // ----------------------------------------
    /**
     * `getBoundingClientRect` を使用し引数 element の offset 値を取得します
     *
     * ```
     * {{top: Number, right: Number, left: Number, bottom: Number, width: Number, height: Number}}
     * ```
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
     *
     * @param {Element} element 調査対象 Element
     * @return {ClientRect} 引数 element の offset 値を返します
     */
    value: function offset(element) {
      return element.getBoundingClientRect();
    }
    /**
     * ClientRect の複製を Object 化し writable にします
     * @param {DOMRect|ClientRect} offset 複製元 ClientRect
     * @return {{
     *  top: number,
     *  right: number,
     *  bottom: number,
     *  left: number,
     *  width: number,
     *  height: number}} ClientRect の複製 (Object) を返します
     *  @see https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
     *  @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
     */

  }, {
    key: "clone",
    value: function clone(offset) {
      return {
        top: offset.top,
        right: offset.right,
        bottom: offset.bottom,
        left: offset.left,
        width: offset.width,
        height: offset.height
      };
    }
    // ----------------------------------------
    // CONSTRUCTOR
    // ----------------------------------------
    /**
     * 操作対象 Element を保存します
     * @param {Element} element 操作対象 Element
     */

  }]);

  function Bounding(element) {
    _classCallCheck(this, Bounding);

    /**
     * 操作対象 Element
     * @type {Element}
     */
    this.element = element;
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * `getBoundingClientRect` を使用しプロパティ element の offset 値を取得します
   * @return {ClientRect} read only ClientRect を返します
   */


  _createClass(Bounding, [{
    key: "offset",
    value: function offset() {
      return Bounding.offset(this.element);
    }
    /**
     * writable な element の offset 値を取得します
     * @return {{
     *  top: number,
     *  right: number,
     *  bottom: number,
     *  left: number,
     *  width: number,
     *  height: number}} writable な element の offset
     *  */

  }, {
    key: "clone",
    value: function clone() {
      return Bounding.clone(this.offset());
    }
  }]);

  return Bounding;
}();

exports.default = Bounding;