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
import { Dom } from '../app/Dom';

// util
import { Scroll } from '../util/Scroll';
import { Offset } from '../util/Offset';

// ui
import { TopButton } from '../ui/button/TopButton';

// TweenMax
const TweenLite = self.TweenLite;

// Sagen
const Sagen = self.Sagen;

/**
 * page top に戻る
 */
export class PageTop {
  /**
   * PageTop instance を作成し init 関数をコールします
   */
  static start() {
    let pageTop = new PageTop();
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
     * @private
     * @since 2016-09-01
     */
    this._boundScroll = this.onScroll.bind( this );
    /**
     * div#pageTop Element
     * @type {?Element}
     * @private
     * @since 2016-09-01
     */
    this._element = null;
    /**
     * div#pageTop Sagen.Dom instance
     * @type {?Sagen.Dom}
     * @private
     * @since 2016-09-01
     */
    this._dom = null;
    /**
     * div#footer-container Element
     * @type {?Element}
     * @private
     * @since 2016-09-01
     */
    this._footer = null;
    /**
     * div#footer-container Offset instance
     * @type {?Offset}
     * @private
     * @since 2016-09-01
     */
    this._footerOffset = null;
    /**
     * Scroll instance
     * @type {Scroll}
     * @private
     * @since 2016-09-01
     */
    this._scroll = Scroll.factory();

    /**
     * Dom.whole() を Offset instance として保存します
     * @type {?Offset}
     * @private
     */
    this._wholeOffset = null;

    /**
     * fade animation 中フラッグ
     * @type {boolean}
     * @private
     * @default false
     */
    this._inFade = false;

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
  init():void {
    const element = Dom.pageTop();
    if (element === null) {
      return;
    }
    // element.addEventListener( 'click', this.onClick.bind( this ), false );
    this._element = element;
    this.topButton.init(element);

    const footer = Dom.footer();
    if (footer === null) {
      return;
    }

    this._footer = footer;

    this.initRise();
  }
  /**
   * fixed / absolute 切替表示初期処理
   * @since 2016-09-01
   */
  initRise() {
    // @type {Sagen.Dom}
    this._dom = new Sagen.Dom(this._element);
    // @type {Offset} - footer offset
    this._footerOffset = new Offset(this._footer);
    // @type {Offset} - whole offset
    this._wholeOffset = new Offset(Dom.whole());

    // scroll event 監視開始
    const scroll = this._scroll;
    scroll.on( Scroll.SCROLL, this._boundScroll );
    scroll.start();
  }
  /**
   * Scroll.SCROLL event handler
   * @param {Object} event Scroll.SCROLL event object
   * @since 2016-09-01
   */
  onScroll(event:Object):void {
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
    const offset = this._footerOffset.offset();
    const whole = this._wholeOffset.offset();
    const checkHeight = whole.height - offset.height + 30;

    // console.log('offset', checkHeight, bottom, checkHeight <= bottom);
    if (checkHeight <= bottom) {
      this.free();
    } else {
      this.sticky();
    }
  }
  /**
   * ボタンを表示します
   * @return {boolean} 表示すると true を返します
   */
  show() {
    if (this._inFade) {
      return false;
    }

    const dom = this._dom;
    if (!dom.hasClass('blind')) {
      return false;
    }

    this._inFade = true;
    const element = this._element;

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
          this._inFade = false;
        }
      }
    );

    return true;
  }
  /**
   * ボタンを非表示にします
   * @return {boolean} 非表示にすると true を返します
   */
  hide() {
    if (this._inFade) {
      return false;
    }

    const dom = this._dom;
    if (dom.hasClass('blind')) {
      return false;
    }

    this._inFade = true;
    const element = this._element;
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
          this._inFade = false;
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
    const dom = this._dom;
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
    const dom = this._dom;
    if (!dom.hasClass('fixed')) {
      dom.addClass('fixed');
      return true;
    }

    return true;
  }
}
