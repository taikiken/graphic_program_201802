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
   * @param {string=GET} [method] POST | GET
   */
  constructor( url:string, method:string = 'GET' ) {

    this._url = url;
    this._method = method;

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
   * POST | GET を設定します
   * @param {string} method POST | GETの値
   */
  set method( method:string ):void {

    let methodUpper = method.toUpperCase();

    if ( methodUpper !== 'GET' && methodUpper !== 'POST' ) {

      methodUpper = 'GET';

    }

    this._method = methodUpper;

  }

}
