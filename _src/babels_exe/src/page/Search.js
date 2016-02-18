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

import {Header} from './Header';
import {Sidebar} from './Sidebar';
import {Dom} from '../dom/Dom';

let _symbol = Symbol();
let _search = null;

// UT
let UT = self.UT;

export class Search {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `Category is static Class. not use new Category().` );

    }
  }
  static start( keyword:string ):void {

    // header
    Header.start();

    // list
    let search = new UT.view.ViewSearch( keyword, Dom.board(), Dom.boardMore() );
    _search = search;
    search.on( UT.view.View.BEFORE_RENDER, Search.onBefore );
    search.on( UT.view.View.UNDEFINED_ERROR, Search.onError );
    search.on( UT.view.View.EMPTY_ERROR, Search.onError );
    search.on( UT.view.View.RESPONSE_ERROR, Search.onError );
    search.start();

  }
  static dispose():void {

    let search = _search;
    search.off( UT.view.View.BEFORE_RENDER, Search.onBefore );
    search.off( UT.view.View.UNDEFINED_ERROR, Search.onError );
    search.off( UT.view.View.EMPTY_ERROR, Search.onError );
    search.off( UT.view.View.RESPONSE_ERROR, Search.onError );

  }
  static onBefore( event ):void {

    Search.dispose();

    let articles = event.args[ 0 ];
    let article = articles[ 0 ];
    Search.sidebar( article.category.slug );

  }
  static onError():void {

    Search.dispose();
    Search.sidebar();

  }
  static sidebar( slug:string = 'all' ):void {
    // sidebar
    Sidebar.start( slug );
  }
}
