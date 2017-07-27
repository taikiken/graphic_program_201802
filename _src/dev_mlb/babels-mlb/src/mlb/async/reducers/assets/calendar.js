/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/19 - 18:41
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import ReducerTypes from '../ReducerTypes';

/**
 * initial state
 * @type {{type: string, data: ?object, error: ?Error, year: ?number, today: ?Date}}
 */
const initial = {
  type: ReducerTypes.INITIAL,
  data: null,
  error: null,
  year: null,
  today: null,
};

/**
 * reducers.calendar 定義
 * @param {object} [requestState=initial] 通知 state
 * @param {*} action action state - 変化してるかも
 * @returns {*} action.type により state を変え返します
 */
const calendar = (requestState = initial, action) => {
  const state = Object.assign({}, requestState);
  console.log('reducers.calendar', state, action);
  // switch-case
  switch (action.type) {
    // calendar complete
    case ReducerTypes.CALENDAR_COMPLETE: {
      state.type = action.type;
      state.data = action.data;
      state.year = action.year;
      state.today = action.today;
      return state;
    }
    // calendar error
    case ReducerTypes.CALENDAR_ERROR: {
      state.type = action.type;
      state.error = action.error;
      state.year = action.year;
      state.today = action.today;
      return state;
    }
    // default
    case ReducerTypes.INITIAL:
    default: {
      return state;
    }
  }
};

export default calendar;
