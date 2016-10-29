/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/27 - 16:58
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import { Temporary } from './Temporary';

/**
 * meta tag 情報書換えします
 * @since 2016-10-27
 */
export class TagMeta {
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * meta tag 情報書換えします
   * @param {Element} head head tag
   * @param {string} selector querySelector 形式の text
   */
  constructor(head, selector) {
    // console.log('TagMeta', head, selector);
    const tag = head.querySelector(selector) || {};
    /**
     * title tag を取得します
     * @return {Element} head > meta
     */
    this.tag = () => tag;
    const content = tag.content;
    /**
     * default meta.content 情報
     * @return {string} meta.content
     */
    this.content = () => content;
    /**
     * selector を取得します
     * @return {string} selector を返します
     */
    this.selector = () => selector;

    // temporary
    const temporary = new Temporary(content);
    /**
     * 一時情報保管庫
     * @return {Temporary} 一時情報保管庫 Temporary instance
     */
    this.temporary = () => temporary;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * meta.content を書換えます
   * @param {string} content 書換えたい文字列
   */
  set(content) {
    this.tag().content = content;
  }
  /**
   * 現在の meta.content を取得します
   * @return {string} 現在の meta.content
   */
  get() {
    return this.tag().content;
  }
  /**
   * default 状態に戻します
   */
  restore() {
    this.set(this.content());
  }
}
