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

import {Url} from '../app/const/Url';

import {Safety} from '../data/Safety';

/**
 * location に関する utility
 */
export class Loc {
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * location.href
   * @return {string} location.href を返します
   */
  static get current() {
    return self.location.href;
  }
  /**
   * location.href へ href をセット遷移させます
   * @param {string} href 遷移先パス
   */
  static set current(href) {
    self.location.href = href;
  }
  /**
   * @return {string} location.pathname(urlからprotocol+hostを除く)を返します
   */
  static get path() {
    return self.location.pathname;
  }
  /**
   * location.pathname をセットします
   * @param {string} path 設定する pathname
   */
  static set path(path) {
    self.location.pathname = path;
  }
  /**
   * location.hash
   * @return {string} location.hashを返します
   */
  static get hash() {
    return self.location.hash;
  }
  /**
   * location.hashを設定します
   * @param {string} hash 設定する hash
   */
  static set hash(hash) {
    self.location.hash = hash;
  }
  /**
   * hash を消去します
   */
  static hashClean() {
    Loc.hash = '';
    const path = Loc.path;
    const hashIndex = path.lastIndexOf('#');
    if (hashIndex !== -1) {
      Loc.path = path.substring(0, hashIndex - 1);
    }
  }
  /**
   * url の query 文字列
   * @return {string} url ? 以降の query 文字列を返します, a=xxx&b=yyy
   */
  static get search() {
    return self.location.search.substring(1);
  }
  /**
   * location.host
   * @return {string} host name + port number を返します
   */
  static get host() {
    // host + port number
    return self.location.host;
  }
  /**
   * location.hostname
   * @return {string} host name だけを返します
   */
  static get hostname() {
    // host only
    return self.location.hostname;
  }
  /**
   * location.port
   * @return {string} port number を返します
   */
  static get port() {
    // port number
    return self.location.port;
  }
  /**
   * location.protocol
   * @return {string} ocation.protocol を返します
   */
  static get protocol() {
    return location.protocol;
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * hash(#example)から`#`をとります
   * @param {string} hash hash文字列
   * @return {string} hash文字列から#を削除した文字列を返します
   */
  static hashStrip(hash = Loc.hash) {
    hash = Safety.string( hash, Loc.hash );
    return hash.replace(/^[#\/]|\s+$/g, '');
  }
  /**
   * pathnameを/で分解します
   * @param {string} [pathname=Loc.pathname] location.pathname, host なしの path
   * @return {Array.<string>} pathname を `/` で分解し配列にし返します
   */
  static resolve(pathname = Loc.path) {
    pathname = Safety.string( pathname, Loc.path );
    return pathname.split('/');
  }
  /**
   * location.search を key: value へ分解します
   * @param {string} search location.search型文字列
   * @return {*} search を key: value へ分解し Object で返します
   */
  static parse(search = Loc.search) {
    search = Safety.string( search, Loc.search );
    // 引数が文字でない時は処理しない
    if (typeof search !== 'string' || search.length === 0) {
      return null;
    }

    search = search.replace('&amp;', '&');
    const vars = search.split('&');
    const results = {};

    // for ( let val of vars ) {
    //
    //   let pair = val.split( '=' );
    //   if ( Array.isArray( pair ) && pair.length === 2 ) {
    //
    //     results[ pair[ 0 ] ] = pair[ 1 ];
    //
    //   }
    //
    // }
    vars.map((val) => {
      const pair = val.split('=');
      if (Array.isArray(pair) && pair.length === 2) {
        results[pair[0]] = pair[1];
      }
    });
    return results;
  }
  /**
   * host が local かを調べます
   * @return {boolean} host が local の時に true を返します
   */
  static isLocal() {
    const host = Loc.host;
    return host.indexOf( '192.168' ) === 0 ||
      host.indexOf( '0.0.0.0' ) === 0 ||
      host.indexOf( 'localhost' ) === 0 ||
      host.indexOf( '127.0.0.1' ) === 0;
  }
  /**
   * index(home) へ遷移します
   */
  static index() {
    Loc.current = Url.index();
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * search を調べたい時に instance を作成します
   */
  constructor() {
    /**
     * url の query 文字列
     * @type {null|string}
     */
    this.search = null;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * 文字列を query 型として parse します
   * @param {string} [search=''] key: value にしたい search型 文字列
   * @return {Loc} instance を返します
   */
  parse(search = '') {
    search = Safety.string(search, '');
    this.search = Loc.parse(search);
    return this;

  }
  /**
   * search value を keyから探します
   * @param {string} key search name
   * @return {?string} string|undefined|null で結果を返します
   */
  find(key) {
    const search = this.search;
    // if (search === null) {
    //   return null;
    // }
    //
    // return search[key];
    return search ? search[key] : null;
  }
}
