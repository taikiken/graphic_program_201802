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
'use strict';

import {Dom} from '../dom/Dom';

let _symbol = Symbol();

// UT
let UT = self.UT;

/**
 * <h3>header user information / signup</h3>
 * 全て static です
 */
export class SearchFrom {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `Search is static Class. not use new Search().` );

    }
  }
  /**
   * search form rendering 開始
   */
  static start():void {
    // header.user
    var searchFrom = new UT.view.header.ViewHeaderSearch( Dom.search() );
    searchFrom.start();
  }
}