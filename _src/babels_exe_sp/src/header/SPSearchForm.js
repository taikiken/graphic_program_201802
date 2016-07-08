/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 15:22
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


let _symbol = Symbol();

// UT
let UT = self.UT;
let Dom = UT.app.Dom;

/**
 * <p>header user information / signup</p>
 * 全て static です
 */
export class SPSearchForm {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( 'SPSearchForm is static Class. not use new SPSearchForm().' );

    }
  }
  /**
   * search form rendering 開始
   */
  static start():void {
    // header.user
    let searchElement = Dom.search();
    let opener = Dom.searchOpener();
    if ( searchElement !== null && opener !== null ) {
      let searchFrom = new UT.sp.view.header.SPViewHeaderSearch( searchElement, opener );
      searchFrom.start();
    }

  }
}
