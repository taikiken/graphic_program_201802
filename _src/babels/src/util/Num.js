/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/16 - 16:15
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * 数値関連のユーティリティ
 */
export class Num {
  /**
   * 指定桁で小数点を切詰めます
   * @param {number} num 処理対象数値
   * @param {number} [trunk=1] 切り詰めケタ数
   * @return {number} 指定桁で切り詰めた数値を返します
   */
  static float(num, trunk = 1) {
    const base = 10 * trunk;
    // 小数点を切り捨てます
    const int = parseInt(num * base, 10);
    return int / base;
  }
}
