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

let _symbol = null;
let _instance = null;

/**
 * scroll に関する処理
 */
export class Scroll extends EventDispatcher {
  /**
   * scroll に関する singleton class
   * @param {Symbol} target Singleton を実現するための private symbol
   * @returns {Scroll}
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
  start():void {
    window.addEventListener( 'scroll', this.boundScroll, false );
  }
  stop():void {
    window.removeEventListener( 'scroll', this.boundScroll );
  }
  onScroll( event:Event ):void {
    this.dispatch( { type: Scroll.SCROLL, originalEvent: event, y: Scroll.y } );
  }
  // ---------------------------------------------------
  //  static GETTER / SETTER
  // ---------------------------------------------------
  static get SCROLL():string {
    return 'scroll';
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
   * @param {Number} top
   */
  static set y( top:Number ):void {
    window.scrollTo( 0, top );
  }
/*
  motion( top:Number, duration:Number = 0.5, easing:Function = null ):void {

  }
  */
  // ---------------------------------------------------
  //  static method
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {Scroll} Scroll instance を返します
   */
  static factory():Scroll {

    if ( _instance === null ) {

      _instance = new Router( _symbol );

    }

    return _instance;
  }
}
