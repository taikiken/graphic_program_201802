/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/19 - 20:00
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import Api from '../../../app/Api';

// util
import Day from '../../../util/Day';

// net
import ajax from '../../../net/ajax';

// reducer
import ReducerTypes from '../../reducers/ReducerTypes';

// dae
import DaeCalendar from '../../../dae/schedule/DaeCalendar';

/**
 * [native code] - parseInt
 * @type {function}
 */
const parseInt = self.parseInt;

// calendar
// YYYY.json
/**
 * async method - {@link ajax} を await 実行します
 * @param {number} year 取得年
 * @returns {Promise} 実行もとへ Promise を返します
 */
async function asyncCall(year) {
  const path = Api.calendar(year);
  const json = await ajax(path);
  return json;
}

const requestComplete = (json, year, today) => {
  const data = new DaeCalendar(json, year);
  return {
    data,
    year,
    today,
    type: ReducerTypes.CALENDAR_COMPLETE,
  };
};

const requestError = (error, year, today) => ({
  error,
  year,
  today,
  type: ReducerTypes.CALENDAR_ERROR,
});

/**
 * calendar 表示用 JSON を取得します
 * @param {?string} [requestYear=null] 取得年
 * @param {?Date} [requestToday=null] current にする Date instance
 */
const calendar = (requestYear = null, requestToday = null) => (dispatch) => {
  console.log('actions.calendar requestYear', requestYear, typeof requestYear);
  const year = parseInt(requestYear, 10) || Day.thisYear();
  const today = requestToday || Day.current();
  return asyncCall(year)
    .then(json => dispatch(requestComplete(json, year, today)))
    .catch(error => dispatch(requestError(error, year, today)));
};

export default calendar;
