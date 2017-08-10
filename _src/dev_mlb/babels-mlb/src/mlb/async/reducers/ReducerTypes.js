/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/19 - 18:30
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * redux - reducer type を定義します
 */
export default class ReducerTypes {
  /**
   * default state - reducerInitial
   * @type {string}
   */
  static INITIAL = 'reducerInitial';
  // ----------------------------------------
  // 日程・結果
  // ----------------------------------------
  /**
   * {@link Api.calendar} ajax complete - calendarComplete
   * @type {string}
   */
  static CALENDAR_COMPLETE = 'calendarComplete';
  /**
   * {@link Api.calendar} ajax error - calendarError
   * @type {string}
   */
  static CALENDAR_ERROR = 'calendarError';
  /**
   * {@link Api.schedule} ajax complete - scheduleComplete
   * @type {string}
   */
  static SCHEDULE_COMPLETE = 'scheduleComplete';
  /**
   * {@link Api.schedule} ajax error - scheduleComplete
   * @type {string}
   */
  static SCHEDULE_ERROR = 'scheduleComplete';
  /**
   * SCHEDULE_START - scheduleStart
   * @type {string}
   */
  static SCHEDULE_START = 'scheduleStart';
  // ----------------------------------------
  // GAME
  // ----------------------------------------
  /**
   * game 関連 Ajax complete event type
   * @type {string}
   */
  static GAMES_COMPLETE = 'gamesComplete';
  /**
   * game 関連 Ajax error event type
   * @type {string}
   */
  static GAMES_ERROR = 'gamesError';
  // static INFO_COMPLETE = 'infoComplete';
  // static INFO_ERROR = 'infoError';
  // static PLAYER_COMPLETE = 'playerComplete';
  // static PLAYER_ERROR = 'playerError';
  // static INNINGS_COMPLETE = 'inningsComplete';
  // static INNINGS_ERROR = 'inningsError';
}
