/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/05/24 - 20:02
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// moku/dom
import Classes from '../../moku/dom/Classes';

// controller
import Controller from '../Controller';

/**
 * {@link Controller.JUMP} event で `current` を on / off し
 * click で event を発行します
 */
export default class Pager {
  /**
   * 設定を初期化します
   * @param {Element} pager li.pager-item
   * @param {number} index pager 番号（スライド番号）
   */
  constructor(pager, index) {
    /**
     * pager li.pager-item
     * @type {Element}
     */
    this.pager = pager;
    /**
     * pager li.pager-item へ CSS class を add / remove します
     * @type {Classes}
     */
    this.classes = new Classes(pager);
    /**
     * pager 番号（スライド番号）
     * @type {number}
     */
    this.index = index;
    /**
     * bind onClick
     * @type {function}
     */
    this.onClick = this.onClick.bind(this);
    /**
     * bind onJump
     * @type {function}
     */
    this.onJump = this.onJump.bind(this);
    /**
     * caroucel event 管理インスタンス
     * @type {Controller}
     */
    this.controller = Controller.factory();
  }
  /**
   * pager element へ `click` event を bind します
   * {@link Controller.JUMP} event を watch します
   */
  start() {
    this.pager.addEventListener('click', this.onClick, false);
    this.controller.on(Controller.JUMP, this.onJump);
  }
  /**
   * pager.onclick event handler - {@link Controller.jump} へ `index` を通知します
   * @param {Event} event click event
   */
  onClick(event) {
    event.preventDefault();
    if (!this.classes.has('current')) {
      this.controller.jump(this.index);
    }
  }
  /**
   * {@link Controller.JUMP} event handler
   * events.id とプロパティ id を比較します
   * - 等価 - current add
   * - 不等価 - current remove
   * @param {object} events id: 表示スライド番号 を使用します
   */
  onJump(events) {
    const index = events.index;
    if (index === this.index) {
      this.classes.add('current');
    } else {
      this.classes.remove('current');
    }
  }
}
