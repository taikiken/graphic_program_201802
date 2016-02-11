/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/11 - 13:48
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
 * <h3>Page 遷移 URL</h3>
 * 全て static です
 */
export class Url {
  /**
   * <h4>Page 遷移 URL</h4>
   * <p>a tag href へハードコードされる URL 定義</p>
   * [参照](https://docs.google.com/spreadsheets/d/1raMO0x5aeG-bk45PK528ib9HUU-Q4DbHq56oxDQ1h7c/)
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target:Symbol ) {

    if ( _symbol !== target ) {

      throw new Error( `Url is static Class. not use new Url().` );

    }

  }
  // ---------------------------------------------------
  //  CONST 代わり
  // ---------------------------------------------------
  /**
   * @return {string} category/slug 置き換え文字定数
   */
  static get CATEGORY_SLUG():string {
    return '__SLUG__';
  }
  /**
   * @return {string} category url base
   */
  static get CATEGORY():string {
    return `/category/${Url.CATEGORY_SLUG}/`;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * URL index
   * @return {string} index url を返します
   */
  static index():string {
    return '/';
  }

  /**
   * category url
   * @param {string} [slug=all] category slug
   * @return {string} category url を返します
   */
  static category( slug:string = 'all' ):string {
    return Url.CATEGORY.replace( Url.CATEGORY_SLUG, slug );
  }
  /**
   * category ranking url
   * @param {string} [slug=all] category slug
   * @return {string} category ranking url を返します
   */
  static ranking( slug:string = 'all' ):string {
    return `${Url.CATEGORY.replace( Url.CATEGORY_SLUG, slug )}ranking/`;
  }
  /**
   * category video url
   * @param {string} [slug=all] category slug
   * @return {string} category video url を返します
   */
  static video( slug:string = 'all' ):string {
    return `${Url.CATEGORY.replace( Url.CATEGORY_SLUG, slug )}video/`;
  }
  /**
   * 検索ページ url
   * @param {string} keyword 検索ワード
   * @return {*string} 検索ページ url を返します
   */
  static search( keyword:string ):string {
    return `/search/${keyword}`;
  }
  /**
   * signup url
   * @param {string} [path=''] path option
   * @return {string} signup url を返します
   */
  static signup( path:string = '' ):string {
    let base = '/signup/';

    switch ( path ) {

      case 'account':
        return `${base}account`;

      case 'interest':
        return `${base}interest`;

      case '':
        return base;

      default:
        console.warn( `signup illegal value: ${path}, instead use default` );
        return base;

    }

  }
  /**
   * login url
   * @return {string} login url を返します
   */
  static login():string {
    return '/login/';
  }

  /**
   * logout url
   * @return {string} logout url を返します
   */
  static logout():string {
    return '/logout/';
  }
  /**
   * reset_password url
   * @param {string} [path=''] path option
   * @return {*} reset_password url を返します
   */
  static password( path:string = '' ):string {
    let base = '/reset_password/';

    switch ( path ) {

      case 'resetting':
        return `${base}resetting`;

      case '':
        return base;

      default:
        console.warn( `password illegal value: ${path}, instead use default` );
        return base;
    }
  }
  /**
   * mypage url
   * @param {string} [path=''] path option
   * @return {*} mypage url を返します
   */
  static mypage( path:string = '' ):string {
    let base = '/mypage/';

    switch ( path ) {

      case 'activities':
        return `${base}activities`;

      case '':
        return base;

      default:
        console.warn( `mypage illegal value: ${path}, instead use default` );
        return base;
    }

  }
  /**
   * notifications url
   * @return {string} notifications url を返します
   */
  static notifications():string {
    return '/notifications/';
  }
  /**
   * settings url
   * @param {string} [path=''] path option
   * @return {*} settings url を返します
   */
  static settings( path:string = '' ):string {
    let base = '/settings/';


    switch ( path ) {

      case 'interest':
        return `${base}interest`;

      case 'social':
        return `${base}social`;

      case 'deactivate':
        return `${base}deactivate`;

      case '':
        return base;

      default:
        console.warn( `settings illegal value: ${path}, instead use default` );
        return base;
    }

  }
}