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


// UT
const UT = self.UT;
const Dom = UT.app.Dom;
const Scroll = UT.util.Scroll;
const Offset = UT.util.Offset;

// TweenMax
const TweenLite = self.TweenLite;
const easing = self.com.greensock.easing;

// Sagen
const Sagen = window.Sagen;

/**
 * page top に戻る
 */
export class PageTop {
  /**
   * page top に戻る motion
   */
  constructor() {
    /**
     * <p>bind 済み this.onComplete<br>ページトップへ戻るアニメーション完了を listener します</p>
     * @type {Function}
     * @private
     */
    this._boundComplete = this.onComplete.bind( this );
    /**
     * click 不可管理フラッグ
     * @type {boolean}
     * @private
     * @default true;
     */
    this._can = true;

    // @since 2016-09-01
    // https://github.com/undotsushin/undotsushin/issues/1053
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

    this._wholeOffset = null;

    this._inFade = false;
  }
  /**
   * click event を bind します
   */
  init():void {
    const element = Dom.pageTop();
    if (element === null) {
      return;
    }
    element.addEventListener( 'click', this.onClick.bind( this ), false );
    this._element = element;

    const footer = Dom.footer();
    if (footer === null) {
      return;
    }

    this._footer = footer;

    this.initRise();
  }
  /**
   * <p>element click event handler</p>
   * <p>click 管理フラッグが true ならフラッグを false にし<br>ページの上部(offsetY: 0)へ戻すアニメーションを開始します</p>
   * @param {Event} event native event, click event
   */
  onClick( event:Event ):void {
    event.preventDefault();

    // click 不可のときは処理しない
    if ( !this._can ) {
      return;
    }

    let complete = this._boundComplete;
    this._can = false;

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
        onComplete: complete
      }
    );
  }
  /**
   * <p>page top motion complete<br>
   * click 管理フラッグを true にします</p>
   */
  onComplete():void {
    this._can = true;
  }
  /**
   * PageTop instance を作成し init 関数をコールします
   */
  static start():void {
    let pageTop = new PageTop();
    pageTop.init();
  }
  // -------------------------------------------------------------------------
  // @since 2016-09-01
  // https://github.com/undotsushin/undotsushin/issues/1053
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
