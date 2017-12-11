/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/03 - 14:01
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/* eslint constructor-super: 0 */

import {EventDispatcher} from '../event/EventDispatcher';

// tween
const greensock = self.com.greensock;
const TweenLite = greensock.TweenLite;
const easing = greensock.easing;

/**
 * Singleton を保証するために constructor 引数にする Symbol
 * @type {Symbol}
 * @private
 */
const _symbol = Symbol('singleton Scroll instance');

/**
 * Scroll instance
 * @type {?Scroll}
 * @static
 * @private
 */
let _instance = null;
/**
 * window.onscroll 監視を始めたかの真偽値
 * @type {boolean}
 * @static
 * @private
 */
let _watch = false;

/**
 * scroll に関する処理
 */
export class Scroll extends EventDispatcher {
  /**
   * scroll に関する singleton class
   * @param {Symbol} target Singleton を実現するための private symbol
   * @returns {Scroll} Scroll instance を返します
   */
  constructor(target:Symbol) {
    if (_symbol !== target) {
      throw new Error( 'Scroll is singleton Class. not use new Scroll(). instead Scroll.factory()' );
    }

    if(_instance !== null) {
      return _instance;
    }

    super();
    _instance = this;
    /**
     * onScroll 関数 を bind しpublic 変数にします
     * @type {Function}
     */
    this.boundScroll = this.onScroll.bind( this );

    /**
     * 前回{y}値
     * @type {number}
     * @default -1
     */
    this.previous = -1;
    /**
     * 移動 px
     * @type {number}
     */
    this.distance = 0;
    /**
     * 移動方向, scroll 方向が変わったら distance を 0 にする
     * @type {number}
     */
    this.direction = -1;

    return _instance;
  }
  // ---------------------------------------------------
  //  method
  // ---------------------------------------------------
  /**
   * window scroll 監視を開始します
   */
  start():void {
    if ( !_watch ) {
      _watch = true;
      window.addEventListener( 'scroll', this.boundScroll, false );
    }
  }
  /**
   * window scroll 監視を止めます
   */
  stop():void {
    // 2016-09-16
    // listener がいなかったら止める
    _watch = false;
    window.removeEventListener( 'scroll', this.boundScroll );
  }
  /**
   * window.onscroll event handler<br>
   * window scroll event 発生後に scroll top 位置をもたせた Scroll.SCROLL custom event を発火します<br>
   * {{type: string, originalEvent: Event, y: number, height: number, moving: number, changed: boolean}} event object
   * @param {Event} originalEvent window scroll event
   */
  onScroll( originalEvent:Event ):void {
    // this.dispatch( { type: Scroll.SCROLL, originalEvent: event, y: Scroll.y } );
    // @since 2016-09-30, 戻り値に window.innerHeight, moving, changed 追加
    const previous = this.previous;
    const type = Scroll.SCROLL;
    const y = Scroll.y;
    const height = window.innerHeight;
    const bottom = y + height;
    // @type {number} - 正の時: scroll down
    const moving = previous - y;
    const changed = moving !== 0;
    const direction = Math.sqrt(moving * moving) / moving;
    // scroll 方向が変わったら distance を 0 にする
    if (direction !== this.direction) {
      this.distance = 0;
      this.direction = direction;
    }
    const distance = this.distance + moving;
    this.distance = distance;
    this.previous = y;
    this.dispatch({
      type,
      originalEvent,
      y,
      height,
      bottom,
      moving,
      distance,
      changed
    });
  }
  /**
   * 強制的に scroll event を発生させます
   */
  fire():void {
    // this.dispatch( { type: Scroll.SCROLL, originalEvent: null, y: Scroll.y } );
    // @since 2016-09-30, 戻り値に window.innerHeight, moving, changed 追加
    const previous = this.previous;
    const type = Scroll.SCROLL;
    const y = Scroll.y;
    const height = window.innerHeight;
    const bottom = y + height;
    // @type {number} - 正の時: scroll down
    // on 2016-10-28, 下記式だと 負の時: scroll down, かなり長いこと使ってるのでこのままにします
    const moving = previous - y;
    // const direction = Math.sqrt(moving * moving) / moving;
    // // scroll 方向が変わったら distance を 0 にする
    // if (direction !== this.direction) {
    //   this.distance = 0;
    //   this.direction = direction;
    // }
    const distance = this.distance + moving;
    this.distance = distance;

    // this.previous = y;
    this.dispatch({
      type,
      y,
      height,
      bottom,
      moving,
      distance,
      originalEvent: null,
      changed: true
    });
  }
  // ---------------------------------------------------
  //  EVENT
  // ---------------------------------------------------
  /**
   * SCROLL event
   * @return {string} scrollScroll
   */
  static get SCROLL():string {
    return 'scrollScroll';
  }
  // ---------------------------------------------------
  //  static GETTER / SETTER
  // ---------------------------------------------------
  /**
   * scroll top 位置
   * @return {Number} scroll top 位置を返します
   */
  static get y():Number {
    // https://developer.mozilla.org/ja/docs/Web/API/Window/scrollY
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/pageYOffset
    return (typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  }
  /**
   * scroll top 位置 を設定します
   * @param {Number} top スクロール位置(px)
   */
  static set y(top) {
    // time out 内でないと有効にならない
    // @since 2017-01-17 timeout でラップする
    setTimeout(() => {
      window.scrollTo(0, top);
    }, 0);
  }
  // ---------------------------------------------------
  //  static method
  // ---------------------------------------------------
  /**
   * scroll animation を行います
   * @param {Number} top 目標位置
   * @param {Number} [duration=0.5] motion 時間 sec.
   * @param {Number} [delay=0] delay 時間 sec.
   * @param {Function} [easingFunc=Power3.easeOut] easing function
   * @param {Function} [complete=null] complete callback function
   * @param {Boolean} [autoKill=false] autoKill flag
   */
  static motion( top:Number, duration:Number = 0.5, delay:Number = 0, easingFunc:Function = easing.Power3.easeOut, complete:Function = null, autoKill:Boolean = false ):void {
    if ( easingFunc === null || typeof easingFunc !== 'function' ) {
      easingFunc = easing.Power3.easeOut;
    }

    TweenLite.to(
      window,
      duration,
      {
        scrollTo: {
          y: top,
          autoKill: autoKill
        },
        delay: delay,
        easing: easingFunc,
        onComplete: function() {
          if ( typeof complete === 'function' ) {
            complete.call( this );
          }
        }
      }
    );
  }
  /**
   * y 0 にし、ユーザースクロールアクションで動作をキャンセルします
   * @param {Number} [duration=0.5] motion 時間 sec.
   * @param {Number} [delay=0] delay 時間 sec.
   * @param {Function} [start=null] onStart callback function
   * @param {Function} [complete=null] onComplete callback function
   * @param {Boolean} [autoKill=true] autoKill flag
   * @return {TweenLite} TweenLite instance を返します
   */
  static sticky( duration:Number = 0.5, delay:Number = 0, start:Function = null, complete:Function = null, autoKill:Boolean = true ):TweenLite {
    return TweenLite.to(
      window,
      duration,
      {
        scrollTo: {
          y: 0,
          autoKill: autoKill,
          onAutoKill: function() {
            // console.log( 'onAutoKill', complete );
            if ( typeof complete === 'function' ) {
              complete.call( this );
            }
          }
        },
        delay: delay,
        easing: easing.Power3.easeOut,
        onStart: function() {
          if ( typeof start === 'function' ) {
            start.call( this );
          }
        },
        onComplete: function() {
          if ( typeof complete === 'function' ) {
            complete.call( this );
          }
        }
      }
    );
  }
  /**
   * singleton instance を生成します
   * @return {Scroll} Scroll instance を返します
   */
  static factory():Scroll {
    if (_instance === null) {
      _instance = new Scroll(_symbol);
    }
    return _instance;
  }
  // ---------------------------------------------------
  //  enable / disable scroll
  /**
   * scroll を一時的に無効化します
   * @see http://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
   * @since 2016-10-28
   */
  static disable() {
    window.addEventListener('wheel', Scroll.disableScroll, false);
    window.addEventListener('mousewheel', Scroll.disableScroll, false);
    document.addEventListener('mousewheel', Scroll.disableScroll, false);
    window.addEventListener('touchmove', Scroll.disableScroll, false);
    document.addEventListener('keydown', Scroll.keyDown, false);
  }

  /**
   * scroll を遅延させて回復します
   * @param {number} [delay=500] 遅延時間(ms)
   * @since 2016-10-28
   */
  static enable(delay = 500) {
    setTimeout(Scroll.activate, delay);
    _instance.fire();
  }
  /**
   * scroll 関連イベントハンドラ, 全て止めます
   * @param {Event} event scroll 関連イベント
   * @since 2016-10-28
   */
  static disableScroll(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  /**
   * key down event handler<br>
   * 37, 38, 39, 40 を無効にします
   *
   * - 32 - spacebar
   * - 33 - pageup
   * - 34 - pagedown
   * - 35 - end
   * - 36 - home
   * - 37 - left
   * - 38 - up
   * - 39 - right
   * - 49 - down
   * @param {Event} event key dwon event
   * @since 2016-10-28
   */
  static keyDown(event) {
    const code = event.keyCode;
    if ([37, 38, 39, 40].indexOf(code) !== -1) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  /**
   * scroll を回復します
   * @since 2016-10-28
   */
  static activate() {
    window.removeEventListener('wheel', Scroll.disableScroll);
    window.removeEventListener('mousewheel', Scroll.disableScroll);
    document.removeEventListener('mousewheel', Scroll.disableScroll);
    window.removeEventListener('touchmove', Scroll.disableScroll);
    document.removeEventListener('keydown', Scroll.keyDown);
    // 初期化します
    _instance.distance = 0;
  }
}
