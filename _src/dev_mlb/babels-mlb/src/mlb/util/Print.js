/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/25 - 14:20
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * 出力管理します
 */
export default class Print {
  /**
   * int 型を文字出力します
   * - 不正値 -1 なので負数は「""」から文字を返します
   * @param {number} number 出力対象数値
   * @param {string} [alternate=''] 代替文字
   * @returns {string} 文字変換し返します
   */
  static int(number, alternate = '') {
    return number >= 0 ? String(number) : alternate;
  }
  /**
   * 文字型出力をします
   * @param {string} text 出力対象文字
   * @param {string} [alternate=''] 代替文字
   * @returns {string} 文字変換し返します
   */
  static str(text, alternate = '') {
    return text || alternate;
  }
}
