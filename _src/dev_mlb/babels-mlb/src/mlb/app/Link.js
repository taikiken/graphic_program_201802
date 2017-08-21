/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/20 - 16:42
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * 遷移パスを取得します
 */
export default class Link {
  /**
   * mlb base path - `/stats/mlb`
   * @const BASE
   * @type {string}
   */
  static BASE = '/stats/mlb';
  // ---------------------------------------------------
  //  master/schedule
  // ---------------------------------------------------
  /**
   * 動的: 日程結果パス `/stats/mlb/YYYYMMDD` へ遷移します
   * @param {string} yyyymmdd YYYYMMDD 形式の年月日
   * @returns {string} 日程パスを返します
   */
  static schedule(yyyymmdd) {
    return `${Link.BASE}/${yyyymmdd}/`;
  }
}
