/**
 * Copyright (c) 2011-2018 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2018/04/19 - 19:20
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * data-prefix 属性値 を保持します
 * @static
 * @private
 * @type {string}
 */
let prefix = '';

/**
 * data-current 属性値 を保持します
 * @static
 * @private
 * @type {string}
 */
let current = 'vk';

/**
 * VK - 設定ファイル
 */
export default class VK {
  /**
   * data-prefix 属性値
   * @returns {string} data-prefix 属性値
   */
  static get PREFIX() {
    return prefix;
  }
  /**
   * data-prefix 属性値 を設定します
   * @param {string} dataPrefix data-prefix 属性値
   */
  static set PREFIX(dataPrefix) {
    prefix = dataPrefix;
  }
  /**
   * data-prefix 属性値 を取得します
   * @param {boolean} vk 取得 flag
   * @returns {string} true 時に {@link VK}.PREFIX 返します
   */
  static prefix(vk = false) {
    return vk ? VK.PREFIX : '';
  }
  /**
   * data-current 属性値 を取得します
   * @returns {string} data-current 属性値 を返します
   */
  static get current() {
    return current;
  }
  /**
   * data-current 属性値 を設定します
   * @param {string} value 属性値
   */
  static set current(value) {
    current = value;
  }
}
