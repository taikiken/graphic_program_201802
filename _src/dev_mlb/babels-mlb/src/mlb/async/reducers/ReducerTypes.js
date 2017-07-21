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
   * default state
   * @type {string}
   */
  static INITIAL = 'reducerInitial';
  // ----------------------------------------
  // 日程・結果
  // ----------------------------------------
  /**
   * {@link Api.calendar} ajax complete
   * @type {string}
   */
  static CALENDAR_COMPLETE = 'calendarComplete';
  /**
   * {@link Api.calendar} ajax error
   * @type {string}
   */
  static CALENDAR_ERROR = 'calendarError';
  /**
   * {@link Api.schedule} ajax complete
   * @type {string}
   */
  static SCHEDULE_COMPLETE = 'scheduleComplete';
  /**
   * {@link Api.schedule} ajax error
   * @type {string}
   */
  static SCHEDULE_ERROR = 'scheduleComplete';
  // ----------------------------------------
  // UI
  // ----------------------------------------
}
