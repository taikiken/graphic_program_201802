/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 15:42
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {SPHeader} from './SPHeader';
import {SPSidebar} from './SPSidebar';
import {Dom} from '../dom/Dom';

let _symbol = Symbol();

// UT
let UT = self.UT;

export class SPSearch {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `SPSearch is static Class. not use new SPSearch().` );

    }
  }
  /**
   * 検索ページ rendering 開始
   * @param {string} keyword 検索キーワード
   */
  static start( keyword:string ):void {

    // header
    SPHeader.start();

    // list
    // 検索キーワードで page 取得
    // 結果セットを使い sidebar を rendering
    let boardElement = Dom.board();
    let moreElement = Dom.boardMore();
    if ( boardElement !== null && moreElement !== null ) {
      let search = new UT.view.ViewSearch( keyword, boardElement, moreElement );
      search.start();
    }

    // 検索結果が同じカテゴリーとは限らないので all で表示します
    SPSidebar.start();

  }
}