/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/20 - 22:38
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// redux
import { combineReducers } from 'redux';

import player from './draft/player';
import news from './draft/news';

/**
 * redux.combineReducers - `/reducers/insta/insta.js`
 * - player
 * @type {Reducer<any>}
 */
const players = combineReducers({
  player,
});

/**
 * redux.combineReducers - `/reducers/insta/insta.js`
 * - news
 * @type {Reducer<any>}
 */
const related = combineReducers({
  news,
});


/**
 * `/reducers/insta/` - insta
 * @ty[e {{insta: function}}
 */
export default {
  players,
  related,
};
