/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/28 - 23:57
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import { EventDispatcher } from '../../event/EventDispatcher';

/**
 * singleton instance のためのチェック用 Symbol
 * @type {Symbol}
 * @private
 */
const _symbol = Symbol('TopButton singleton instance');
/**
 * TopButton instance
 * @type {?TopButton}
 * @private
 * @static
 */
let _instance = null;

/**
 * button element
 * @type {?Element}
 * @default null
 */
let element = null;

// TweenMax
const TweenLite = self.TweenLite;
const easing = self.com.greensock.easing;

/**
 * ページの先頭へ移動するアニメーションを実装します
 * @since 2016-10-28
 */
export class TopButton extends EventDispatcher {
  /**
   * singleton
   * @param {Symbol} target singleton を保証する inner Symbol
   * @return {?TopButton} singleton instance
   */
  constructor(target) {
    if (_symbol !== target) {
      throw new Error( 'TopButton is static Class. not use new TopButton().' );
    }
    if (_instance !== null) {
      return _instance;
    }
    super();
    // -------------------
    // one time setting
    /**
     * animation 可能かの flag
     * @type {boolean}
     */
    this.can = true;

    _instance = this;
    return _instance;
  }
  // ---------------------------------------------------
  //  EVENT
  // ---------------------------------------------------
  /**
   * top へ戻る scroll animation start event
   * @event START
   * @return {string} topButtonStart
   */
  static get START() {
    return 'topButtonStart';
  }
  /**
   * top へ戻る scroll animation complete event
   * @event COMPLETE
   * @return {string} topButtonStart
   */
  static get COMPLETE() {
    return 'topButtonComplete';
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * click event を target element へ設定します
   * @param {Element} target page top animation を設定する element
   */
  init(target) {
    if (element !== null) {
      return;
    }
    element = target;
    element.addEventListener('click', this.onClick.bind(this));
  }
  /**
   * click event handler
   * animation が可能なら開始する
   * @param {Event} event click event
   */
  onClick(event) {
    event.preventDefault();
    if (this.can) {
      this.go();
    }
  }
  /**
   * scroll animation を開始します
   */
  go() {
    if (!this.can) {
      return;
    }
    this.can = false;
    // scrolling
    TweenLite.to(
      window,
      0.5,
      {
        scrollTo: {
          y: 0,
          autoKill: false
        },
        // easing
        ease: easing.Power4.easeInOut,
        onStart: () => {
          this.dispatch({ type: TopButton.START });
        },
        onComplete: () => {
          this.can = true;
          this.dispatch({ type: TopButton.COMPLETE });
        }
      }
    );
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {TopButton} TopButton instance を返します
   */
  static factory():TopButton {
    if (_instance === null) {
      _instance = new TopButton(_symbol);
    }
    return _instance;
  }
}
