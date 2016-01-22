/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/13 - 21:40
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

'use strict';

// window.location に関する Utility

/**
 * location に関する utility
 */
export class Loc {
  /**
   * search を調べたい時に instance を作成します
   */
  constructor() {

    this._search = null;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {string} location.hrefを返します
   */
  static get current():string {

    return self.location.href;

  }
  /**
   *
   * @return {string} location.pathname(urlからprotocol+hostを除く)を返します
   */
  static get path():string {

    return self.location.pathname;

  }
  /**
   *
   * @return {string} location.hashを返します
   */
  static get hash():string {

    return self.location.hash;

  }
  /**
   * url の query 文字列
   * @return {string} url ? 以降の query 文字列を返します, a=xxx&b=yyy
   */
  static get search():string {

    return self.location.search.substring( 1 );

  }

  /**
   *
   * @return {string} host name + port number を返します
   */
  static get host():string {
    // host + port number
    return self.location.host;
  }

  /**
   *
   * @return {string} host name だけを返します
   */
  static get hostname():string {
    // host only
    return self.location.hostname;
  }

  /**
   *
   * @return {string} port number を返します
   */
  static get port():string {
    // port number
    return self.location.port;
  }
  // ---------------------------------------------------
  //  METHOD instance
  // ---------------------------------------------------
  /**
   *
   * @param {string} [search=''] key: value にしたい search型 文字列
   * @return {Loc} instance を返します
   */
  parse( search:string = '' ):Object {

    this._search = Loc.parse( search );
    return this;

  }

  /**
   * search value を keyから探します
   * @param {string} key search name
   * @return {*} string|undefined|null で結果を返します
   */
  find( key:string ):Object {

    let search = this._search;
    if ( search === null ) {
      return null;
    }

    return search[ key ];

  }
  // ---------------------------------------------------
  //  METHOD static
  // ---------------------------------------------------
  /**
   * hash(#example)から`#`をとります
   * @param {string} hash hash文字列
   * @return {string} hash文字列から#を削除した文字列を返します
   */
  static hashStrip( hash:string = Loc.hash ):string {

    return hash.replace( /^[#\/]|\s+$/g, '' );

  }
  /**
   * pathnameを/で分解します
   * @param {string} [pathname=Loc.pathname] location.pathname, hostなしのpath
   * @return {Array} pathnameを/で分解し配列にし返します
   */
  static resolve( pathname:string = Loc.path ):Array {

    return pathname.split( '/' );

  }
  /**
   * location.search を key: value へ分解します
   * @param {string} search location.search型文字列
   * @return {*} search を key: value へ分解し Object で返します
   */
  static parse( search:string = Loc.search ):Object {

    // 引数が文字でない時は処理しない
    if ( typeof search !== 'string' || search.length === 0 ) {

      return null;

    }

    search = search.replace( '&amp;', '&' );
    let vars = search.split( '&' );
    let results = {};

    for ( var val of vars ) {

      let pair = val.split( '=' );
      if ( Array.isArray( pair ) && pair.length === 2 ) {

        results[ pair[ 0 ] ] = pair[ 1 ];

      }

    }

    return results;

  }

}
