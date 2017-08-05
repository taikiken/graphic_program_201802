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

// dae/schedule
import DaeSchedule from '../../../dae/schedule/DaeSchedule';

// dae/master
import DaeGameTypes from '../../../dae/master/DaeGameTypes';
import DaeTeamTypes from '../../../dae/master/DaeTeamTypes';

// game info
/**
 * 日程 ajax まとめて取得します
 * - {@link Api.schedule}
 * - {@link Api.type}
 * - {@link Api.teams}
 * @param {number} year 年
 * @param {number} month 月
 * @param {number} day 日
 * @returns {Array} 結果セットを返します
 */
const parallel = (year, month, day) => {
  const paths = [];
  // schedule
  paths.push(Api.schedule(year, month, day));
  // master/game type
  paths.push(Api.type());
  // master/team
  paths.push(Api.teams());
  // parallel call
  return paths.map(path => (ajax(path)));
};

/**
 * 並行処理する ajax を Promise.all し await します
 * @param {number} year 年
 * @param {number} month 月
 * @param {number} day 日
 * @returns {Promise.<*>} async Promise.all
 */
async function asyncCall(year, month, day) {
  const results = await Promise.all(parallel(year, month, day));
  return results;
}

/**
 * 日程 ajax - success callback
 * @param {Array.<*>} results 結果セット
 * - {@link Api.schedule}
 * - {@link Api.type}
 * - {@link Api.teams}
 * @param {*} date 取得日 object {@link Day.today}
 * @returns {{schedule: DaeSchedule, types: DaeGameTypes, teams: DaeTeamTypes, date: *, type: string}}
 * complete state object
 */
const requestComplete = (results, date) => {
  const schedule = new DaeSchedule(results.shift());
  const types = new DaeGameTypes(results.shift());
  const teams = new DaeTeamTypes(results.shift());
  return {
    schedule,
    types,
    teams,
    date,
    type: ReducerTypes.SCHEDULE_COMPLETE,
  };
};

/**
 * 日程 ajax - error callback
 * @param {Error} error ajax error
 * @param {*} date 取得日 object {@link Day.today}
 * @returns {*} error state object
 */
const requestError = (error, date) => ({
  error,
  date,
  type: ReducerTypes.SCHEDULE_ERROR,
});

/**
 * 日程 JSON を取得します
 * - {@link Api.schedule}
 * - {@link Api.type}
 * - {@link Api.teams}
 * @param {?{date: Date, year: number, month: number, day: number, week: string}} [requestDate=Day.today]
 * 取得日 object
 * @returns {Promise} fetch Promise
 */
const schedule = (requestDate = null) => (dispatch) => {
  const date = requestDate || Day.today();
  return asyncCall(date.year, date.month, date.day)
    .then(results => dispatch(requestComplete(results, date)))
    .catch(error => dispatch(requestError(error, date)));
};

export default schedule;
