/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/10 - 16:32
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

/**
 * Api query option を key ごとに管理します
 */
export class Query {
  /**
   * Api query option 情報を保持します
   *
   * <code>?key=value</code>
   *
   * key, value型, default値, 必須情報...
   *
   * @param {string} key query key
   * @param {string} type query value type
   * @param {string|Number|null} [defaultValue=null] default value, あれば...
   * @param {boolean} [require=false] 必須フラグ
   */
  constructor( key:string, type:string, defaultValue = null, require:boolean = false ) {

    this._key = key;
    this._type = type;
    this._require = require;
    this._value = defaultValue;

  }

  /**
   * @param {string} key query key
   * @return {boolean} query key が存在するかを返します
   */
  has( key:string ):boolean {

    return this._key === key;

  }

  /**
   * @param {string} key query key
   * @return {*} {{key: string, type: string, require: boolean, value: *}}|null を返します
   */
  search( key:string ):Object {

    if ( this.has( key ) ) {

      return {
        key: this._key,
        type: this._type,
        require: this._require,
        value: this._value
      };

    }

    return null;

  }
}
