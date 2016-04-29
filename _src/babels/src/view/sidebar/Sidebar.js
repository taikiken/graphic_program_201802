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
  constructor( sidebar:Element ) {
    Object.assign( this, { sidebar } );
    this._offsets = [];
    this._previous = 0;
  }
  addOffset( element:Element ):void {
    this._offsets.push(element);
  }
  start():void {
    Scroll.factory().on( Scroll.SCROLL, this.scroll.bind( this ) );
  }
  scroll( event:Object ):void {

    let y = event.y;

    if ( this._previous < y ) {
      this.down( y );
    } else {
      this.up( y );
    }

    this._previous = y;
    
  }

  down( y:Number ):void {
    let sidebar = this.sidebar;
    let windowHeight = window.innerHeight;
    let windowBottom = y + windowHeight;
    let rect = Offset.offset( this.sidebar );
    let height = parseInt(rect.height, 10);
    let top = parseInt(rect.top, 10);
    let bottom = top + height;
    let css = 'position: fixed; bottom: 0;';
    let current = sidebar.style.cssText;

    if ( bottom >= windowBottom && current !== css ) {
      sidebar.style.cssText = css;
    }

  }
  up( y:Number ):void {
    let sidebar = this.sidebar;
    let elements = this._elements;
    let offset = 0;
    let current = sidebar.style.cssText;

    for (var element of elements) {
      offset += parseInt( Dom.style( element, 'height' ), 10 );
    }

    if ( y <= offset && current !== '' ) {
      sidebar.style.cssText = '';
    }
  }
}
