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
'use strict';

import {SPHeader} from './SPHeader';
import {Dom} from '../dom/Dom';

let _symbol = Symbol();

// UT
let UT = self.UT;

/**
 * <h3>category 一覧</h3>
 * 全て static です
 */
export class SPCategory {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `SPCategory is static Class. not use new SPCategory().` );

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

    let element = Dom.category();

    if ( element !== null ) {

      // list
      let archive = new UT.sp.view.category.SPViewCategoryRoot( slug, element );
      archive.start();

    }


  }

}
