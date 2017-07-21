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

const initial = {
  type: ReducerTypes.INITIAL,
  data: null,
  error: null,
  year: null,
};

// let result = null;

const calendar = (requestState = initial, action) => {
  const state = Object.assign({}, requestState);
  console.log('reducers.calendar', state, action);
  // switch-case
  switch (action.type) {
    case ReducerTypes.CALENDAR_COMPLETE: {
      state.type = action.type;
      state.data = action.data;
      state.year = action.year;
      // result = action.json;
      return state;
    }
    case ReducerTypes.CALENDAR_ERROR: {
      state.type = action.type;
      state.error = action.error;
      state.year = action.year;
      return state;
    }
    case ReducerTypes.INITIAL:
    default: {
      // if (result !== null) {
      //   state.json = result;
      // }
      return state;
    }
  }
};

export default calendar;
