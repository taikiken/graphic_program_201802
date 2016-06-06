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
// import {Offset} from '../../util/Offset';

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
    // animationFrame id, cancel 時に使用します
    let id:Number = 0;
    // .side-sec
    let parent = sidebar.parentNode;
    // .whole
    let whole:Node = footer.parentNode;
    let boundUpdate = this.update.bind( this );
    let padding:Number = 30;
    let css:String = `position: absolute; top: ${padding}px; width: ${Content.SIDEBAR_WIDTH}px;`;
    let sticky = {
      top: true,
      bottom: false
    };
    let wholeHeight:Number = -1;

    Object.assign( this, { sidebar, footer, offsets, previous, parent, whole, id, boundUpdate, padding, css, sticky, wholeHeight } );
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
  /**
   * element height を計算します
   * @param {Element} element 計算対象 Element
   * @return {Number} element height を返します
   */
  height( element:Element ):Number {
    return parseInt( Dom.getStyle( element, 'height' ), 10 );
  }
  /**
   * 開始<br>
   * instance 作成後に必ず実行します
   */
  start():void {
    // let scroll = Scroll.factory();
    // scroll.on( Scroll.SCROLL, this.scroll.bind( this ) );
    // scroll.start();

    // set default style
    this.style( this.css );
    this.update();
    window.addEventListener( 'resize', this.resize.bind(this), false );
  }
  /**
   * 監視をやめます
   */
  stop():void {
    cancelAnimationFrame(this.id);
  }
  /**
   * loop 関数<br>
   * start 実行後常時監視します
   */
  update():void {
    /**
     * requestAnimationFrame id<br>
     * cancel 時に使用します
     *
     *    cancelAnimationFrame(this.id);
     *
     * @type {Number}
     */
    this.id = requestAnimationFrame(this.boundUpdate);
    this.scroll( {y: Scroll.y} );
    this.resizeWhole();
  }
  /**
   * window.onresize event handler<br>
   * window resize 時に resize option を true にし scroll チェックルーチーンを call します
   */
  resize():void {
    this.scroll( {y: Scroll.y, resize: true} );
  }
  /**
   * whole element の resize を監視し height 変更時に resize option を true にし scroll チェックルーチーンを call します
   */
  resizeWhole():void {
    let whole = this.whole;
    let previousHeight = this.wholeHeight;
    let wholeHeight = this.height( whole );

    // 初期値を skip します
    if ( previousHeight > 0 && previousHeight !== wholeHeight ) {
      this.scroll( {y: Scroll.y, resize: true} );
    }
    /**
     * .whole の高さ
     * @type {Number}
     */
    this.wholeHeight = wholeHeight;
  }
  /**
   * 現在の scroll top 位置を元に追随計算します<br>
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

      if ( down || up ) {
        // scroll top 変更時に kick します
        this.position( down, y, sidebarHeight, wholeHeight );
      } else if ( typeof event.resize !== 'undefined' && event.resize ) {
        // resize option true の時に kick します
        this.position( true, y, sidebarHeight, wholeHeight );
      }

    } else {
      // default style 設定
      this.style( this.css );
    }
    /**
     * スクロール位置
     * @type {Number}
     */
    this.previous = y;
    
  }
  /**
   * 保存されている offset 計算対象 element の高さの合計を計算します<br>
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
  /**
   * sticky flag を全て false にします
   */
  stickyFree():void {
    let sticky:Object = this.sticky;
    sticky.top = false;
    sticky.bottom = false;
  }
  /**
   * sidebar position を制御します
   * @param {Boolean} direction up / down 方向 true: down (scroll down)
   * @param {Number} y scroll top 位置
   * @param {Number} sidebarHeight sidebar container height
   * @param {Number} wholeHeight .whole container height
   */
  position( direction:Boolean, y:Number, sidebarHeight:Number, wholeHeight:Number ):void {
    // let sidebar = this.sidebar;

    let windowHeight:Number = parseInt( window.innerHeight, 10 );
    let windowBottom:Number = y + windowHeight;

    let offset:Number = this.offset();
    let footerHeight:Number = this.height( this.footer );

    // let sidebarHeight = this.height( sidebar );
    let sidebarTop:Number = wholeHeight - (footerHeight + sidebarHeight + this.padding);
    let sidebarBottom:Number = offset + sidebarHeight;

    // let wholeHeight = this.height( this.whole );
    let limitBottom:Number = wholeHeight - footerHeight - this.padding;

    // 可動域
    if ( y <= offset ) {
      //  scroll 位置が上部
      this.style( `position: absolute; top: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;` );
      this.stickyFree();
      this.sticky.top = true;
    } else if ( windowBottom > limitBottom ) {
      this.style( `position: absolute; bottom: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;` );
      this.stickyFree();
      this.sticky.bottom = true;
    } else {
      if ( direction ) {
        // scroll down
        this.down( sidebarBottom, windowBottom, limitBottom );
      } else {
        // scroll up
        this.up( sidebarBottom, windowBottom, sidebarTop, y );
      }
    }
  }

  /**
   * scroll down 時の position 制御
   * @param {Number} sidebarBottom scroll top + sidebar  height + offset height(include padding)
   * @param {Number} windowBottom scroll top + window innerHeight
   * @param {Number} limitBottom window bottom が超えたら position absolute; bottom: 0 にする break point
   */
  down( sidebarBottom:Number, windowBottom:Number, limitBottom:Number ):void {
    if ( sidebarBottom < windowBottom ) {
      if ( windowBottom > limitBottom ) {
        this.style( `position: absolute; bottom: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;` );
        this.stickyFree();
        this.sticky.bottom = true;
      } else {
        this.style( `position: fixed; bottom: 0; width: ${Content.SIDEBAR_WIDTH}px;` );
        this.stickyFree();
        this.sticky.bottom = true;
      }
    } else {
      this.style( this.css );
      this.stickyFree();
      this.sticky.top = true;
    }
  }
  /**
   * scroll up 時の position 制御
   * @param {Number} sidebarBottom scroll top + sidebar  height + offset height(include padding)
   * @param {Number} windowBottom scroll top + window innerHeight
   * @param {Number} sidebarTop sidebar の top 位置
   * @param {Number} y scroll top
   */
  up( sidebarBottom:Number, windowBottom:Number, sidebarTop:Number, y:Number ):void {
    let position:String = Dom.getStyle(this.sidebar, 'position');
    if ( sidebarTop >= y ) {
      // sidebar top が scroll top より大きい
      if ( sidebarBottom < windowBottom ) {
        // sidebar bottom が window bottom より小さい
        // -- window top
        // === sidebar top
        // === sidebar bottom
        // -- window bottom
        if ( position !== 'fixed' ) {
          this.style( `position: fixed; top: 0; width: ${Content.SIDEBAR_WIDTH}px;` );
          // this.style( `position: absolute; top: 0; width: ${Content.SIDEBAR_WIDTH}px;` );
          this.stickyFree();
          this.sticky.top = true;
        }
      }
    } else if ( sidebarBottom < windowBottom ) {
      // this.style( `position: fixed; bottom: 0; width: ${Content.SIDEBAR_WIDTH}px;` );
      if ( position !== 'fixed' ) {
        this.style( `position: absolute; bottom: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;` );
        this.stickyFree();
        this.sticky.bottom = true;
      }
    } else {
      if ( position !== 'fixed' || !this.sticky.bottom ) {
        this.style( this.css );
        this.stickyFree();
        this.sticky.top = true;
      }
    }
  }

  //
  // /**
  //  * scroll down 計算
  //  * @param {Number} y scroll top 位置
  //  */
  // scrollDown( y:Number ):void {
  //   let sidebar = this.sidebar;
  //
  //   let windowHeight = window.innerHeight;
  //   let windowBottom = y + windowHeight;
  //
  //   let rect = Offset.offset( sidebar );
  //   let sidebarHeight = parseInt(rect.height, 10);
  //
  //   let offset = this.offset();
  //   let sidebarBottom = offset + sidebarHeight;
  //   let css = this.css;
  //   let fixed = this.fixed;
  //
  //   // scroll top が offset (header + nav + side-sec: padding-top) より大きかったら
  //   // sidebar bottom( offset + sidebar height ) が window bottom(scroll top + window height)より小さくなったら
  //   if ( y > offset && sidebarBottom < windowBottom ) {
  //     css = `position: fixed; bottom: 0; width: ${Content.SIDEBAR_WIDTH}px;`;
  //     fixed.bottom = true;
  //
  //     let wholeRect = Offset.offset( this.whole );
  //     let wholeHeight = parseInt( wholeRect.height, 10 );
  //
  //     let footerRect = Offset.offset( this.footer );
  //     let footerHeight = parseInt( footerRect.height, 10 );
  //
  //     let limitBottom = wholeHeight - footerHeight - this.padding;
  //
  //     if ( windowBottom > limitBottom ) {
  //       css = `position: absolute; bottom: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;`;
  //       fixed.bottom = false;
  //     }
  //   }
  //
  //   // sidebar.style.cssText = css;
  //   this.style( css );
  // }
  //
  // /**
  //  * scroll up 計算
  //  * @param {Number} y scroll top 位置
  //  */
  // scrollUp( y:Number ):void {
  //   let sidebar = this.sidebar;
  //   let offset = this.offset();
  //
  //   let windowHeight = window.innerHeight;
  //   let windowBottom = y + windowHeight;
  //
  //   let wholeRect = Offset.offset( this.whole );
  //   let wholeHeight = parseInt( wholeRect.height, 10 );
  //
  //   let rect = Offset.offset( sidebar );
  //   let sidebarHeight = parseInt(rect.height, 10);
  //   let sidebarTop = windowBottom - sidebarHeight;
  //   let sidebarBottom = offset + sidebarHeight;
  //
  //   let footerRect = Offset.offset( this.footer );
  //   let footerHeight = parseInt( footerRect.height, 10 );
  //
  //   // let sidebarTop = windowBottom - sidebarHeight - 30;
  //   // console.log( 'sidebarTop', rect, sidebarTop );
  //
  //
  //   // let range = offset + sidebarHeight;
  //   let range = sidebarTop;
  //
  //   let css = `position: absolute; bottom: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;`;
  //   let fixedTop = `position: fixed; top: 0; width: ${Content.SIDEBAR_WIDTH}px;`;
  //   let fixed = this.fixed;
  //
  //   if ( y > offset && sidebarBottom < windowBottom ) {
  //
  //     let limitBottom = wholeHeight - footerHeight - this.padding;
  //
  //     if ( windowBottom > limitBottom ) {
  //       css = `position: absolute; bottom: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;`;
  //       this.style( css );
  //       fixed.bottom = false;
  //       fixed.top = false;
  //     }
  //   } else if ( y <= range ) {
  //
  //     if ( fixed.bottom ) {
  //       this.style( fixedTop );
  //       fixed.bottom = false;
  //       fixed.top = true;
  //     } else /*if ( current !== this.css ) { */{
  //       this.style( this.css );
  //       fixed.bottom = false;
  //       fixed.top = false;
  //     }
  //
  //   } else
  //   if ( y <= wholeHeight - ( sidebarHeight + footerHeight + this.padding ) ) {
  //     css = fixedTop;
  //     fixed.bottom = false;
  //     fixed.top = true;
  //
  //     if ( y <= offset ) {
  //       css = `position: absolute; top: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;`;
  //       fixed.top = false;
  //     }
  //
  //     // if ( y > range ) {
  //     //   css = `position: absolute; bottom: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;`;
  //     // }
  //
  //     this.style( css );
  //   } else {
  //     this.style( css );
  //     fixed.bottom = false;
  //     fixed.top = false;
  //   }
  //
  //   // sidebar.style.cssText = css;
  // }
}
