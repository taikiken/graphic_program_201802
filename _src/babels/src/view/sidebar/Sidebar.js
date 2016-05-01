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

import {Content} from '../../app/const/Content';

import {Scroll} from '../../util/Scroll';
import {Offset} from '../../util/Offset';

const Sagen = self.Sagen;
const Dom = Sagen.Dom;

export class Sidebar {
  constructor( sidebar:Element, footer:Element ) {
    let offsets:Array = [];
    let previous:Number = 0;
    let id:Number = 0;
    // .whole
    sidebar.parentNode.style.cssText = `width: ${Content.SIDEBAR_WIDTH}px;`;
    let parent = sidebar.parentNode.parentNode;
    let whole:Node = footer.parentNode;
    let boundUpdate = this.update.bind( this );
    let padding:Number = 30;
    let css:String = `position: absolute; top: ${padding}px; width: ${Content.SIDEBAR_WIDTH}px;`;

    Object.assign( this, { sidebar, footer, offsets, previous, parent, whole, id, boundUpdate, padding, css } );
  }
  addOffset( element:Element ):void {
    this.offsets.push(element);
  }
  style( css:String ):void {
    this.sidebar.style.cssText = css;
  }
  start():void {
    // let scroll = Scroll.factory();
    // scroll.on( Scroll.SCROLL, this.scroll.bind( this ) );
    // scroll.start();

    // set default style
    this.style( this.css );
    this.update();
  }
  stop():void {
    cancelAnimationFrame(this.id);
  }

  update():void {
    this.id = requestAnimationFrame(this.boundUpdate);
    this.scroll( {y: Scroll.y} );
  }

  scroll( event:Object ):void {

    let y:Number = event.y;
    let down:Boolean = this.previous < y;
    let up:Boolean = this.previous > y;
    
    if ( down ) {
      this.scrollDown( y );
    } else if ( up ) {
      this.scrollUp( y );
    }
    // this.top( y, this.previous < y );

    this.previous = y;
    
  }

  offset():Number {
    let elements = this.offsets;
    let offset = 0;
    for (var element of elements) {
      offset += parseInt( Dom.getStyle( element, 'height' ), 10 );
    }

    offset += parseInt( Dom.getStyle(this.parent, 'padding-top'), 10);

    return offset;
  }

  // top( y:Number, down:Boolean ):void {
  //   const margin = 30;
  //   let windowHeight = window.innerHeight;
  //   let windowBottom = y + windowHeight;
  //
  //   let sidebar = this.sidebar;
  //   let rect = Offset.offset( sidebar );
  //   let sidebarHeight = parseInt(rect.height, 10);
  //   // let sidebarTop = parseInt(rect.top, 10);
  //   // let sidebarBottom = sidebarTop + sidebarHeight;
  //
  //   let offset = this.offset();
  //   let sidebarBottom = offset + sidebarHeight;
  //   let css = '';
  //
  //   if ( y > offset + margin ) {
  //     if ( sidebarBottom < windowBottom - margin ) {
  //       let top = windowBottom - sidebarHeight - offset - margin;
  //       // if ( down ) {
  //       //   top = this.down( top, sidebarHeight, offset, margin );
  //       // } else {
  //       //   top = this.up( top, y, offset );
  //       // }
  //       top = this.down( top, sidebarHeight, offset, margin );
  //       // if (!down) {
  //       // top = this.up( top, y, offset );
  //       // }
  //       // sidebar.style.cssText = `position: absolute; top: ${top}px; transition-property: top; transition-duration: 0.025s`;
  //       css = `position: absolute; top: ${top}px;`;
  //       console.log( '****', top );
  //     }
  //   }
  //
  //   sidebar.style.cssText = css;
  //
  // }

  down( top:Number, sidebarHeight:Number, offset:Number, margin:Number ):Number {
    let parentRect = Offset.offset( this.parent );
    let parentHeight = parseInt( parentRect.height, 10 );

    let footerRect = Offset.offset( this.footer );
    let footerHeight = parseInt( footerRect.height, 10 );

    let limitBottom = parentHeight - footerHeight - margin;
    let altBottom = top + sidebarHeight + offset;

    console.log( 'height bottom', altBottom, top, sidebarHeight, limitBottom, parentHeight, footerHeight );
    if ( altBottom > limitBottom ) {
      console.log( 'footerTop', top, limitBottom, altBottom );
      top += (limitBottom - altBottom);
    }
    return top;
  }
  // up( top:Number, y:Number, offset:Number ):Number {
  //   if ( y < offset ) {
  //     top = 0;
  //   }
  //
  //   return top;
  // }
  
  scrollDown( y:Number ):void {
    let sidebar = this.sidebar;

    let windowHeight = window.innerHeight;
    let windowBottom = y + windowHeight;

    let rect = Offset.offset( sidebar );
    let sidebarHeight = parseInt(rect.height, 10);

    let offset = this.offset();
    let sidebarBottom = offset + sidebarHeight;
    let css = this.css;

    // scroll top が offset (header + nav + side-sec: padding-top) より大きかったら
    // sidebar bottom( offset + sidebar height ) が window bottom(scroll top + window height)より小さくなったら
    if ( y > offset && sidebarBottom < windowBottom ) {
      css = `position: fixed; bottom: 0; width: ${Content.SIDEBAR_WIDTH}px;`;

      let wholeRect = Offset.offset( this.whole );
      let wholeHeight = parseInt( wholeRect.height, 10 );

      let footerRect = Offset.offset( this.footer );
      let footerHeight = parseInt( footerRect.height, 10 );

      let limitBottom = wholeHeight - footerHeight - this.padding;

      if ( windowBottom > limitBottom ) {
        css = `position: absolute; bottom: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;`;
      }
    }

    // sidebar.style.cssText = css;
    this.style( css );
  }
  scrollUp( y:Number ):void {
    let sidebar = this.sidebar;

    let windowHeight = window.innerHeight;
    let windowBottom = y + windowHeight;

    let wholeRect = Offset.offset( this.whole );
    let wholeHeight = parseInt( wholeRect.height, 10 );

    let rect = Offset.offset( sidebar );
    let sidebarHeight = parseInt(rect.height, 10);

    let footerRect = Offset.offset( this.footer );
    let footerHeight = parseInt( footerRect.height, 10 );

    // let sidebarTop = windowBottom - sidebarHeight - 30;
    // console.log( 'sidebarTop', rect, sidebarTop );

    let offset = this.offset();
    let range = offset + sidebarHeight;

    let css = `position: absolute; bottom: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;`;

    if ( y <= wholeHeight - ( sidebarHeight + footerHeight + this.padding ) ) {
      css = `position: fixed; top: 0; width: ${Content.SIDEBAR_WIDTH}px;`;

      if ( y <= offset ) {
        css = `position: absolute; top: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;`;
      }

      if ( y > range ) {
        css = `position: absolute; bottom: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;`;
      }
    }

    sidebar.style.cssText = css;
  }
}
