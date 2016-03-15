/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/29 - 15:46
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
 * ブックマーク一覧
 */
export class SPBookmarks {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `SPBookmarks is static Class. not use new SPBookmarks().` );

    }
  }
  /**
   * rendering 開始
   */
  static start():void {
    let element = Dom.board();
    let elementMore = Dom.boardMore();
    if ( element !== null && elementMore !== null ) {
      // list
      let archive = new UT.sp.view.mypage.SPViewBookmarks( element, elementMore );
      archive.start();
    }
  }
}
