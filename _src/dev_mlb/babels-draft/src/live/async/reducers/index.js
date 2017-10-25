/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/05 - 17:25
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// redux
import { combineReducers } from 'redux';

import live from './draft/live';


/**
 * redux.combineReducers - `/reducers/insta/insta.js`
 * @type {Reducer<any>}
 */
const lives = combineReducers({
  live,
});

/**
 * `/reducers/insta/` - insta
 * @ty[e {{insta: function}}
 */
export default {
  lives,
};
