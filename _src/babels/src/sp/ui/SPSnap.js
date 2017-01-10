/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/12 - 15:34
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// ui
import { Snap } from '../../ui/Snap';

// util
import { Elements } from '../../util/Elements';

/**
 * 記事詳細・次の記事一覧 mobile snap, offset 値を加算します
 */
export class SPSnap extends Snap {
  /**
   * hit instance を作成し event handler を設定します
   * @param {Element} element 対象 element
   * @param {boolean} [noMotion=false] scroll animation を行わず `scroll up` だけを監視する
   * @param {Page} page element page instance
   */
  constructor(element, noMotion = false, page = {}) {
    super(element, noMotion, page);
    /**
     * div.header-sticky を Elements instance にします, 高さ計算に必要になるかもなので... <- 現状：未使用
     * @type {Elements}
     */
    this.sticky = new Elements(document.querySelector('div.header-sticky'));
  }
  /**
   * top 位置に + するオフセット値<br>
   * div.header-sticky height - loaded_post.border-top-width 分 offset します
   * @return {number} top 位置に + するオフセット値
   */
  scrollOffset() {
    // div.header-sticky height 分 offset する
    const offset = this.sticky.offset();
    const border = parseInt(this.elements.style.get('border-top-width'), 10);
    return offset.height - border;
  }
}
