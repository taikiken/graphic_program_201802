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

const parallel = (year, id) => {
  const paths = [];
  // チーム情報json
  paths.push(Api.team(year, id));
  // 選手情報json
  paths.push(Api.member(year, id));
  // 試合情報json
  paths.push(Api.game(year, id));
  // parallel call
  return paths.map(path => (ajax(path)));
};

async function asyncCall(year, id) {
  const results = await Promise.all(parallel(year, id));
  return results;
}

const requestComplete = (results, year, id) => {
  console.log('actions.games.requestComplete', results, year, id);
  const team = new DaeTeamInfo(results[0]);
  const member = new DaeMemberInfo(results[1]);
  const info = new DaeGameInfo(results[2]);
  return {
    year,
    id,
    team,
    member,
    info,
    type: ReducerTypes.GAMES_COMPLETE,
  };
};

const requestError = (error, year, id) => ({
  error,
  year,
  id,
  type: ReducerTypes.GAMES_ERROR,
});


const game = (year, id) => dispatch => (
  asyncCall(year, id)
    .then(results => dispatch(requestComplete(results, year, id)))
    .catch(error => dispatch(requestError(error, year, id)))
);

export default game;
