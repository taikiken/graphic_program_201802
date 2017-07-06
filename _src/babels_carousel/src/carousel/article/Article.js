/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/05/24 - 20:03
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
 * li.view-pickup へ current add / remove するために {@link Controller.JUMP} watch します
 */
export default class Article {
  /**
   * 設定を初期化します
   * @param {Element} element li.view-pickup
   * @param {number} index スライド番号
   */
  constructor(element, index) {
    /**
     * CSS class `current` を add / remove します
     * @type {Classes}
     */
    this.classes = new Classes(element);
    /**
     * スライド番号
     * @type {number}
     */
    this.index = index;
    /**
     * carousel event 管理します
     * @type {Controller}
     */
    this.controller = Controller.factory();
    /**
     * bind onJump
     * @type {function}
     */
    this.onJump = this.onJump.bind(this);
  }
  /**
   * {@link Controller.JUMP} event 監視を開始します
   */
  start() {
    this.controller.on(Controller.JUMP, this.onJump);
  }
  /**
   * {@link Controller.JUMP} event handler
   * events.id とプロパティ id を比較します
   * - 等価 - current add
   * - 不等価 - current remove
   * @param {object} events id: 表示スライド番号 を使用します
   */
  onJump(events) {
    if (this.index === events.index) {
      this.classes.add('current');
    } else {
      this.classes.remove('current');
    }
  }
}
