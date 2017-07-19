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

const initialState = {
  type: ReducerTypes.INITIAL,
  json: {},
  error: null,
};

// let result = null;

const calendar = (requestState = initialState, action) => {
  const state = Object.assign({}, requestState);
  // switch-case
  switch (action.type) {
    case ReducerTypes.CALENDAR_COMPLETE: {
      state.json = action.json;
      // result = action.json;
      return state;
    }
    case ReducerTypes.CALENDAR_ERROR: {
      state.error = action.error;
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

export default {
  calendar,
};
