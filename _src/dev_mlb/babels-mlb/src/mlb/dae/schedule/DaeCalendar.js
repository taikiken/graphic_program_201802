/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/18 - 13:20
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// dae
import Normalize from '../../util/Normalize';

// module
import ModCalendar from '../../module/calendar/ModCalendar';

// util
import Day from '../../util/Day';

/**
 * [native code] - parseInt
 * @type {function}
 */
const parseInt = self.parseInt;

/**
 * 曜日リスト 0: 日曜
 * @type {Array.<string>}
 */
const weeks = Day.weeks;

/**
 * 日付情報を管理します
 * ```
 * {
 *  "day": 0,
 *  "is_play": false
 * }
 * ```
 * 年月を追加します
 * - year {number}
 * - month {number}
 * day 数値型変換します
 */
class DaeDate {
  /**
   * 日付情報
   * @param {{dat: number, is_play: boolean}} info JSON
   * @param {number} year 年 parseInt 済み
   * @param {number} month 月 parseInt 済み
   * @param {number} day 日 parseInt 済み
   */
  constructor(info, year, month, day) {
    const origin = Normalize.obj(info);
    // const day = Normalize.int(origin.day);
    // const day = day;
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * 日
     * @type {number}
     */
    this.day = day;
    /**
     * 曜日
     * @type {string}
     */
    this.week = Normalize.str(weeks[day]);
    /**
     * 試合あり flag
     * @type {boolean}
     */
    this.has = origin.is_play;
    /**
     * 年
     * @type {number}
     */
    this.year = year;
    /**
     * 月
     * @type {number}
     */
    this.month = month;
    // this.day = day;
  }
}

// 年別.json - calendar 表示用
/**
 * 年別.json - calendar 表示用 を normalize + 加工します
 */
export default class DaeCalendar {
  /**
   * 年別.json - calendar 表示用
   * @param {object} info 年別.json - calendar 表示用
   * @param {number} year 年 4桁
   */
  constructor(info, year) {
    // @type {object}
    const origin = Normalize.obj(info);
    // @type {Array.<string>}
    const months = Object.keys(origin);
    const schedules = [];
    // 月 kye を元にパースします
    const list = months.map((month) => {
      const data = Normalize.obj(origin[month]);
      // 数値型変換
      const monthNum = parseInt(month, 10);
      // 日付 kye を元にパースします
      return Object.keys(data).map((day) => {
        const oneDay = Normalize.obj(data[day]);
        // 試合有無チェック
        if (!oneDay.is_play) {
          return null;
        }
        // 数値型変換
        const dayNum = parseInt(day, 10);
        // 試合日のみ calendar に追加する
        const date = new DaeDate(oneDay, year, monthNum, dayNum);
        schedules.push(date);
        return date;
      });
    });
    // ----
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    // console.log('DaeCalendar list', list);
    /**
     * 配列に試合が無い日も null でリストされています
     * @type {Array}
     */
    this.list = list;
    /**
     * 月（文字型）リスト
     * @type {Array.<string>}
     */
    this.months = months;
    /**
     * 試合日のみリスト
     * @type {Array.<DaeDate>}
     */
    this.schedules = schedules;
    /**
     * カレンダーに表示するイベント一覧
     * @type {ModCalendar}
     */
    this.events = new ModCalendar(schedules);
  }
}
