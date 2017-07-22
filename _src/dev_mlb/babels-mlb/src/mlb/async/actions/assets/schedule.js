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
const parallel = (year, month, day) => {
  const paths = [];
  // schedule
  paths.push(Api.schedule(year, month, day));
  // master/game type
  paths.push(Api.type);
  // master/team
  paths.push(Api.team);
  // parallel call
  return paths.map(path => (ajax(path)));
};

async function asyncCall(year, month, day) {
  const results = await Promise.all(parallel(year, month, day));
  return results;
}

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

const requestError = (error, date) => ({
  error,
  date,
  type: ReducerTypes.CALENDAR_ERROR,
});


const schedule = (requestDate = null) => (dispatch) => {
  const date = requestDate || Day.date();
  return asyncCall(date.year, date.month, date.day)
    .then(results => dispatch(requestComplete(results, date)))
    .catch(error => dispatch(requestError(error, date)));
};

export default schedule;
