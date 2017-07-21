/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/18 - 14:49
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// moku/util
// import Text from '../../../moku/util/Text';

// util
import Day from '../../util/Day';

/**
 * react-big-calendar - events 情報を作成します
 * - {@link DaeCalendar}
 *   - {@link DaeDate}
 */
class ModCalendarEvents {
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * カレンダーに表示するイベント情報を作成します
   * @param {DaeDate} game JSON 加工済み
   */
  constructor(game) {
    const day = new Date(game.year, game.month - 1, game.day);
    // ---- react-big-calendar property
    /**
     * 開始日
     * @type {Date}
     */
    this.start = day;
    /**
     * 終了日
     * @type {Date}
     */
    this.end = day;
    /**
     * allDay flag - true
     * @type {boolean}
     */
    this.allDay = true;
    /**
     * 表示タイトル - ○○年○○月○○日
     * @type {string}
     */
    this.title = `${game.year}年${game.month}月${game.day}日`;
    // ------ custom property
    /**
     * 年
     * @type {number}
     */
    this.year = game.year;
    /**
     * 月
     * @type {number}
     */
    this.month = game.month;
    /**
     * 日
     * @type {number}
     */
    this.day = game.day;
    /**
     * YYYYMMDD 文字列
     * @type {string}
     */
    this.full = Day.full(day);
    // this.full = `${game.year}${Text.zero(game.month)}${Text.zero(game.day)}`;
  }
}

/**
 * 年別.json {@link DaeCalendar} からカレンダーに表記する試合情報を作成します
 * react-big-calendar - events 情報を作成します
 * - {@link DaeCalendar}
 *   - {@link DaeDate}
 */
export default class ModCalendar {
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * 1年分のカレンダーを作成します
   * @param {Array.<DaeDate>} schedules 表示させるリスト
   */
  constructor(schedules) {
    const games = schedules.map(game => (new ModCalendarEvents(game)));
    const calendar = {};
    games.map(event => (calendar[event.start] = event));
    /**
     *
     * @type {Array.<ModCalendarEvents>}
     */
    this.games = games;
    this.calendar = calendar;
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * this.games を取得します
   * @returns {Array.<ModCalendarEvents>} this.games を返します
   */
  events() {
    return this.games;
  }
  /**
   * 該当日付のイベント情報を取得します
   * @param {Date} date 探索 Date instance
   * @returns {?ModCalendarEvents} 該当日のイベント情報を返します
   */
  game(date) {
    console.log('ModCalendarEvents.game', date);
    return this.calendar[date];
  }
}
