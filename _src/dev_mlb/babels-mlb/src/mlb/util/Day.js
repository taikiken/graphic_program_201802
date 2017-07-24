/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/19 - 20:11
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// moku/util
import Text from '../../moku/util/Text';

/**
 * 日付に関する Helper
 */
export default class Day {
  static weeks = ['日', '月', '火', '水', '木', '金', '土'];
  /**
   * 今日の Date instance を作成します
   * @returns {Date} 今日の Date instance を返します
   */
  static current() {
    return new Date();
  }
  /**
   * 今日の年月日を分解し取得します
   * @returns {{year: number, month: number, day: number}} 今日の年月日を返します
   */
  static today() {
    const current = Day.current();
    // return {
    //   year: current.getFullYear(),
    //   month: current.getMonth() + 1,
    //   day: current.getDate(),
    //   date: current,
    // };
    return Day.date(current);
  }
  /**
   * 今年の年を取得します
   * @returns {number} 今年の年を返します
   */
  static thisYear() {
    return Day.today().year;
  }
  /**
   * 来年の年を取得します
   * @returns {number} 来年の年を返します
   */
  static nextYear() {
    return Day.thisYear() + 1;
  }
  /**
   * YYYYMMDD 文字列を取得します
   * @param {Date} [date=new Date()] 変換元 Date instance
   * @returns {string} YYYYMMDD 文字列を返します
   */
  static full(date = Day.current()) {
    return `${date.getFullYear()}${Text.zero(date.getMonth() + 1)}${Text.zero(date.getDate())}`;
  }
  static day(index) {
    return Day.weeks[index];
  }
  static title(date = Day.current()) {
    return `${date.month}月${date.day}日（${date.week}）`;
  }
  static date(date) {
    return {
      date,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      week: Day.day(date.getDay()),
    };
  }
}
