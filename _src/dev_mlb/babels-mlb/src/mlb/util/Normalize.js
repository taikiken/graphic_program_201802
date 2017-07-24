/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/18 - 12:17
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import Type from '../../moku/util/Type';

/**
 * JSON data value を正規化します
 */
export default class Normalize {
  /**
   * 整数値 正規化します
   * @param {number} num 処理対象
   * @param {number} [alt=-1] 代替数値
   * @returns {number} 正規化数値を返します
   */
  static int(num, alt = -1) {
    return Type.int(num) ? num : alt;
  }
  /**
   * 文字正規化します
   * @param {string} txt 処理対象
   * @param {string} [alt=''] 代替文字列
   * @returns {string} 正規化文字列を返します
   */
  static str(txt, alt = '') {
    return txt || alt;
  }
  /**
   * 配列 正規化します
   * @param {Array} array 処理対象
   * @returns {Array.<*>} 不正値の時は配列複製を返します
   */
  static arr(array) {
    return Array.isArray(array) ? array : [].slice(0);
  }
  /**
   * object 正規化します
   * @param {object} object 処理対象
   * @returns {Object} 不正値の時は空 object clone を返します
   */
  static obj(object) {
    return object && typeof object === 'object' ? object : Object.create({});
  }
}
