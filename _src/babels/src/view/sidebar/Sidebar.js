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

/**
 * sidebar をスクロール追随させます
 */
export class Sidebar {
  /**
   * sidebar をスクロール追随させます
   * @param {Element} sidebar #sidebar-moving-container
   * @param {Element} footer #footer-container'
   */
  constructor( sidebar:Element, footer:Element ) {
    let offsets:Array = [];
    let previous:Number = 0;
    let id:Number = 0;
    // // .sidebar-root-container
    // sidebar.parentNode.style.cssText = `width: ${Content.SIDEBAR_WIDTH}px;`;
    let parent = sidebar.parentNode;
    // .whole
    let whole:Node = footer.parentNode;
    let boundUpdate = this.update.bind( this );
    let padding:Number = 30;
    let css:String = `position: absolute; top: ${padding}px; width: ${Content.SIDEBAR_WIDTH}px;`;
    let fixedBottom:String = `position: fixed; bottom: 0; width: ${Content.SIDEBAR_WIDTH}px;`;
    let fixed = {
      top: false,
      bottom: false
    };

    Object.assign( this, { sidebar, footer, offsets, previous, parent, whole, id, boundUpdate, padding, css, fixedBottom, fixed } );
  }
  /**
   * offset 計算対象 element を追加します
   * @param {Element} element offset 計算させる element, header, nav...
   */
  addOffset( element:Element ):void {
    this.offsets.push(element);
  }
  /**
   * sidebar へ style を設定します
   * @param {String} css 設定する css text
   */
  style( css:String ):void {
    this.sidebar.style.cssText = css;
  }
  height( element:Element ):Number {
    return parseInt( Dom.getStyle( element, 'height' ), 10 );
  }
  /**
   * 開始
   * instance 作成後に必ず実行します
   */
  start():void {
    // let scroll = Scroll.factory();
    // scroll.on( Scroll.SCROLL, this.scroll.bind( this ) );
    // scroll.start();

    // set default style
    this.style( this.css );
    this.update();
  }
  /**
   * 監視をやめます
   */
  stop():void {
    cancelAnimationFrame(this.id);
  }
  /**
   * loop 関数
   * start 実行後常時監視します
   */
  update():void {
    this.id = requestAnimationFrame(this.boundUpdate);
    this.scroll( {y: Scroll.y} );
  }
  /**
   * 現在の scroll top 位置を元に追随計算します
   * update から call されます
   * @param {{y: Number}} event scroll top が含まれた Object
   */
  scroll( event:Object ):void {

    let y:Number = event.y;
    let sidebarHeight = this.height( this.sidebar );
    let wholeHeight = this.height( this.whole );

    if ( wholeHeight > sidebarHeight ) {
      // whole が sidebar より高い時のみ
      let down:Boolean = this.previous < y;
      let up:Boolean = this.previous > y;

      // if ( down ) {
      //   this.scrollDown( y );
      // } else if ( up ) {
      //   this.scrollUp( y );
      // }
      if ( down || up ) {
        this.top( down, y, sidebarHeight, wholeHeight );
      }

    } else {
      if ( this.fixed.top || this.fixed.bottom ) {
        // 何もしなくても大丈夫な default css を与える
        this.style( this.css );
        this.fixed.top = false;
        this.fixed.bottom = false;
      }
    }
    // this.top( y, this.previous < y );

    this.previous = y;
    
  }
  /**
   * 保存されている offset 計算対象 element の高さの合計を計算します
   * .side-sec の padding-top も含みます
   * @return {number} 保存されている offset 計算対象 element の高さの合計を計算し返します
   */
  offset():Number {
    let elements = this.offsets;
    let offset = 0;
    for (var element of elements) {
      offset += parseInt( Dom.getStyle( element, 'height' ), 10 );
    }

    offset += parseInt( Dom.getStyle(this.parent, 'padding-top'), 10);

    return offset;
  }

  top( direction:Boolean, y:Number, sidebarHeight:Number, wholeHeight:Number ):void {
    // let sidebar = this.sidebar;

    let windowHeight = parseInt( window.innerHeight, 10 );
    let windowBottom = y + windowHeight;

    let offset = this.offset();

    // let sidebarHeight = this.height( sidebar );
    let sidebarTop = windowBottom - sidebarHeight;
    let sidebarBottom = offset + sidebarHeight;

    let footerHeight = this.height( this.footer );

    // let wholeHeight = this.height( this.whole );
    let limitBottom = wholeHeight - footerHeight - this.padding;

    // 可動域
    if ( y <= offset ) {
      //  scroll 位置が上部
      this.style( `position: absolute; top: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;` );
    } else if ( windowBottom > limitBottom ) {
      this.style( `position: absolute; bottom: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;` );
    } else {
      if ( direction ) {
        // scroll down
        this.down( sidebarBottom, windowBottom, limitBottom );
      } else {
        // scroll up
        this.up( sidebarBottom, windowBottom, sidebarTop - footerHeight, y );
      }
    }
  }

