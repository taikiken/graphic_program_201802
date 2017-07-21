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
};

// let result = null;

const schedule = (requestState = initial, action) => {
  const state = Object.assign({}, requestState);
  // switch-case
  switch (action.type) {
    case ReducerTypes.SCHEDULE_COMPLETE: {
      state.type = action.type;
      state.data = action.data;
      return state;
    }
    case ReducerTypes.SCHEDULE_ERROR: {
      state.type = action.type;
      state.error = action.error;
      return state;
    }
    case ReducerTypes.INITIAL:
    default: {
      return state;
    }
  }
};

export default schedule;
