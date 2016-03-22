/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/15 - 21:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Header} from './Header';
import {Sidebar} from './Sidebar';
let _symbol = Symbol();

// UT
let UT = self.UT;
let Dom = UT.app.Dom;

/**
 * <h3>Home(index)</h3>
 * 全て static です
 */
export class Index {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `Index is static Class. not use new Index().` );

    }
  }
  /**
   * home rendering 開始
   */
  static start():void {

    // header
    Header.start();

    // ---------------------------------------------------------
    // pickup
    let pickupElement = Dom.pickup();
    if ( pickupElement !== null ) {
      let pickup = new UT.view.home.ViewPickup( pickupElement );
      pickup.start();
    }

    // ---------------------------------------------------------
    // headline
    let headlineElement = Dom.headline();
    if ( headlineElement !== null ) {
      let headline = new UT.view.home.ViewHeadline( headlineElement );
      headline.start();
    }

    // ---------------------------------------------------------
    // news
    let boardElement = Dom.board();
    let moreElement = Dom.boardMore();
    if ( boardElement !== null && moreElement !== null ) {
      let archive = new UT.view.home.ViewNews( boardElement, moreElement );
      archive.start();
    }

    // sidebar, slug なし(=all)
    Sidebar.start();

  }
}
