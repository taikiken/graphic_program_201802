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

/**
 * [library] - Sagen
 */
const Sagen = self.Sagen;
/**
 * [library] - Sagen.Dom
 */
const Dom = Sagen.Dom;

/**
 * sidebar をスクロール追随させます
 */
export default class Sidebar {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * element height を計算します
   * @param {Element} element 計算対象 Element
   * @return {number} element height を返します
   */
  static height(element) {
    return parseInt(Dom.getStyle(element, 'height'), 10);
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * sidebar をスクロール追随させます
   * @param {Element} sidebar #sidebar-moving-container
   * @param {Element} footer #footer-container
   */
  constructor(sidebar, footer) {
    // const offsets:Array = [];
    // const previous:number = 0;
    // // animationFrame id, cancel 時に使用します
    // const id:number = 0;
    // // .side-sec
    // const parent = sidebar.parentNode;
    // // .whole
    // const whole:Node = footer.parentNode;
    // const boundUpdate = this.update.bind( this );
    const padding = 30;
    const css = `position: absolute; top: ${padding}px; width: ${Content.SIDEBAR_WIDTH}px;`;
    // const sticky = {
    //   top: true,
    //   bottom: false
    // };
    // const wholeHeight:number = -1;

    /**
     * requestAnimationFrame id<br>
     * cancel 時に使用します
     *
     *    this.id = requestAnimationFrame( METHOD );
     *    cancelAnimationFrame(this.id);
     *
     * @type {number}
     */
    this.id = 0;

    // Object.assign( this, { sidebar, footer, offsets, previous, parent, whole, id, boundUpdate, padding, css, sticky, wholeHeight } );
    /**
     * `#sidebar-moving-container`
     * @type {Element}
     */
    this.sidebar = sidebar;
    /**
     * `#footer-container`
     * @type {Element}
     */
    this.footer = footer;
    /**
     * 高さを計算する対象 `Element` list
     * @type {Array.<Element>}
     */
    this.offsets = [];
    /**
     * スクロール位置 - 前回値
     * @type {number}
     */
    this.previous = 0;
    /**
     * `#sidebar-moving-container` parentNode
     * @type {Node}
     */
    this.parent = sidebar.parentNode;
    /**
     * `#footer-container` parentNode
     * @type {Node}
     */
    this.whole = footer.parentNode;
    /**
     * bound update
     * @type {function}
     */
    this.boundUpdate = this.update.bind(this);
    /**
     * padding value
     * @type {number}
     * @default 30
     */
    this.padding = padding;
    /**
     * css style text - `position: absolute; top: ${padding}px; width: ${Content.SIDEBAR_WIDTH}px;`
     * @type {string}
     */
    this.css = css;
    /**
     * sticky state
     * @type {{top: boolean, bottom: boolean}}
     */
    this.sticky = {
      top: true,
      bottom: false,
    };
    /**
     * .whole の高さ
     * @type {number}
     * @default -1
     */
    this.wholeHeight = -1;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * offset 計算対象 element を追加します
   * @param {Element} element offset 計算させる element, header, nav...
   */
  addOffset(element) {
    this.offsets.push(element);
  }
  /**
   * sidebar へ style を設定します
   * @param {String} css 設定する css text
   */
  style(css) {
    this.sidebar.style.cssText = css;
  }
  // /**
  //  * element height を計算します
  //  * @param {Element} element 計算対象 Element
  //  * @return {number} element height を返します
  //  */
  // height( element:Element ):number {
  //   return parseInt( Dom.getStyle( element, 'height' ), 10 );
  // }
  /**
   * 開始<br>
   * instance 作成後に必ず実行します
   */
  start() {
    // let scroll = Scroll.factory();
    // scroll.on( Scroll.SCROLL, this.scroll.bind( this ) );
    // scroll.start();

    // set default style
    this.style(this.css);
    this.update();
    window.addEventListener('resize', this.resize.bind(this), false);
  }
  /**
   * 監視をやめます
   */
  stop() {
    cancelAnimationFrame(this.id);
  }
  /**
   * loop 関数<br>
   * start 実行後常時監視します
   */
  update() {
    this.id = requestAnimationFrame(this.boundUpdate);
    this.scroll({ y: Scroll.y });
    this.resizeWhole();
  }
  /**
   * window.onresize event handler<br>
   * window resize 時に resize option を true にし scroll チェックルーチーンを call します
   */
  resize() {
    this.scroll({ y: Scroll.y, resize: true });
  }
  /**
   * whole element の resize を監視し height 変更時に resize option を true にし scroll チェックルーチーンを call します
   */
  resizeWhole() {
    const whole = this.whole;
    const previousHeight = this.wholeHeight;
    const wholeHeight = Sidebar.height(whole);

    // 初期値を skip します
    if (previousHeight > 0 && previousHeight !== wholeHeight) {
      this.scroll({ y: Scroll.y, resize: true });
    }
    this.wholeHeight = wholeHeight;
  }
  /**
   * 現在の scroll top 位置を元に追随計算します<br>
   * update から call されます
   * @param {{y: number, resize: *}} event scroll top が含まれた Object
   */
  scroll(event) {
    const y:number = event.y;
    const sidebarHeight = Sidebar.height(this.sidebar);
    const wholeHeight = Sidebar.height(this.whole);

    if (wholeHeight > sidebarHeight) {
      // whole が sidebar より高い時のみ
      const down = this.previous < y;
      const up = this.previous > y;

      if (down || up) {
        // scroll top 変更時に kick します
        this.position(down, y, sidebarHeight, wholeHeight);
      } else if (typeof event.resize !== 'undefined' && event.resize ) {
        // resize option true の時に kick します
        this.position( true, y, sidebarHeight, wholeHeight );
      }
    } else {
      // default style 設定
      this.style(this.css);
    }
    this.previous = y;
  }
  /**
   * 保存されている offset 計算対象 element の高さの合計を計算します<br>
   * .side-sec の padding-top も含みます
   * @return {number} 保存されている offset 計算対象 element の高さの合計を計算し返します
   */
  offset() {
    const elements = this.offsets;
    let offset = 0;
    // for (var element of elements) {
    //   offset += parseInt( Dom.getStyle( element, 'height' ), 10 );
    // }
    elements.map(element => (offset += parseInt(Dom.getStyle(element, 'height'), 10)));
    offset += parseInt(Dom.getStyle(this.parent, 'padding-top'), 10);
    return offset;
  }
  /**
   * sticky flag を全て false にします
   */
  stickyFree():void {
    const sticky:Object = this.sticky;
    sticky.top = false;
    sticky.bottom = false;
  }
  /**
   * sidebar position を制御します
   * @param {boolean} direction up / down 方向 true: down (scroll down)
   * @param {number} y scroll top 位置
   * @param {number} sidebarHeight sidebar container height
   * @param {number} wholeHeight .whole container height
   */
  position(direction, y, sidebarHeight, wholeHeight) {
    // let sidebar = this.sidebar;
    const windowHeight = parseInt(window.innerHeight, 10);
    const windowBottom = y + windowHeight;

    const offset = this.offset();
    const footerHeight = Sidebar.height(this.footer);

    // let sidebarHeight = Sidebar.height( sidebar );
    const sidebarTop:number = wholeHeight - (footerHeight + sidebarHeight + this.padding);
    const sidebarBottom:number = offset + sidebarHeight;

    // let wholeHeight = Sidebar.height( this.whole );
    const limitBottom:number = wholeHeight - footerHeight - this.padding;

    // 可動域
    if (y <= offset) {
      //  scroll 位置が上部
      this.style(`position: absolute; top: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;`);
      this.stickyFree();
      this.sticky.top = true;
    } else if (windowBottom > limitBottom) {
      this.style(`position: absolute; bottom: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;`);
      this.stickyFree();
      this.sticky.bottom = true;
    } else if (direction) {
      // scroll down
      this.down(sidebarBottom, windowBottom, limitBottom);
    } else {
      // scroll up
      this.up(sidebarBottom, windowBottom, sidebarTop, y);
    }
  }

  /**
   * scroll down 時の position 制御
   * @param {number} sidebarBottom scroll top + sidebar  height + offset height(include padding)
   * @param {number} windowBottom scroll top + window innerHeight
   * @param {number} limitBottom window bottom が超えたら position absolute; bottom: 0 にする break point
   */
  down(sidebarBottom, windowBottom, limitBottom) {
    if (sidebarBottom < windowBottom) {
      if (windowBottom > limitBottom) {
        this.style(`position: absolute; bottom: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;`);
        this.stickyFree();
        this.sticky.bottom = true;
      } else {
        this.style(`position: fixed; bottom: 0; width: ${Content.SIDEBAR_WIDTH}px;`);
        this.stickyFree();
        this.sticky.bottom = true;
      }
    } else {
      this.style(this.css);
      this.stickyFree();
      this.sticky.top = true;
    }
  }
  /**
   * scroll up 時の position 制御
   * @param {number} sidebarBottom scroll top + sidebar  height + offset height(include padding)
   * @param {number} windowBottom scroll top + window innerHeight
   * @param {number} sidebarTop sidebar の top 位置
   * @param {number} y scroll top
   */
  up(sidebarBottom, windowBottom, sidebarTop, y) {
    const position:String = Dom.getStyle(this.sidebar, 'position');
    if (sidebarTop >= y) {
      // sidebar top が scroll top より大きい
      if (sidebarBottom < windowBottom) {
        // sidebar bottom が window bottom より小さい
        // -- window top
        // === sidebar top
        // === sidebar bottom
        // -- window bottom
        if (position !== 'fixed') {
          this.style( `position: fixed; top: 0; width: ${Content.SIDEBAR_WIDTH}px;` );
          // this.style( `position: absolute; top: 0; width: ${Content.SIDEBAR_WIDTH}px;` );
          this.stickyFree();
          this.sticky.top = true;
        }
      }
    } else if (sidebarBottom < windowBottom) {
      // this.style( `position: fixed; bottom: 0; width: ${Content.SIDEBAR_WIDTH}px;` );
      if (position !== 'fixed') {
        this.style(`position: absolute; bottom: ${this.padding}px; width: ${Content.SIDEBAR_WIDTH}px;`);
        this.stickyFree();
        this.sticky.bottom = true;
      }
    } else if (position !== 'fixed' || !this.sticky.bottom) {
      this.style( this.css );
      this.stickyFree();
      this.sticky.top = true;
    }
  }
}
