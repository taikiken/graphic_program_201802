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
  /**
   * 検索ページ rendering 開始
   * @param {string} keyword 検索キーワード
   */
  static start( keyword:string ):void {

    // header
    Header.start();

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
    Sidebar.start();

  }
  ///**
  // * event handler unbind
  // */
  //static dispose():void {
  //  let search = _search;
  //  search.off( UT.view.View.BEFORE_RENDER, Search.onBefore );
  //  search.off( UT.view.View.UNDEFINED_ERROR, Search.onError );
  //  search.off( UT.view.View.EMPTY_ERROR, Search.onError );
  //  search.off( UT.view.View.RESPONSE_ERROR, Search.onError );
  //}
  ///**
  // * View.BEFORE_RENDER event handler
  // * @param {Object} event event object, category.slug を取り出します
  // */
  //static onBefore( event ):void {
  //  Search.dispose();
  //
  //  let articles = event.args[ 0 ];
  //  let article = articles[ 0 ];
  //  Search.sidebar( article.category.slug );
  //}
  ///**
  // * View error handler
  // */
  //static onError():void {
  //
  //  Search.dispose();
  //  Search.sidebar();
  //
  //}
  ///**
  // * sidebar slug 指定し rendering
  // * @param {string} slug category slug
  // */
  //static sidebar( slug:string = 'all' ):void {
  //  // sidebar
  //  Sidebar.start( slug );
  //}
}
