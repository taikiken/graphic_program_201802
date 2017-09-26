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
/**
 * carousel swipe のためのドラッグ処理を行います
 * @since 2017-09-13
 */
class RankingCarouselSwipe {
  /**
   * carousel swipe のためのドラッグ処理を準備します
   * @param {Element} element div.widget-post-carousel-list
   * @param {Swipe} swipe touchmove / end から swipe 判定を行い通知します
   * @param {number} length スライド数
   */
  constructor(element, swipe, length) {
    /**
     * div.widget-post-carousel-list
     * @type {Element}
     */
    this.element = element;
    /**
     * touchmove / end から swipe 判定を行い通知します
     * @type {Swipe}
     */
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
  /**
   * {@link Swipe} event を watch します
   * - DRAGGING
   * - CANCEL
   * - SWIPE_LEFT
   * - SWIPE_RIGHT
   */
  start() {
    const swipe = this.swipe;
    swipe.on(Swipe.DRAGGING, this.onDragging);
    swipe.on(Swipe.CANCEL, this.onCancel);
    swipe.on(Swipe.SWIPE_LEFT, this.onNext);
    swipe.on(Swipe.SWIPE_RIGHT, this.onPrev);
  }
  // ---------------------------------------------------
  // event handler
  /**
   * Swipe.SWIPE_RIGHT event handler - 初期位置に戻します
   * - `onCancel` 実行
   */
  onPrev() {
    // console.log('RankingCarouselSwipe.onPrev', this.index);
    this.reset();
  }
  /**
   * Swipe.SWIPE_LEFT event handler - 初期位置に戻します
   * `onCancel` 実行
   */
  onNext() {
    // console.log('RankingCarouselSwipe.onNext', this.index, this.last);
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
   * drag を cancel し初期位置に戻します
   */
  onCancel() {
    this.reset();
  }
  // ---------------------------------------------------
  /**
   * 初期位置に motion 付きで戻します
   */
  reset() {
    this.drag(0, true);
  }
  /**
   * drag + reset with motion 処理を行います
   * @param {number} left css: left value - drag 処理行います
   * @param {boolean} [motion=false] motion flag - true: 有
   */
  drag(left, motion = false) {
    const css = {
      left: `${left}px`,
    };
    if (motion) {
      css.transition = 'left 0.31s linear';
    }
    let style = '';
    Object.keys(css).map((property) => (style += `${property}: ${css[property]};`));
    // console.log('RankingCarouselSwipe.drag', style);
    this.element.style.cssText = style;
  }
}

// ---------------------------------------------------
/**
 * SP: ranking carousel - React state 使わない
 * @since 2017-09-13
 */
class RankingCarouselMotion {
  /**
   * ranking carousel, prev / next motion 準備します
   * @param {Element} element div.widget-post-carousel-wrapper
   * @param {Swipe} swipe touchmove / end から swipe 判定を行い通知します
   * @param {number} length スライド数
   */
  constructor(element, swipe, length) {
    /**
     * div.widget-post-carousel-wrapper
     * @type {Element}
     */
    this.element = element;
    /**
     * swipe left / right 判定を行います
     * @type {Swipe}
     */
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
  /**
   * {@link Swipe}.SWIPE_LEFT|SWIPE_RIGHT event handler を準備します
   */
  start() {
    const swipe = this.swipe;
    // swipe.on(Swipe.DRAGGING, this.onDragging);
    // swipe.on(Swipe.CANCEL, this.onCancel);
    swipe.on(Swipe.SWIPE_LEFT, this.onNext);
    swipe.on(Swipe.SWIPE_RIGHT, this.onPrev);
  }
  // ---------------------------------------------------
  // event handler
  /**
   * Swipe.SWIPE_RIGHT event handler
   * - slide index 0: `onCancel` 実行
   * - `prev` 実行
   */
  onPrev() {
    // console.log('RankingCarouselMotion.onPrev', this.index);
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
    // console.log('RankingCarouselMotion.onNext', this.index, this.last);
    if (this.index !== this.last) {
      // last は next しない
      this.next();
    }
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
  /**
   * 指定スライド番号が左端になるように移動します
   * @param {number} index スライド番号
   */
  motion(index) {
    // @type {object} css property を key にした object
    const transform = this.transform(index);
    let style = '';
    // object to string - cssText を作成します
    Object.keys(transform).map((property) => (style += `${property}: ${transform[property]};`));
    // console.log('RankingCarouselMotion.motion', style);
    // css 設定
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
    // console.log('RankingCarouselMotion.prev', index);
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
    // console.log('RankingCarouselMotion.next', index);
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
}

// ---------------------------------------------------
/**
 * SP: single ranking carousel - React.state を使用しない
 * @since 2017-09-13
 */
export default class RankingCarouselManager {
  /**
   * {@link RankingCarouselMotion}, {@link RankingCarouselSwipe} instance を作成します
   * @param {Element} wrapper div.widget-post-carousel-wrapper - motion target
   * @param {Element} list div.widget-post-carousel-list - swipe target
   * @param {Swipe} swipe touchmove / end 通知インスタンス
   * @param {number} length スライド数
   */
  static setup(wrapper, list, swipe, length) {
    // console.log('RankingCarouselManager.setup', wrapper, list, swipe, length);
    const motion = new RankingCarouselMotion(wrapper, swipe, length);
    const drag = new RankingCarouselSwipe(list, swipe, length);
    motion.start();
    drag.start();
  }
}
