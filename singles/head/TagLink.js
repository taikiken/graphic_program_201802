/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/27 - 18:18
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import { TagMeta } from './TagMeta';

/**
 * head > link 情報書換えします
 * @since 2016-10-27
 */
export class TagLink extends TagMeta {
  /**
   * head > link 情報書換えします
   * @param {Element} head head tag
   * @param {string} selector querySelector 形式の text
   */
  constructor(head, selector) {
    super(head, selector);
    const href = this.tag().href;
    /**
     * link.href default 情報
     * @return {string} link.href
     */
    this.href = () => href;
    // temporary
    this.temporary().set(href);
  }
  /**
   * link.href を書換えます
   * @param {string} content 書換えたい文字列
   */
  set(content) {
    this.tag().href = content;
  }
  /**
   * 現在の link.href を取得します
   * @return {string} 現在の link.href
   */
  get() {
    return this.tag().href;
  }
  /**
   * default 状態に戻します
   */
  restore() {
    this.set(this.href());
  }
}

