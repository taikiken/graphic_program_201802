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
// redux
import { combineReducers } from 'redux';

import game from './games/game';

/**
 * redux.combineReducers - `/reducers/games/game.js`
 * @type {Reducer<any>}
 */
const games = combineReducers({
  game,
});

/**
 * `/reducers/games/` - game
 * @ty[e {{games: function}}
 */
export default {
  games,
};
