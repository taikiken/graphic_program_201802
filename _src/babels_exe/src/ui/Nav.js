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


let _symbol = Symbol();

// UT
let UT = self.UT;
let Dom = UT.app.Dom;

let Sagen = self.Sagen;

/**
 * メインメニューにかテゴリースラッグを追加
 */
export class Nav {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( 'Nav is static Class. not use new Nav().' );

    }
  }
  /**
   * global menu へ slug を css class として挿入
   * @param {string} slug category slug
   */
  static start( slug:string = 'all' ):void {
    let target = Dom.get( slug );
    if ( target !== null ) {
      Sagen.Dom.addClass( target, 'current' );
    }
  }
}
