/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/05 - 17:21
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/**
 * redux reducer type
 */
export default class Reducers {
  /**
   * default state - reducersInitial
   * @type {string}
   */
  static INITIAL = 'liveInitial';
  // ----------------------------------------
  // JSON REQUEST
  // ----------------------------------------
  // ----------------------------------------
  // ドラフト候補選手
  /**
   * ajax state: LIVE_COMPLETE - liveComplete
   * @const LIVE_COMPLETE
   * @type {string}
   */
  static LIVE_COMPLETE = 'liveComplete';
  /**
   * ajax state: LIVE_ERROR - liveError
   * @const LIVE_ERROR
   * @type {string}
   */
  static LIVE_ERROR = 'liveError';
}
