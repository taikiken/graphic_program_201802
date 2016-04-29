/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/04/29 - 14:58
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Scroll} from '../../util/Scroll';
import {Offset} from '../../util/Offset';

const Sagen = self.Sagen;
const Dom = Sagen.Dom;

export class Sidebar {
  constructor( sidebar:Element, footer:Element ) {
    let offsets = [];
    let previous = 0;
    let parent = sidebar.parentNode;

    Object.assign( this, { sidebar, footer, offsets, previous, parent } );
  }
  addOffset( element:Element ):void {
    this.offsets.push(element);
  }
  start():void {
    let scroll = Scroll.factory();
    scroll.on( Scroll.SCROLL, this.scroll.bind( this ) );
    scroll.start();
  }

  scroll( event:Object ):void {

    let y = event.y;

    if ( this.previous < y ) {
      this.down( y );
    } else {
      this.up( y );
    }

    this.previous = y;
    
  }

  offset():Number {
    let elements = this.offsets;
    let offset = 0;
    for (var element of elements) {
      offset += parseInt( Dom.getStyle( element, 'height' ), 10 );
    }

    return offset;
  }

  down( y:Number ):void {
    let windowHeight = window.innerHeight;
    let windowBottom = y + windowHeight;

    let sidebar = this.sidebar;
    let rect = Offset.offset( sidebar );
    let sidebarHeight = parseInt(rect.height, 10);
    let sidebarTop = parseInt(rect.top, 10);
    let sidebarBottom = sidebarTop + sidebarHeight;

    let parentRect = Offset.offset( this.parent );
    let parentTop = parseInt( parentRect.top, 10 );

    let offset = this.offset();


    let footerRect = Offset.offset( this.footer );
    let footerTop = parseInt( footerRect.top, 10 );

    console.log( 'height bottom', sidebarTop, sidebarHeight, sidebarBottom, offset, parentTop, y, windowHeight, windowBottom );
    if ( sidebarBottom < windowBottom ) {
      let top = sidebarBottom - windowBottom;
      // sidebar.style.cssText = `position: absolute; top: ${top}px`;
      console.log( '****', top );
    }

  }
  up( y:Number ):void {
    // let sidebar = this.sidebar;
    // let elements = this._offsets;
    // let offset = 0;
    // let current = sidebar.style.cssText;
    //
    // for (var element of elements) {
    //   offset += parseInt( Dom.getStyle( element, 'height' ), 10 );
    // }
    //
    // if ( y <= offset && current !== '' ) {
    //   sidebar.style.cssText = '';
    // }
  }
}
