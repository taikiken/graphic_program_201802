/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/19 - 20:59
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// redux
import { combineReducers } from 'redux';

// schedules
import calendar from './schedules/calendar';
import schedule from './schedules/schedule';

// games
import game from './games/game';

// ----------------
/**
 * combineReducers 済み `./schedules/*`
 * @type {Reducer}
 */
const schedules = combineReducers({
  calendar,
  schedule,
});

/**
 * combineReducers 済み `./games/*`
 * @type {Reducer}
 */
const games = combineReducers({
  game,
});

export default {
  schedules,
  games,
};
