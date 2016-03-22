/**
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/08
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */


/**
 * HTMLElement 要素にアクセスするヘルパー
 */
export class Offset {
  /**
   * element 要素処理ヘルパー
   * @param {Element} element 処理対象 Element
   */
  constructor( element:Element ) {
    this._element = element;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * getBoundingClientRect を計算します
   * @returns {ClientRect} getBoundingClientRect を返します
   */
  offset():ClientRect {
    return Offset.offset( this._element );
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
  static offset( element:Element ):ClientRect {
    return element.getBoundingClientRect();
  }
}
