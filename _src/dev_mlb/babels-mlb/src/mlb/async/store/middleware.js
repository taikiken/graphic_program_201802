/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/19 - 18:23
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import thunk from 'redux-thunk';

// app
import Env from '../../app/Env';

// @see http://redux.js.org/docs/advanced/AsyncActions.html#indexjs
// @see http://redux.js.org/docs/api/applyMiddleware.html#example-custom-logger-middleware

// Logs all actions and states after they are dispatched.
/**
 * redux log を出力します
 * Logs all actions and states after they are dispatched.
 * @param {*} store redux logger
 * @returns {*} redux result を返します
 * @see http://redux.js.org/docs/advanced/AsyncActions.html#indexjs
 * @see http://redux.js.org/docs/api/applyMiddleware.html#example-custom-logger-middleware
 */
const logger = store => next => (action = { type: 'undefined' }) => {
  let result;
  if (Env.node() === 'development') {
    console.group(action.type);
    console.info('dispatching', action);
    result = next(action);
    console.warn('next state', store.getState());
    console.groupEnd(action.type);
  }
  return result || next(action);
};

/**
 * export redux middleware
 * {{logger: function, thunk: *}}
 */
export default {
  logger,
  thunk,
};
