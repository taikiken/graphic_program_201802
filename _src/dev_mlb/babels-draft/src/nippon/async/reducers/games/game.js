/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/17 - 20:26
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import Env from '../../../../draft/app/Env';

import Reducers from '../Reducers';

/**
 * `/async/reducers/game/` - default state
 * @type {{
 *    type: string,
 *    result: ?PlayersDae,
 *    error: ?Error,
 *    interval: number,
 *    id: string|number,
 *    noRecords: boolean,
 * }}
 */
const initial = {
  type: Reducers.INITIAL,
  interval: Env.nipponInterval,
  id: Env.nipponId,
  noRecords: Env.noRecords,
  result: null,
  error: null,
};

/**
 * 日本シリーズ - redux reducer
 * @param {*} requestState state
 * @param {*} action action
 * @returns {*} redux state
 */
const game = (requestState = initial, action) => {
  const state = Object.assign({}, requestState);
  // console.log('reducers.player', state, action);
  // switch-case
  switch (action.type) {
    // success
    case Reducers.NIPPON_COMPLETE: {
      state.type = action.type;
      state.result = action.result;
      state.interval = action.interval;
      state.id = action.id;
      state.noRecords = action.noRecords;
      return state;
    }
    // error
    case Reducers.NIPPON_ERROR: {
      state.type = action.type;
      state.error = action.error;
      state.interval = action.interval;
      state.id = action.id;
      state.noRecords = action.noRecords;
      return state;
    }
    // default
    case Reducers.INITIAL:
    default: {
      return state;
    }
  }
};

export default game;
