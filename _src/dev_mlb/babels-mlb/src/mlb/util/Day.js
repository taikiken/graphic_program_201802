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

export default class Day {
  static current() {
    return new Date();
  }
  static today() {
    const current = Day.current();
    return {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };
  }
  static thisYear() {
    return Day.today().year;
  }
  static nextYear() {
    return Day.thisYear() + 1;
  }
  static full(date = Day.current()) {
    return `${date.getFullYear()}${Text.zero(date.getMonth() + 1)}${Text.zero(date.getDate())}`;
  }
}
