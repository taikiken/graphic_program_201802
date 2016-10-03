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

import {SPHeader} from './SPHeader';
let _symbol = Symbol();

// UT
let UT = self.UT;
let Dom = UT.app.Dom;

/**
 * <p>category 一覧</p>
 * 全て static です
 */
export class SPCategory {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( 'SPCategory is static Class. not use new SPCategory().' );

    }
  }
  /**
   * rendering 開始
   * @param {string} slug category slug
   * @param {string} [type=''] ranking | video \ '' の 3つ
   */
  static start( slug:string, type:string = '' ):void {
    // header
    SPHeader.start();

    const element = Dom.category();
    // @since 2016-09-20
    const button = Dom.boardMore();

    if ( element !== null && button !== null ) {
      // list
      // let archive = new UT.sp.view.category.SPViewCategoryRoot( slug, element );
      // @since 2016-09-20
      let archive = new UT.sp.view.category.SPViewCategoryWithSlug(slug, element, button);
      archive.start();
    }
  }

}
