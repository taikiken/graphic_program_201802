/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/08
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
'use strict';

import {EventDispatcher} from '../event/EventDispatcher';

import {Dom} from '../util/Dom';
import {Scroll} from '../util/Scroll';

export class Rise extends EventDispatcher {
  constructor( element:Element, offset:Number = 0 ) {
    super();
    this._element = element;
    this._offset = offset;
    this._dom = new Dom( element );
    this._boundScroll = this.onScroll.bind( this );
  }
  static get RISE():string {
    return 'rise';
  }

  start():void {
    Scroll.on( Scroll.SCROLL, this._boundScroll );
  }
  stop():void {
    Scroll.off( Scroll.SCROLL, this._boundScroll );
  }
  onScroll( event:Object ):void {

    let y = event.y;
    let windowHeight = window.innerHeight;
    let windowBottom = y + windowHeight - this._offset;

    let offsetRect = this._dom.offset();
    let elementBottom = offsetRect.top + offsetRect.height;

    if ( offsetRect > elementBottom ) {
      this.dispatch( { type: Rise.RISE, window: windowBottom, element: elementBottom } );
    }
  }
}
