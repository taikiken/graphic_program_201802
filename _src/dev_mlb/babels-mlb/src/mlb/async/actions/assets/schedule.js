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

// schedule
// YYYY.json
async function asyncCall(year, month, day) {
  const path = Api.schedule(year, month, day);
  const json = await ajax(path);
  return json;
}

const requestComplete = json => ({
  json,
  type: ReducerTypes.CALENDAR_COMPLETE,
});

const requestError = error => ({
  error,
  type: ReducerTypes.CALENDAR_ERROR,
});


const schedule = (requestDate = null) => (dispatch) => {
  const date = requestDate || Day.date();
  return asyncCall(date.year, date.month, date.day)
    .then(json => dispatch(requestComplete(json)))
    .catch(error => dispatch(requestError(error)));
};

export default schedule;
