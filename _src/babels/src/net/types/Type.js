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
'use strict';

/**
 * method / url 2つのpropertyを持ちます
 * method: POST | GET
 * utl: API request先
 */
export class Type {
  /**
   * @param {string} url API request先
   * @param {string} [method=GET] POST | GET | DELETE...
   */
  constructor( url:string, method:string = 'GET' ) {

    this.url = url;
    this.method = method;

  }

  /**
   * @returns {string} API request先を返します
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
   * @returns {string} POST | GET を返します
   */
  get method():string {

    return this._method;

  }

  /**
   * POST | GET... を設定します
   * @param {string} method POST | GET...の値
   */
  set method( method:string ):void {

    let methodUpper = method.toUpperCase();

    if ( !Type.validate( methodUpper ) ) {

      methodUpper = 'GET';

    }

    this._method = methodUpper;

  }

  /**
   * @static
   * @param {string} method method type
   * @return {boolean} method type を検証し真偽値を返します
   */
  static validate( method:string ):boolean {

    return [ 'GET', 'POST', 'PUT', 'DELETE' ].indexOf( method ) !== -1;

  }

}
