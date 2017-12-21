/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/19 - 11:34
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import { Vectors } from '../util/Vectors';

/**
 * Touching event object
 * @since 2016-09-17
 */
export class TouchingEvents {
  /**
   * Touching event object 各プロパティを設定します
   * @param {string} type event type
   * @param {Event} origin 発生時のオリジナルイベント
   * @param {Vectors} [current=new Vectors()] 現在の位置
   * @param {Vectors} [between=new Vectors()] 前回位置との差
   * @param {boolean} [scrolling=false] scroll したかの真偽値, true: scroll している
   */
  constructor(type, origin, current = new Vectors(), between = new Vectors(), scrolling = false) {
    /**
     * event type
     * @type {string}
     */
    this.type = type;
    /**
     * 発生時のオリジナルイベント
     * @type {Event}
     */
    this.origin = origin;
    /**
     * 現在の位置
     * @type {Vectors}
     */
    this.current = current;
    /**
     * 前回位置との差
     * @type {Vectors}
     */
    this.between = between;
    /**
     * scroll したかの真偽値
     * @type {boolean}
     */
    this.scrolling = scrolling;
  }
}
