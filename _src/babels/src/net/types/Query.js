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
 * Api query option を key ごとに管理します
 *
 * `?key=value`
 *
 * key, value型, default値, 必須情報...
 * */
export class Query {
  /**
   * Api query option 情報を保持します
   *
   * @param {string} key query key
   * @param {string} type query value type
   * @param {string|Number|null} [defaultValue=null] default value, あれば...
   * @param {boolean} [require=false] 必須フラグ
   */
  constructor(key, type, defaultValue = null, require = false) {
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
     * @type {boolean}
     * @protected
     */
    this._require = require;
    /**
     * default value あれば...
     * @type {?string|?number}
     * @private
     * @protected
     */
    this._value = defaultValue;
  }
  /**
   * query key が存在するかを調べ真偽値を返します
   * @param {string} key query key
   * @return {boolean} query key が存在するかを返します
   */
  has(key) {
    return this._key === key;
  }
  /**
   * 引数 key が存在すれば Object を返します
   * @param {string} key query key
   * @return {?{key: string, type: string, require: boolean, value: *}} 現在値を返します
   */
  search(key) {
    if (this.has(key)) {
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
