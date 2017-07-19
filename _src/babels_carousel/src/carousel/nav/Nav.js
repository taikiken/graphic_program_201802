/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/05/24 - 20:04
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import Controller from '../Controller';

/**
 * carousel, prev / next button manager
 * - next, prev click で {@link Controller} 通知します
 */
export default class Nav {
  /**
   * 設定を保存します
   * @param {Element} prev a.direction-prev - {@link Prepare.direction} で生成します
   * @param {Element} next a.direction-next - {@link Prepare.direction} で生成します
   */
  constructor(prev, next) {
    /**
     * a.direction-prev
     * @type {Element}
     */
    this.prev = prev;
    /**
     * a.direction-next
     * @type {Element}
     */
    this.next = next;
    /**
     * bind onPrev
     * @type {function}
     */
    this.onPrev = this.onPrev.bind(this);
    /**
     * bind onNext
     * @type {function}
     */
    this.onNext = this.onNext.bind(this);
    /**
     * carousel controller
     * @type {Controller}
     */
    this.controller = Controller.factory();
  }
  /**
   * 初期処理を行います,
   * prev / next へ `click` event を bind します
   */
  start() {
    this.prev.addEventListener('click', this.onPrev, false);
    this.next.addEventListener('click', this.onNext, false);
  }
  /**
   * a.direction-prev click event handler, {@link Controller.prev} 通知します
   * @param {Event} event click event - preventDefault します
   */
  onPrev(event) {
    event.preventDefault();
    this.controller.prev();
  }
  /**
   * a.direction-next click event handler, {@link Controller.next} 通知します
   * @param {Event} event click event - preventDefault します
   */
  onNext(event) {
    event.preventDefault();
    this.controller.next();
  }
}
