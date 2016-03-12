/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/29 - 23:08
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

let Sagen = self.Sagen;

/**
 * メインメニューにかテゴリースラッグを追加
 */
export class SPNav {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `SPNav is static Class. not use new SPNav().` );

    }
  }
  /**
   * global menu へ slug を css class として挿入
   * @param {string} slug category slug
   */
  static start( slug:string = 'all' ):void {
    let nav = Dom.nav();
    if ( nav !== null && slug !== null && typeof slug !== 'undefined' ) {
      Sagen.Dom.addClass( nav, slug );
    }
  }
}
