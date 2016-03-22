/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/09 - 17:03
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Safety} from '../../data/Safety';

/**
 * method / url 2つのpropertyを持ちます
 * method: POST | GET
 * utl: API request先
 */
export class Type {
  /**
   * url, method を保存します
   * @param {string} url API request先
   * @param {string} [method=GET] 'GET', 'POST', 'PUT', 'DELETE'...
   */
  constructor( url:string, method:string = 'GET' ) {

    method = Safety.string( method, 'GET' );
    this.url = url;
    this.method = method.toUpperCase();

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * API request先
   * @return {string} API request先を返します
   */
  get url():string {

    return this._url;

  }

  /**
   * API request先を設定します
   * @param {string} url API request先
   */
  set url( url:string ):void {

    this._url = url;

  }

  /**
   * method POST|GET|PUT|DELETE
   * @return {string} POST | GET を返します
   */
  get method():string {

    return this._method;

  }

  /**
   * 'GET', 'POST', 'PUT', 'DELETE'... を設定します
   * @param {string} method 'GET', 'POST', 'PUT', 'DELETE'...
   */
  set method( method:string ):void {

    let methodUpper = method.toUpperCase();

    if ( !Type.validate( methodUpper ) ) {

      methodUpper = 'GET';

    }

    this._method = methodUpper;

  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * @param {string} method method type
   * @return {boolean} method type を検証し真偽値を返します
   */
  static validate( method:string ):boolean {

    return [ 'GET', 'POST', 'PUT', 'DELETE' ].indexOf( method ) !== -1;

  }

}
