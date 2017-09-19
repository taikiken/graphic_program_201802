/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/16 - 17:15
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { Swipe } from '../SPComponentSinglesRanking';

// ---------------------------------------------------
class RankingCarouselSwipe {
  constructor(element, swipe, length) {
    this.element = element;
    this.swipe = swipe;
    /**
     * slide last No.
     * @type {number}
     */
    this.last = length - 1;
    /**
     * slide count
     * @type {number}
     */
    this.length = length;
    /**
     * current slide No.
     * @type {number}
     */
    this.index = 0;
    /**
     * slide width
     * @type {number}
     */
    this.width = 150;
    /**
     * bind onPrev - Swipe.SWIPE_RIGHT event handler
     * @type {function}
     */
    this.onPrev = this.onPrev.bind(this);
    /**
     * bind onNext - Swipe.SWIPE_LEFT event handler
     * @type {function}
     */
    this.onNext = this.onNext.bind(this);
    /**
     * bind onDragging - Swipe.DRAGGING event handler
     * @type {function}
     */
    this.onDragging = this.onDragging.bind(this);
    /**
     * bind onCancel - Swipe.CANCEL event handler
     * @type {function}
     */
    this.onCancel = this.onCancel.bind(this);
  }
  // ---------------------------------------------------
  start() {
    const swipe = this.swipe;
    swipe.on(Swipe.DRAGGING, this.onDragging);
    swipe.on(Swipe.CANCEL, this.onCancel);
    swipe.on(Swipe.SWIPE_LEFT, this.onNext);
    swipe.on(Swipe.SWIPE_RIGHT, this.onPrev);
  }
  /**
   * Swipe.SWIPE_RIGHT event handler
   * - slide index 0: `onCancel` 実行
   * - `prev` 実行
   */
  onPrev() {
    console.log('RankingCarouselSwipe.onPrev', this.index);
    this.reset();
  }
  /**
   * Swipe.SWIPE_LEFT event handler
   * - slide index `last`: `onCancel` 実行
   * - `next` 実行
   */
  onNext() {
    console.log('RankingCarouselSwipe.onNext', this.index, this.last);
    this.reset();
  }
  // ---------------------------------------------------
  /**
   * Swipe.DRAGGING event handler - drag 処理をします
   * - state: left update します - motion: false
   * @param {{x: number}} events Swipe.DRAGGING event
   */
  onDragging(events) {
    const left = events.x;
    this.drag(left);
  }
  /**
   * drag cancel - left: 0, motion: true します
   */
  onCancel() {
    this.reset();
  }
  // ---------------------------------------------------
  reset() {
    this.drag(0, true);
  }
  drag(left, motion = false) {
    const css = {
      left: `${left}px`,
    };
    if (motion) {
      css.transitin = 'left 0.31s linear';
    }
    let style = '';
    Object.keys(css).map((property) => (style += `${property}: ${css[property]};`));
    console.log('RankingCarouselSwipe.drag', style);
    this.element.style.cssText = style;
  }
}

