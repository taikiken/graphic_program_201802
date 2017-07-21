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

const parseInt = self.parseInt;

// calendar
// YYYY.json
async function asyncCall(year) {
  const path = Api.calendar(year);
  const json = await ajax(path);
  return json;
}

const requestComplete = (json, year) => {
  const data = new DaeCalendar(json, year);
  return {
    data,
    year,
    type: ReducerTypes.CALENDAR_COMPLETE,
  };
};

const requestError = (error, year) => ({
  error,
  year,
  type: ReducerTypes.CALENDAR_ERROR,
});


const calendar = (requestYear = null) => (dispatch) => {
  console.log('actions.calendar requestYear', requestYear, typeof requestYear);
  const year = parseInt(requestYear, 10) || Day.thisYear();
  return asyncCall(year)
    .then(json => dispatch(requestComplete(json, year)))
    .catch(error => dispatch(requestError(error, year)));
};

export default calendar;
