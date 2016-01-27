/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/27 - 18:48
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

let _symbol = Symbol();

/**
 * <h3>cookie を取得します</h3>
 * 全て static です
 */
export class Cookie {
  /**
   * <p>取得機能だけを実装しました</p>
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( `Cookie is static Class. not use new Cookie().` );

    }

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {string} cookie key name を返します
   */
  static get TARGET():string {
    return 'COOKIE_NAME';
  }
  /**
   * cookie value を取得します
   * @param {string} keyName cookie key name
   * @return {string|null} cookie 値を返します、取得できない時は null を返します
   */
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  static item( keyName:string ):string {
    return decodeURIComponent( document.cookie.replace( new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent( keyName ).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1') ) || null;
  }
}
