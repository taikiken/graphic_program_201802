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

export class Scroll extends EventDispatcher {
  constructor() {
    super();
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
}
