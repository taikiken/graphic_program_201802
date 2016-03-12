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
'use strict';

import {EventDispatcher} from '../event/EventDispatcher';

// tween
let greensock = self.com.greensock;
let TweenLite = greensock.TweenLite;
let easing = greensock.easing;

let _symbol = null;
let _instance = null;
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
  constructor( target:Symbol ) {
    if ( _symbol !== target ) {

      throw new Error( `Scroll is singleton Class. not use new Scroll(). instead Scroll.factory()` );

    }

    if ( _instance === null ) {
      super();
      _instance = this;
      this.boundScroll = this.onScroll.bind( this );
    }

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
    _watch = false;
    window.removeEventListener( 'scroll', this.boundScroll );
  }
  /**
   * window.onscroll event handler
   * @param {Event} event window scroll event
   */
  onScroll( event:Event ):void {
    this.dispatch( { type: Scroll.SCROLL, originalEvent: event, y: Scroll.y } );
  }
  // ---------------------------------------------------
  //  static GETTER / SETTER
  // ---------------------------------------------------
  static get SCROLL():string {
    return 'scrollScroll';
  }
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
  static set y( top:Number ):void {
    window.scrollTo( 0, top );
  }

  /**
   * scroll animation を行います
   * @param {Number} top 目標位置
   * @param {Number} [duration=0.5] motion 時間 sec.
   * @param {Number} [delay=0] delay 時間 sec.
   * @param {Function} [easingFunc=Power3.easeOut] easing function
   */
  static motion( top:Number, duration:Number = 0.5, delay:Number = 0, easingFunc:Function = easing.Power3.easeOut ):void {
    TweenLite.to(
      window,
      duration,
      {
        scrollTo: {
          y: top
        },
        delay: delay,
        easing: easingFunc
      }
    );
  }

  // ---------------------------------------------------
  //  static method
  // ---------------------------------------------------
  /**
   * singleton instance を生成します
   * @return {Scroll} Scroll instance を返します
   */
  static factory():Scroll {

    if ( _instance === null ) {

      _instance = new Scroll( _symbol );

    }

    return _instance;
  }
}
