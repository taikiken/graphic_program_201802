/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/04 - 20:06
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// net
import ajax from '../../../net/ajax';

// dae
import NewsDae from '../../../dae/NewsDae';

// async/reducers
import Reducers from '../../reducers/Reducers';

// app
import Path from '../../../app/Path';

/**
 * async method - {@link ajax} を await 実行します
 * @returns {Promise} 実行元へ Promise を返します
 */
async function asyncCall() {
  const path = Path.news;
  const json = await ajax(path);
  return json;
}

/**
 * fetch success callback
 * @param {object} json instagram sandbox api JSONP -> JSON
 * @returns {{result: PlayersDae, type: string}} ajax success redux.state を返します
 */
const complete = (json) => {
  const result = new NewsDae(json);
  // console.log('actions.players.complete', json, result);
  return {
    result,
    type: Reducers.NEWS_COMPLETE,
  };
};

/**
 * retry count
 * @type {number}
 */
let count = 0;
/**
 * fetch error callback
 * @param {Error} error fetch error
 * @returns {{error: ?Error, type: string}} ajax error redux.state を返します
 */
const fail = (error) => {
  count += 1;
  console.warn('ajax fail', error, count, Date.now());
  return {
    error,
    count,
    type: Reducers.NEWS_ERROR,
  };
};

/**
 * instagram sandbox api をリクエストし JSON を取得します
 * @returns {Promise} fetch Promise
 */
const news = () => dispatch => (
  asyncCall()
    .then(json => dispatch(complete(json)))
    .catch(error => dispatch(fail(error)))
);

export default news;
