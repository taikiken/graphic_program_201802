/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/27 - 20:18
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// async/reducers
import ReducerTypes from '../ReducerTypes';

const initial = {
  type: ReducerTypes.INITIAL,
  year: null,
  id: null,
  info: null,
  member: null,
  team: null,
  innings: null,
  error: null,
};

const game = (requestState = initial, action) => {
  const state = Object.assign({}, requestState);
  console.log('reducers.games', state, action);
  // switch-case
  switch (action.type) {
    case ReducerTypes.GAMES_COMPLETE: {
      state.type = action.type;
      state.year = action.year;
      state.id = action.id;
      state.info = action.info;
      state.member = action.member;
      state.team = action.team;
      state.innings = action.innings;
      return state;
    }
    case ReducerTypes.CALENDAR_ERROR: {
      state.type = action.type;
      state.year = action.year;
      state.id = action.id;
      state.error = action.error;
      return state;
    }
    case ReducerTypes.INITIAL:
    default: {
      return state;
    }
  }
};

export default game;
