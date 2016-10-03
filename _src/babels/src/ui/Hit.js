/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/30 - 12:51
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// ui
import { Rise } from './Rise';

// util
import { Elements } from '../util/Elements';

/**
 * element と window(Browser) のヒットテストを行います<br>
 * ヒットした場合は `COLLISION` event を発火し知らせます
 * @since 2016-09-30
 */
export class Hit extends Rise {
  /**
   * 処理対象 element を保存します
   * @param {Element} element 処理対象 element
   */
  constructor(element) {
    super(element, 0);

    /**
     * 処理対象 element を Elements instance にし保存します
     * @type {Elements}
     */
    this.elements = new Elements(element);
  }
  // ----------------------------------------
  // EVENT
  // ----------------------------------------
  /**
   * 衝突イベント
   * @event COLLISION
   * @return {string} hitCollision を返します
   */
  static get COLLISION():string {
    return 'hitCollision';
  }
  /**
   * Scroll.SCROLL event handler
   * @param {Object} events Scroll.SCROLL event object {{type: string, originalEvent: Event, y: number, height: number, moving: number, changed: boolean}}
   */
  onScroll(events) {
    const rect = this.elements.offset();
    const test = Hit.test(events.height, this.elements.offset());
    if (test) {
      this.dispatch({ rect, events, type: Hit.COLLISION });
    }
  }
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * element と window.top(0) window.bottom(height) のヒットテストを行います
   * @param {number} height window.innerHeight
   * @param {ClientRect|Object} offset element ClientRect または同等の Object
   * @return {boolean} ヒットしていると true を返します
   */
  static test(height, offset) {
    // hit test
    const hit = {
      top: false,
      bottom: false,
      contain: false,
      include: false
    };

    // top
    if (offset.top <= height && offset.top >= 0) {
      hit.top = true;
    }

    // bottom
    if (offset.bottom <= height && offset.bottom >= 0) {
      hit.bottom = true;
    }

    // contain check を行います
    if (offset.top <= 0 && offset.bottom >= height) {
      hit.contain = true;
    }

    // include check を行います
    if (
      (offset.top >= 0 && offset.top <= height) &&
      (offset.bottom >= 0 && offset.bottom <= height)
    ) {
      hit.include = true;
    }
    // return
    return hit.top || hit.bottom || hit.contain || hit.include;
  }
}