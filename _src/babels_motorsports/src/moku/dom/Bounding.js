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
 * @see https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIDOMClientRect
 */
export default class Bounding {
  /**
   * 操作対象 Element を保存します
   * @param {Element} element 操作対象 Element
   */
  constructor(element) {
    /**
     * 操作対象 Element
     * @type {Element}
     */
    this.element = element;
  }
  /**
   * `getBoundingClientRect` を使用しプロパティ element の offset 値を取得します
   * @return {ClientRect} read only ClientRect を返します
   */
  offset() {
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
  clone() {
    return Bounding.clone(this.offset());
  }
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
  static offset(element) {
    return element.getBoundingClientRect();
  }
  /**
   * ClientRect の複製を Object 化し writable にします
   * @param {ClientRect} offset 複製元 ClientRect
   * @return {{
   *  top: number,
   *  right: number,
   *  bottom: number,
   *  left: number,
   *  width: number,
   *  height: number}} ClientRect の複製 (Object) を返します
   */
  static clone(offset) {
    return {
      top: offset.top,
      right: offset.right,
      bottom: offset.bottom,
      left: offset.left,
      width: offset.width,
      height: offset.height,
    };
  }
}
