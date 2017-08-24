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

// async/reducers
import ReducerTypes from '../ReducerTypes';

/**
 * schedule: default の state
 * @type {{type: string, schedule: null, types: null, teams: null, error: null, date: null}}
 */
const initial = {
  type: ReducerTypes.INITIAL,
  schedule: null,
  types: null,
  teams: null,
  error: null,
  date: null,
};

/**
 * schedule: redux - reducers
 * @param {*} requestState state
 * @param {*} action schedule: redux - actions
 * @returns {*} 新しい state を返します
 */
const schedule = (requestState = initial, action) => {
  const state = Object.assign({}, requestState);
  // console.log('reducers.schedule', state, action);
  // switch-case
  switch (action.type) {
    case ReducerTypes.SCHEDULE_COMPLETE: {
      state.type = action.type;
      state.schedule = action.schedule;
      state.types = action.types;
      state.teams = action.teams;
      state.date = action.date;
      return state;
    }
    case ReducerTypes.SCHEDULE_ERROR: {
      state.type = action.type;
      state.error = action.error;
      state.date = action.date;
      return state;
    }
    case ReducerTypes.INITIAL:
    default: {
      return state;
    }
  }
};

export default schedule;
