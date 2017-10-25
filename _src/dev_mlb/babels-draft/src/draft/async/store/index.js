/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/20 - 22:39
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import { applyMiddleware, createStore } from 'redux';

// reducers
import reducers from '../reducers/index';

// middleware
import middleware from './middleware';

/**
 * redux - createStore します
 * - players
 * - middleware
 *  - thunk
 *  - logger
 * @type {Store<S>}
 */
const players = createStore(
  reducers.players,
  applyMiddleware(
    middleware.thunk,
    middleware.logger,
  ),
);

/**
 * redux - createStore します
 * - related
 * - middleware
 *  - thunk
 *  - logger
 * @type {Store<any>}
 */
const news = createStore(
  reducers.related,
  applyMiddleware(
    middleware.thunk,
    middleware.logger,
  ),
);

/**
 * redux - createStore します
 * - reducers
 * - middleware
 *  - thunk
 *  - logger
 * @type {{players: Store.<S>, news: Store.<S>}}
 */
const store = {
  players,
  news,
};

export default store;
