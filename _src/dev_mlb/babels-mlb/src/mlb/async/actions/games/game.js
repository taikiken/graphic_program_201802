/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/27 - 20:39
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import Api from '../../../app/Api';

// net
import ajax from '../../../net/ajax';

// reducer
import ReducerTypes from '../../reducers/ReducerTypes';

// dae/games
import DaeTeamInfo from '../../../dae/games/DaeTeamInfo';
import DaeMemberInfo from '../../../dae/games/DaeMemberInfo';
import DaeGameInfo from '../../../dae/games/DaeGameInfo';
import DaeInnings from '../../../dae/games/DaeInnings';

/**
 * fetch - ajax request を並列処理します
 * @param {number|string} year YYYY 年
 * @param {number|string} id game ID
 * @returns {Array} Promise list
 */
const parallel = (year, id) => {
  const paths = [];
  // チーム情報json
  paths.push(Api.team(year, id));
  // 選手情報json
  paths.push(Api.member(year, id));
  // 試合情報json
  paths.push(Api.game(year, id));
  // イニング情報json
  paths.push(Api.innings(year, id));
  // parallel call
  return paths.map(path => (ajax(path)));
};

/**
 * 並列処理を await します
 * @param {number|string} year YYYY 年
 * @param {number|string} id game ID
 * @returns {Promise.<*>} fetch
 */
async function asyncCall(year, id) {
  const results = await Promise.all(parallel(year, id));
  return results;
}

/**
 * fetch - ajax complete state を作成します
 * @param {Array} results JSON result list
 * @param {number|string} year YYYY 年
 * @param {number|string} id game ID
 * @returns {{year: string, id: string, team: DaeTeamInfo, member: DaeMemberInfo, info: DaeGameInfo, type: string}}
 * fetch - ajax complete state
 */
const requestComplete = (results, year, id) => {
  // console.log('actions.games.requestComplete', results, year, id);
  const team = new DaeTeamInfo(results[0]);
  const member = new DaeMemberInfo(results[1]);
  const info = new DaeGameInfo(results[2]);
  const innings = new DaeInnings(results[3]);
  return {
    year,
    id,
    team,
    member,
    info,
    innings,
    type: ReducerTypes.GAMES_COMPLETE,
  };
};

/**
 * fetch - ajax error 処理を行います
 * @param {Error} error ajax error
 * @param {number|string} year YYYY 年
 * @param {number|string} id game ID
 * @returns {*} error state
 */
const requestError = (error, year, id) => ({
  error,
  year,
  id,
  type: ReducerTypes.GAMES_ERROR,
});

/**
 * JSON を3種並列取得します
 * - {@link Api.team}
 * - {@link Api.member}
 * - {@link Api.game}
 * @param {number|string} year YYYY 年
 * @param {number|string} id game ID
 * @returns {Promise} Promise.all を返します
 */
const game = (year, id) => dispatch => (
  asyncCall(year, id)
    .then(results => dispatch(requestComplete(results, year, id)))
    .catch(error => dispatch(requestError(error, year, id)))
);

export default game;
