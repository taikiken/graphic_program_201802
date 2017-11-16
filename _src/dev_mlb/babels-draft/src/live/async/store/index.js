/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/05 - 17:29
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
import middleware from '../../../draft/async/store/middleware';

/**
 * redux - createStore します
 * - {@link reducers}
 * - middleware
 *  - thunk
 *  - logger
 * @type {Store<S>}
 */
const lives = createStore(
  reducers.lives,
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
 * @type {{lives: Store.<S>}}
 */
const store = {
  lives,
};

export default store;
