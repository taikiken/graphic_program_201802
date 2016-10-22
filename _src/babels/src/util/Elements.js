/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/18 - 18:57
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// util
import { Offset } from './Offset';
import { Style } from './Style';

// @since 2016-09-16
const Sagen = self.Sagen;

/**
 * Sagen.Dom instance を保持するための private Symbol
 * @private
 * @type {Symbol}
 */
const domSymbol = Symbol('Sagen.Dom instance');
/**
 * Style instance を保持するための private Symbol
 * @private
 * @type {Symbol}
 */
const styleSymbol = Symbol('Style instance');

/**
 * 要素(HTMLElement)の ClientReact, style を管理します
 */
export class Elements extends Offset {
  /**
   * element 要素処理ヘルパー
   * @param {Element} element 処理対象 Element
   */
  constructor(element:Element) {
    // console.log('Elements', element);
    super(element);
    /**
     * 引数 `element` を Sagen.Dom instance にし addClass, removeClass を行います
     * @type {Sagen.Dom}
     */
    this[domSymbol] = new Sagen.Dom(element);
    /**
     * 引数 `element` の style 関連管理を行います
     * @type {Style}
     */
    this[styleSymbol] = new Style(element);
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * 引数 `element` を Sagen.Dom instance 変換
   * @return {Sagen.Dom} 引数 `element` を Sagen.Dom instance にしたものを返します
   */
  get dom() {
    return this[domSymbol];
  }
  /**
   * 引数 `element` を Style instance 変換
   * @return {Style} 引数 `element` を Style instance にしたものを返します
   */
  get style() {
    return this[styleSymbol];
  }
}
