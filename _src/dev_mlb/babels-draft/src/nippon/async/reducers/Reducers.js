/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/17 - 20:26
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
export default class Reducers {
  /**
   * default state - reducersInitial
   * @type {string}
   */
  static INITIAL = 'nipponInitial';
  // ----------------------------------------
  // JSON REQUEST
  // ----------------------------------------
  // ----------------------------------------
  // ドラフト候補選手
  /**
   * ajax state: NIPPON_COMPLETE - nipponComplete
   * @const NIPPON_COMPLETE
   * @type {string}
   */
  static NIPPON_COMPLETE = 'nipponComplete';
  /**
   * ajax state: NIPPON_ERROR - nipponError
   * @const NIPPON_ERROR
   * @type {string}
   */
  static NIPPON_ERROR = 'nipponError';
}
