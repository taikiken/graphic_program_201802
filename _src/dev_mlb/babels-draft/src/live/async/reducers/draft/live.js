/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/05 - 17:22
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import Reducers from '../Reducers';

/**
 * `/async/reducers/player/` - default state
 * @type {{type: string, result: ?PlayersDae, error: ?Error, count: number}}
 */
const initial = {
  type: Reducers.INITIAL,
  result: null,
  error: null,
};

/**
 * `/async/reducers/player/` - action.state で処理分岐し state を作成します
 * - {@link Reducers}.[PLAYER_COMPLETE|PLAYER_ERROR]
 * @param {{type: string, result: ?PlayersDae, error: ?Error}} [requestState=initial] state
 * @param {{type: string, result: ?PlayersDae, error: ?Error}} action ajax 結果 state
 * @returns {{type: string, result: ?PlayersDae, error: ?Error}} ajax 結果を返します - action.type により内容は変わります
 */
const live = (requestState = initial, action) => {
  const state = Object.assign({}, requestState);
  // console.log('reducers.player', state, action);
  // switch-case
  switch (action.type) {
    // success
    case Reducers.LIVE_COMPLETE: {
      state.type = action.type;
      state.result = action.result;
      return state;
    }
    // error
    case Reducers.LIVE_ERROR: {
      state.type = action.type;
      state.error = action.error;
      return state;
    }
    // default
    case Reducers.INITIAL:
    default: {
      return state;
    }
  }
};

export default live;
