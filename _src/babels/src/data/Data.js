/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/21 - 13:39
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


/**
 * FormData へ append する key, value を管理します
 * - key - input.name
 * - value - input.value
 */
export class Data {
  /**
   * Ajax request に使用する FormData へ append する key, value
   * @param {string} key form key(name)
   * @param {string} value form value 値
   */
  constructor(key, value) {
    /**
     * input 名称, input.name - form:name
     * @type {string}
     */
    this.key = key;
    /**
     * input 値, input value - form.value
     * @type {string}
     */
    this.value = value;
  }
  // // ---------------------------------------------------
  // //  GETTER / SETTER
  // // ---------------------------------------------------
  // /**
  //  * form:name
  //  * @return {string|*} form key(name) を返します
  //  */
  // get key():string {
  //   return this._key;
  // }
  // /**
  //  * form.value
  //  * @return {string|*} form value 値 を返します
  //  */
  // get value():string {
  //   return this._value;
  // }
}
