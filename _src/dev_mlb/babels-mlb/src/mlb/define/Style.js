/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/25 - 19:59
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * Style に関する CONST
 */
export default class Style {
  /**
   * calendar に付与する id - js-mlb__schedule__calendar
   * @type {{id: string}}
   */
  static calendar = {
    id: 'js-mlb__schedule__calendar',
  };
  /**
   * team が勝った時に付与する class name - mlb__game__result--win を取得します
   * @type {string}
   */
  static WIN = 'mlb__game__result--win';
}
