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

import players from './draft/players';
import news from './draft/news';

/**
 * `/async/actions/` - action methods
 * @type {{
 *   players: function,
 *   news: function
 * }}
 */
export default {
  players,
  news,
};
