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


/**
 * <p>Api query option を key ごとに管理します</p>
 *
 * <code>?key=value</code>
 *
 * <p>key, value型, default値, 必須情報...</p>
 *
 * */
export class Query {
  /**
   * Api query option 情報を保持します
   *
   * @param {string} key query key
   * @param {string} type query value type
   * @param {string|Number|null} [defaultValue=null] default value, あれば...
   * @param {Boolean} [require=false] 必須フラグ
   */
  constructor( key:string, type:string, defaultValue = null, require:Boolean = false ) {
    /**
     * query key
     * @type {string}
     * @protected
     */
    this._key = key;
    /**
     * query value type
     * @type {string}
     * @protected
     */
    this._type = type;
    /**
     * 必須フラグ
     * @type {Boolean}
     * @private
     * @protected false
     */
    this._require = require;
    /**
     * default value あれば...
     * @type {string|Number|null}
     * @private
     * @protected null
     */
    this._value = defaultValue;

  }

  /**
   * query key が存在するかを調べ真偽値を返します
   * @param {string} key query key
   * @return {Boolean} query key が存在するかを返します
   */
  has( key:string ):Boolean {

    return this._key === key;

  }

  /**
   * 引数 key が存在すれば Object を返します
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
