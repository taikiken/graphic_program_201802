/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/19 - 19:59
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import calendar from './schedules/calendar';
import schedule from './schedules/schedule';

// game
import game from './games/game';

/**
 * schedule - redux actions
 * @type {{calendar: *, schedule: *}}
 */
const schedules = {
  calendar,
  schedule,
};

/**
 * games - redux actions
 * @type {{game: *}}
 */
const games = {
  game,
};

export default {
  schedules,
  games,
};
