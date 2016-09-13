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


import {Safety} from '../data/Safety';

let _symbol = Symbol();

/**
 * cookie を取得・削除・設定します
 * 全て static です
 */
export class Cookie {
  /**
   * cookie を取得・削除・設定します
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( 'Cookie is static Class. not use new Cookie().' );

    }

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * token cookie name
   * @const TARGET
   * @return {string} cookie key name を返します
   */
  static get TARGET():string {
    return 'auth_token';
  }
  /**
   * Syn. menu を開いた時にセットする cookie name
   * @const SYN
   * @return {string} Syn. menu を開いた時にセットする cookie name を返します
   */
  static get SYN():string {
    return 'visited';
  }
  /**
   * 初めての訪問 cookie name
   * @const EVER_BEEN
   * @return {string} been 初めての訪問 cookie name を返します
   */
  static get EVER_BEEN():string {
    return 'been';
  }

  /**
   * @const APP_BANNER
   * @return {string} app_banner アプリバーアナー cookie name を返します
   */
  static get APP_BANNER():string {
    return 'app_banner';
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * cookie value を取得します
   * @param {string} keyName cookie key name
   * @return {string|null} cookie 値を返します、取得できない時は null を返します
   */
  static get( keyName:string ) {
    // console.log( 'get ', keyName, document.cookie.replace( new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent( keyName ).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1') );
    return decodeURIComponent( document.cookie.replace( new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent( keyName ).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1') ) || null;
  }
  /**
   * cookie を保存します
   * @param {string} value 保存値
   * @param {string} [keyName=Cookie.TARGET] cookie 名称
   * @param {Date} [end] expires date 90days 1000 * 60 * 60 * 24 * 90
   * @param {string} [path='/'] cookie 指定したパスが設定されます
   * @param {string} [domain=''] ドメイン, 特定するときは example.com or subdomain.example.com と指定します。 default は **現在のドメイン**
   * @param {Boolean} [secure=false] https通信のときのみ、クッキーが送信されます
   * @return {Boolean} 保存 成功か否かの真偽値 を返します
   */
  static save( value:string, keyName:string = Cookie.TARGET, end:Date = new Date( Date.now() + (1000 * 60 * 60 * 24 * 90) ), path:string = '/', domain:string = '', secure:Boolean = false ):Boolean {

    value = Safety.string( value, '' );
    keyName = Safety.string( keyName, Cookie.TARGET );
    path = Safety.string( path, '/' );
    domain = Safety.string( domain, '' );

    path = path !== '' ? `; path=${path}` : '';
    domain = domain !== '' ? `; domain=${domain}` : '';
    let secureSetting = secure ? '; secure' : '';

    // cookie へ保存
    // console.log( 'save ', value, keyName, end.toUTCString(), domain, path, secure );
    document.cookie = `${encodeURIComponent(keyName)}=${encodeURIComponent(value)}; expires=${end.toUTCString()}${domain}${path}${secureSetting}`;
    return true;

  }
  /**
   * 指定名称の cookie が存在するかを調べます
   * @param {string} keyName 調査対象 cookie 名称
   * @return {Boolean} cookie が存在するかの真偽値 を返します
   */
  static has( keyName:string ):Boolean {
    return Cookie.get( keyName ) !== null;
  }
  /**
   * 指定名称の cookie を削除します
   * @param {string} keyName cookie 名称
   * @param {string} [path='/'] cookie 指定したパスが設定されます
   * @param {string} [domain=''] ドメイン, 特定するときは example.com or subdomain.example.com と指定します。 default は **現在のドメイン**
   * @return {Boolean} 削除 成功か否かの真偽値 を返します
   */
  static remove( keyName:string = Cookie.TARGET, path:string = '/', domain:string = '' ):Boolean {
    if ( Cookie.has( keyName ) ) {
      return Cookie.save( '', keyName, new Date(), path, domain );
    }
    return false;
  }
}
