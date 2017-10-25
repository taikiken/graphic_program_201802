/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/20 - 22:39
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
  static INITIAL = 'reducersInitial';
  // ----------------------------------------
  // JSON REQUEST
  // ----------------------------------------
  // ----------------------------------------
  // ドラフト候補選手
  /**
   * ajax state: PLAYER_COMPLETE - playerComplete
   * @const PLAYER_COMPLETE
   * @type {string}
   */
  static PLAYER_COMPLETE = 'playerComplete';
  /**
   * ajax state: PLAYER_ERROR - playerError
   * @const PLAYER_ERROR
   * @type {string}
   */
  static PLAYER_ERROR = 'playerError';
  // ----------------------------------------
  // ドラフト2016, 上部間連ニュース
  /**
   * ajax state: NEWS_COMPLETE - newsComplete
   * @const NEWS_COMPLETE
   * @type {string}
   */
  static NEWS_COMPLETE = 'newsComplete';
  /**
   * ajax state: NEWS_ERROR - newsError
   * @const NEWS_ERROR
   * @type {string}
   */
  static NEWS_ERROR = 'newsError';
}
