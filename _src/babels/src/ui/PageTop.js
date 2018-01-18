/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/17 - 18:14
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// babels_exe から移植

// app
import Dom from '../app/Dom';

// util
import { Scroll } from '../util/Scroll';
import { Offset } from '../util/Offset';

// ui
import { TopButton } from '../ui/button/TopButton';

// TweenMax
/**
 * [library] - gsap.TweenLite
 */
const TweenLite = self.TweenLite;

// Sagen
/**
 * [library] - Sagen
 */
const Sagen = self.Sagen;

/**
 * page top に戻る
 */
export default class PageTop {
  /**
   * PageTop instance を作成し init 関数をコールします
   */
  static start() {
    const pageTop = new PageTop();
    pageTop.init();
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * page top に戻る motion
   */
  constructor() {
    /**
     * bind 済み this.onScroll
     * @type {Function}
     * @since 2016-09-01
     */
    this.boundScroll = this.onScroll.bind( this );
    /**
     * div#pageTop Element
     * @type {?Element}
     * @since 2016-09-01
     */
    this.element = null;
    /**
     * div#pageTop Sagen.Dom instance
     * @type {?Sagen.Dom}
     * @since 2016-09-01
     */
    this.dom = null;
    /**
     * div#footer-container Element
     * @type {?Element}
     * @since 2016-09-01
     */
    this.footer = null;
    /**
     * div#footer-container Offset instance
     * @type {?Offset}
     * @since 2016-09-01
     */
    this.footerOffset = null;
    /**
     * Scroll instance
     * @type {Scroll}
     * @since 2016-09-01
     */
    this.scroll = Scroll.factory();

    /**
     * Dom.whole() を Offset instance として保存します
     * @type {?Offset}
     */
    this.wholeOffset = null;

    /**
     * fade animation 中フラッグ
     * @type {boolean}
\     * @default false
     */
    this.inFade = false;

    /**
     * click で top へ戻るアニメーションを
     * @type {TopButton}開始します
     * @since 2016-10-28
     */
    this.topButton = TopButton.factory();
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * click event を bind します
   */
  init() {
    const element = Dom.pageTop();
    if (element === null) {
      return;
    }
    // element.addEventListener( 'click', this.onClick.bind( this ), false );
    this.element = element;
    this.topButton.init(element);

    const footer = Dom.footer();
    if (footer === null) {
      return;
    }

    this.footer = footer;

    this.initRise();
  }
  /**
   * fixed / absolute 切替表示初期処理
   * @since 2016-09-01
   */
  initRise() {
    // @type {Sagen.Dom}
    this.dom = new Sagen.Dom(this.element);
    // @type {Offset} - footer offset
    this.footerOffset = new Offset(this.footer);
    // @type {Offset} - whole offset
    this.wholeOffset = new Offset(Dom.whole());

    // scroll event 監視開始
    const scroll = this.scroll;
    scroll.on(Scroll.SCROLL, this.boundScroll);
    scroll.start();
  }
  /**
   * Scroll.SCROLL event handler
   * @param {Object} event Scroll.SCROLL event object
   * @since 2016-09-01
   */
  onScroll(event) {
    // @type {number} - scrollTop
    const y = event.y;
    // @type {number} - window height
    const height = window.innerHeight;
    // @type {number} - browser 下端
    const bottom = y + height;

    // scrollTop 280px 以上でボタン表示
    if (y >= 280) {
      this.show();
    } else {
      this.hide();
      return;
    }

    // fixed / free
    // whole の高さから footer の高さを引い値が 下端 以下になったら absolute にする
    // footer よりボタンが飛び出ている 30px を加算する
    const offset = this.footerOffset.offset();
    const whole = this.wholeOffset.offset();
    const checkHeight = whole.height - offset.height + 30;

    // console.log('offset', checkHeight, bottom, checkHeight <= bottom);
    if (checkHeight <= bottom) {
      this.free();
    } else {
      this.sticky();
    }
  }
  /**
   * ボタンを表示します - fadein
   * @return {boolean} 表示すると true を返します
   */
  show() {
    if (this.inFade) {
      return false;
    }

    const dom = this.dom;
    if (!dom.hasClass('blind')) {
      return false;
    }

    this.inFade = true;
    const element = this.element;

    element.style.cssText = 'opacity: 0;';
    const target = {
      step: 0
    };

    TweenLite.to(
      target,
      0.5,
      {
        step: 1,
        onStart: () => {
          dom.removeClass('blind');
        },
        onUpdate: () => {
          element.style.cssText = `opacity: ${target.step};`;
        },
        onComplete: () => {
          element.style.cssText = '';
          this.inFade = false;
        }
      }
    );

    return true;
  }
  /**
   * ボタンを非表示にします - fadeout
   * @return {boolean} 非表示にすると true を返します
   */
  hide() {
    if (this.inFade) {
      return false;
    }

    const dom = this.dom;
    if (dom.hasClass('blind')) {
      return false;
    }

    this.inFade = true;
    const element = this.element;
    const target = {
      step: 1
    };

    TweenLite.to(
      target,
      0.5, {
        step: 0,
        onUpdate: () => {
          element.style.cssText = `opacity: ${target.step};`;
        },
        onComplete: () => {
          dom.addClass('blind');
          if (!dom.hasClass('fixed')) {
            dom.addClass('fixed');
          }
          element.style.cssText = '';
          this.inFade = false;
        }
      }
    );

    return true;
  }
  /**
   * absolute にします
   * @return {boolean} absolute にすると true を返します
   */
  free() {
    const dom = this.dom;
    if (dom.hasClass('fixed')) {
      dom.removeClass('fixed');
      return true;
    }

    return false;
  }
  /**
   * fixed にします
   * @return {boolean} fixed にすると true を返します
   */
  sticky() {
    const dom = this.dom;
    if (!dom.hasClass('fixed')) {
      dom.addClass('fixed');
      return true;
    }

    return true;
  }
}