// ---------------------------------------------------
class RankingCarouselMotion {
  costructor(element, swipe, length) {
    this.element = element;
    this.swipe = swipe;
    /**
     * slide last No.
     * @type {number}
     */
    this.last = length - 1;
    /**
     * slide count
     * @type {number}
     */
    this.length = length;
    /**
     * current slide No.
     * @type {number}
     */
    this.index = 0;
    /**
     * slide width
     * @type {number}
     */
    this.width = 150;
    /**
     * bind onPrev - Swipe.SWIPE_RIGHT event handler
     * @type {function}
     */
    this.onPrev = this.onPrev.bind(this);
    /**
     * bind onNext - Swipe.SWIPE_LEFT event handler
     * @type {function}
     */
    this.onNext = this.onNext.bind(this);
    // /**
    //  * bind onDragging - Swipe.DRAGGING event handler
    //  * @type {function}
    //  */
    // this.onDragging = this.onDragging.bind(this);
    // /**
    //  * bind onCancel - Swipe.CANCEL event handler
    //  * @type {function}
    //  */
    // this.onCancel = this.onCancel.bind(this);
  }
  // ---------------------------------------------------
  start() {
    const swipe = this.swipe;
    // swipe.on(Swipe.DRAGGING, this.onDragging);
    // swipe.on(Swipe.CANCEL, this.onCancel);
    swipe.on(Swipe.SWIPE_LEFT, this.onNext);
    swipe.on(Swipe.SWIPE_RIGHT, this.onPrev);
  }
  /**
   * Swipe.SWIPE_RIGHT event handler
   * - slide index 0: `onCancel` 実行
   * - `prev` 実行
   */
  onPrev() {
    console.log('RankingCarouselMotion.onPrev', this.index);
    if (this.index !== 0) {
      // 先頭は prev しない
      this.prev();
    }
  }
  /**
   * Swipe.SWIPE_LEFT event handler
   * - slide index `last`: `onCancel` 実行
   * - `next` 実行
   */
  onNext() {
    console.log('RankingCarouselMotion.onNext', this.index, this.last);
    if (this.index !== this.last) {
      // last は next しない
      this.next();
    }
  }
  // ---------------------------------------------------
  // /**
  //  * Swipe.DRAGGING event handler - drag 処理をします
  //  * - state: left update します - motion: false
  //  * @param {{x: number}} events Swipe.DRAGGING event
  //  */
  // onDragging(events) {
  //   const left = events.x;
  //   this.motion( { left, motion: false } );
  // }
  // /**
  //  * drag cancel - left: 0, motion: true します
  //  */
  // onCancel() {
  //   this.motion(this.index);
  // }
  // ---------------------------------------------------
  motion(index) {
    const transform = this.transform(index);
    let style = '';
    Object.keys(transform).map((property) => (style += `${property}: ${transform[property]};`));
    console.log('RankingCarouselMotion.motion', style);
    this.element.style.cssText = style;
  }
  // ---------------------------------------------------
  /**
   * 前のスライド処理
   * - index: 0 - `onCancel`
   * - `jump`
   */
  prev() {
    let index = this.index;
    index -= 1;
    console.log('RankingCarouselMotion.prev', index);
    if (index >= 0) {
      this.jump(index);
    } else {
      this.onCancel();
    }
  }
  /**
   * 次のスライド処理
   * - index: last - `onCancel`
   * - `jump`
   */
  next() {
    let index = this.index;
    index += 1;
    console.log('RankingCarouselMotion.next', index);
    if (index <= this.last) {
      this.jump(index);
    } else {
      this.onCancel();
    }
  }
  /**
   * スライド移動
   * - index update
   * - `translateX` - x value 計算
   * - setState: x, left: 0, motion: true
   * @param {number} index 移動先
   */
  jump(index) {
    this.index = index;
    // const x = this.translateX(index);
    // console.log('SPRankingCarousel.jump', index, x);
    // this.setState({ x, left: 0, motion: true });
    this.motion(index);
  }
  // ---------------------------------------------------
  // carousel move
  /**
   * スライド移動 x value を計算します
   * @param {number} index 移動先スライド番号
   * @returns {number} x value
   */
  translateX(index) {
    return -this.width * index;
  }
  /**
   * transform style を作成します
   * @param {number} index 移動先スライド番号
   * @param {number} [duration=0.32] transition duration second
   * @returns {{transform: string, transition: string}} transform style
   */
  transform(index, duration = 0.32) {
    const x = `translateX(${this.translateX(index)}px)`;
    return {
      transform: x,
      '-webkit-transform': x,
      transition: `transform ${duration}s ease-out`,
      '-webkit-transition': `-webkit-transform ${duration}s ease-out`,
    };
  }
}

// ---------------------------------------------------
export default class RankingCarouselManager {
  static setup(wrapper, list, swipe, length) {
    const motion = new RankingCarouselMotion(wrapper, swipe, length);
    const drag = new RankingCarouselSwipe(list, swipe, length);
    motion.start();
    drag.start();
  }
}
