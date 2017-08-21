/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/19 - 21:08
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import { applyMiddleware, createStore } from 'redux';

// reducers
import reducers from '../reducers';

// middleware
import middleware from './middleware';

/**
 * schedules: redux - createStore します
 * - reducers.schedules
 *   - calendar
 *   - schedule
 * - middleware
 *  - thunk
 *  - logger
 * @type {Store<any>}
 */
const schedules = createStore(
  reducers.schedules,
  applyMiddleware(
    middleware.thunk,
    middleware.logger,
  ),
);

/**
 * games: redux - createStore します
 * - reducers.games
 *   - game
 * - middleware
 *  - thunk
 *  - logger
 * @type {Store<any>}
 */
const games = createStore(
  reducers.games,
  applyMiddleware(
    middleware.thunk,
    middleware.logger,
  ),
);

/**
 * schedules / games まとめます
 * @type {{schedules: Store.<any>, games: Store.<any>}}
 */
const store = {
  schedules,
  games,
};

/**
 * redux - createStore します
 * - reducers
 * - middleware
 *  - thunk
 *  - logger
 * @type {Store<S>}
 */
export default store;
