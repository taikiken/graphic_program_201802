/**
 * Copyright (c) 2011-2018 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2018/04/19 - 18:20
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// TweenMax
/**
 * [library] - gsap.TweenLite
 */
const TweenLite = self.TweenLite;
/**
 * [library] - gsap.easing
 */
const easing = self.com.greensock.easing;

/**
 * SP page top に戻るボタンの実装 - 移植 `exe-sp` から
 * @since 2018-04-19 vk header
 */
export default class SPPageTop {
  /**
   * SP page top に戻るボタン
   * @param {Element} element click target
   */
  constructor(element) {
    /**
     * click target
     * @type {Element}
     */
    this.element = element;
    // this.onComplete = this.onComplete.bind(this);
    /**
     * bind onClick
     * @type {any}
     */
    this.onClick = this.onClick.bind(this);
    /**
     * motion 可能 flag
     * @type {boolean}
     */
    this.can = true;
  }

  /**
   * click event handler - page top 戻るアニメーション開始
   * @param {Event} event click Event
   */
  onClick(event) {
    event.preventDefault();
    this.move();
  }
  // onComplete() {
  //   this.can = true;
  // }
  /**
   * page top 戻るアニメーション開始
   * - `can` flag チェックし可能なら開始します
   */
  move() {
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
        onComplete: () => {
          this.can = true;
        },
      }
    );
  }
  /**
   * click event を監視します
   */
  start() {
    this.element.addEventListener('click', this.onClick, false);
  }
}