  down( sidebarBottom:Number, windowBottom:Number, limitBottom:Number ):void {
    if ( sidebarBottom < windowBottom ) {
      if ( windowBottom > limitBottom ) {
        this.style( `position: absolute; bottom: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;` );
      } else {
        this.style( `position: fixed; bottom: 0; width: ${Content.SIDEBAR_WIDTH}px;` );
      }
    } else {
      this.style( this.css );
    }
  }

  up( sidebarBottom:Number, windowBottom:Number, sidebarTop:Number, y:Number ):void {
    if ( sidebarBottom < windowBottom ) {
      this.style( `position: absolute; bottom: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;` );
    } else if ( sidebarTop <= y ) {
      this.style( `position: fixed; top: 0; width: ${Content.SIDEBAR_WIDTH}px;` );
    } else {
      this.style( this.css );
    }
  }


  /**
   * scroll down 計算
   * @param {Number} y scroll top 位置
   */
  scrollDown( y:Number ):void {
    let sidebar = this.sidebar;

    let windowHeight = window.innerHeight;
    let windowBottom = y + windowHeight;

    let rect = Offset.offset( sidebar );
    let sidebarHeight = parseInt(rect.height, 10);

    let offset = this.offset();
    let sidebarBottom = offset + sidebarHeight;
    let css = this.css;
    let fixed = this.fixed;

    // scroll top が offset (header + nav + side-sec: padding-top) より大きかったら
    // sidebar bottom( offset + sidebar height ) が window bottom(scroll top + window height)より小さくなったら
    if ( y > offset && sidebarBottom < windowBottom ) {
      css = `position: fixed; bottom: 0; width: ${Content.SIDEBAR_WIDTH}px;`;
      fixed.bottom = true;

      let wholeRect = Offset.offset( this.whole );
      let wholeHeight = parseInt( wholeRect.height, 10 );

      let footerRect = Offset.offset( this.footer );
      let footerHeight = parseInt( footerRect.height, 10 );

      let limitBottom = wholeHeight - footerHeight - this.padding;

      if ( windowBottom > limitBottom ) {
        css = `position: absolute; bottom: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;`;
        fixed.bottom = false;
      }
    }

    // sidebar.style.cssText = css;
    this.style( css );
  }

  /**
   * scroll up 計算
   * @param {Number} y scroll top 位置
   */
  scrollUp( y:Number ):void {
    let sidebar = this.sidebar;
    let offset = this.offset();

    let windowHeight = window.innerHeight;
    let windowBottom = y + windowHeight;

    let wholeRect = Offset.offset( this.whole );
    let wholeHeight = parseInt( wholeRect.height, 10 );

    let rect = Offset.offset( sidebar );
    let sidebarHeight = parseInt(rect.height, 10);
    let sidebarTop = windowBottom - sidebarHeight;
    let sidebarBottom = offset + sidebarHeight;

    let footerRect = Offset.offset( this.footer );
    let footerHeight = parseInt( footerRect.height, 10 );

    // let sidebarTop = windowBottom - sidebarHeight - 30;
    // console.log( 'sidebarTop', rect, sidebarTop );


    // let range = offset + sidebarHeight;
    let range = sidebarTop;

    let css = `position: absolute; bottom: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;`;
    let fixedTop = `position: fixed; top: 0; width: ${Content.SIDEBAR_WIDTH}px;`;
    let fixed = this.fixed;

    if ( y > offset && sidebarBottom < windowBottom ) {

      let limitBottom = wholeHeight - footerHeight - this.padding;

      if ( windowBottom > limitBottom ) {
        css = `position: absolute; bottom: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;`;
        this.style( css );
        fixed.bottom = false;
        fixed.top = false;
      }
    } else if ( y <= range ) {

      if ( fixed.bottom ) {
        this.style( fixedTop );
        fixed.bottom = false;
        fixed.top = true;
      } else /*if ( current !== this.css ) { */{
        this.style( this.css );
        fixed.bottom = false;
        fixed.top = false;
      }

    } else
    if ( y <= wholeHeight - ( sidebarHeight + footerHeight + this.padding ) ) {
      css = fixedTop;
      fixed.bottom = false;
      fixed.top = true;

      if ( y <= offset ) {
        css = `position: absolute; top: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;`;
        fixed.top = false;
      }

      // if ( y > range ) {
      //   css = `position: absolute; bottom: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;`;
      // }

      this.style( css );
    } else {
      this.style( css );
      fixed.bottom = false;
      fixed.top = false;
    }

    // sidebar.style.cssText = css;
  }
}
