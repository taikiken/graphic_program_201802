/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/17 - 20:25
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// draft/net
import ajax from '../../../../draft/net/ajax';

// async/reducers
import Reducers from '../../reducers/Reducers';

// dae
// import LivesDae from '../../../dae/LivesDae';
import NipponDae from '../../../dae/NipponDae';

// live/app
import Path from '../../../app/Path';

// draft/app
import Env from '../../../../draft/app/Env';

/**
 * async method - {@link ajax} を await 実行します
 * @returns {Promise} 実行元へ Promise を返します
 */
async function asyncCall() {
  const path = Path.nippon;
  const json = await ajax(path);
  return json;
}

/**
 * fetch success callback
 * @param {object} json instagram sandbox api JSONP -> JSON
 * @returns {{result: PlayersDae, type: string}} ajax success redux.state を返します
 */
const complete = (json) => {
  const result = new NipponDae(json);
  // console.log('actions.players.complete', json, result);
  return {
    result,
    type: Reducers.NIPPON_COMPLETE,
    interval: Env.nipponInterval,
    id: Env.nipponId,
    noRecords: Env.noRecords,
  };
};

/**
 * fetch error callback
 * @param {Error} error fetch error
 * @returns {{error: ?Error, type: string}} ajax error redux.state を返します
 */
const fail = (error) => {
  console.warn('ajax fail', error, Date.now());
  return {
    error,
    type: Reducers.NIPPON_ERROR,
    interval: Env.nipponInterval,
    id: Env.nipponId,
    noRecords: Env.noRecords,
  };
};

/**
 * instagram sandbox api をリクエストし JSON を取得します
 * @returns {Promise} fetch Promise
 */
const games = () => dispatch => (
  asyncCall()
    .then(json => dispatch(complete(json)))
    .catch(error => dispatch(fail(error)))
);

export default games;
