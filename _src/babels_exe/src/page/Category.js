/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/15 - 21:49
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/* eslint no-unused-vars: [0, {"args": "after-used"}] */

import {Header} from './Header';
import {Sidebar} from './Sidebar';
// let _symbol = Symbol();

// UT
const UT = self.UT;
const Dom = UT.app.Dom;

/**
 * <p>category 一覧</p>
 * 全て static です
 */
export class Category {
  // /**
  //  * static class です, instance を作成しません
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'Category is static Class. not use new Category().' );
  //
  //   }
  // }
  /**
   * rendering 開始
   * @param {string} slug category slug
   * @param {string} [type=''] ranking | video \ '' の 3つ
   * @since 2017-09-04
   */
  static start(slug, type = '' ) {
    // header
    Header.start();

    let element = Dom.board();
    let elementMore = Dom.boardMore();

    if ( element !== null && elementMore !== null ) {
      // list
      let archive = new UT.view.ViewCategory( slug, element, elementMore );
      archive.start();
      // sidebar
      Sidebar.start( slug );
      // title
      // console.log( 'type', slug, type );
    }
  }
  /**
   * 地域別記事 - category 一覧
   * @param {string} slug `area` 固定
   * @param {string} area 地域名称
   * @param {boolean} pref 都道府県フラッグ true: 都道府県
   * @since 2017-09-04
   */
  static area(slug, area, pref) {
    // header
    Header.start();

    const element = Dom.board();
    const elementMore = Dom.boardMore();

    if (element !== null && elementMore !== null) {
      // list
      const archive = new UT.view.ViewArea(element, elementMore, area, pref);
      archive.start();
      // sidebar
      Sidebar.start(slug);
      // title
      // console.log( 'type', slug, type );
    }
  }
}
