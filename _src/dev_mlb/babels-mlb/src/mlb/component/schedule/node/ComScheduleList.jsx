/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/26 - 21:47
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// react
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// dae/schedule
import { DaeLeagues, DaeSeasons, DaeGames, DaeGame } from '../../../dae/schedule/DaeSchedule';

// util
import Print from '../../../util/Print';

// define
import Style from '../../../define/Style';

// ----------------------------------------
// 各ゲーム
// ----------------------------------------
/**
 * 各ゲーム
 * - 引数 `team` が 'all' 以外の時は filter 処理を行う
 * @param {DaeGame} game ゲーム情報
 * @param {string} team team.id - 【注意】data は number なので cast して比較すること
 * @returns {?XML} div.mlb__game__overview
 * @constructor
 */
const ComGame = ({ game, team }) => {
  const teamClass = 'mlb__game__overview__team';
  // team `all` 以外は filter する
  if (team !== 'all') {
    const homeId = String(game.home.id);
    const visitorId = String(game.visitor.id);
    if (team !== homeId && team !== visitorId) {
      return null;
    }
  }
  // ------
  const homeClass = game.home.win ? Style.WIN : '';
  const visitorClass = game.visitor.win ? Style.WIN : '';
  const statusClass = game.className;
  // render
  return (
    <div className="mlb__game__overview">
      <p className={`${teamClass} ${teamClass}--home ${Print.str(game.home.className)}`}>
        {Print.str(game.home.team)}
      </p>
      <div className="mlb__game__overview__info">
        <p className="mlb__game__overview__info__place">
          {Print.str(game.stadium)}
        </p>
        <p className="mlb__game__overview__info__score">
          <span className={`mlb__game__overview__info__score--home ${homeClass}`}>
            {Print.int(game.home.score)}
          </span>
          <span className="mlb__game__overview__info__score--vs">-</span>
          <span className={`mlb__game__overview__info__score--visitor ${visitorClass}`}>
            {Print.int(game.visitor.score)}
          </span>
        </p>
        <p className={`mlb__game__overview__info__status ${statusClass}`}>
          {Print.str(game.label)}
        </p>
      </div>
      <p
        className={`mlb__game__overview__team mlb__game__overview__team--visitor ${visitorClass}`}
      >
        {Print.str(game.visitor.team)}
      </p>
    </div>
  );
};

/**
 * propTypes
 * @type {{game: DaeGame, team: string}}
 */
ComGame.propTypes = {
  game: PropTypes.instanceOf(DaeGame).isRequired,
  team: PropTypes.string.isRequired,
};

// ----------------------------------------
// 各リーグ list 処理
// ----------------------------------------
/**
 * 各リーグ list 処理
 * - リーグタイトル出力
 * - 引数 `team` が 'all' 以外の時は filter 処理を行う
 * @param {DaeGames} games ゲーム情報リスト
 * @param {string} team team.id - 【注意】data は number なので cast して比較すること
 * @returns {?XML} div.mlb__schedule__result__heading
 * @constructor
 */
const ComGames = ({ games, team }) => {
  // game 数存在チェック
  if (!games.has()) {
    return null;
  }
  // filter - by team id - all 以外
  let has = team === 'all';
  if (!has) {
    has = games.list.some((game) => {
      const homeId = String(game.home.id);
      const visitorId = String(game.visitor.id);
      // どちらかに存在すれば OK
      return team === homeId || team === visitorId;
    });
  }
  if (!has) {
    return null;
  }
  const title = games.title ?
    <h3 className="mlb__schedule__result__heading">{Print.str(games.title)}</h3> :
    '';
  // render
  return (
    <div className="game-container">
      {title}
      {
        games.list.map(game => (
          <ComGame
            key={`game-${game.id}`}
            game={game}
            team={team}
          />
        ))
      }
    </div>
  );
};

/**
 * propTypes
 * @type {{games: DaeGames, team: string}}
 */
ComGames.propTypes = {
  games: PropTypes.instanceOf(DaeGames).isRequired,
  team: PropTypes.string.isRequired,
};

// ----------------------------------------
// 各シーズン list 処理
// ----------------------------------------
/**
 * 各シーズン list 処理
 * div.mlb__schedule__result__container
 * @param {DaeLeagues} leagues リーグ情報
 * @param {string} team team.id filter に使用します
 * @constructor
 */
const ComSeasons = ({ leagues, team }) => (
  <div className="mlb__schedule__result__container">
    {
      leagues.list.map(games => (
        <ComGames
          key={`${games.season}-${games.league}`}
          games={games}
          team={team}
        />
      ))
    }
  </div>
);

/**
 * propTypes
 * @type {{leagues: DaeLeagues, team: string}}
 */
ComSeasons.propTypes = {
  leagues: PropTypes.instanceOf(DaeLeagues).isRequired,
  team: PropTypes.string.isRequired,
};

// ----------------------------------------
// 日程・結果
// ----------------------------------------
/**
 * 日程・結果
 * リーグ別にリスト出力します
 */
export default class ComScheduleList extends Component {
  // ----------------------------------------
  // STATIC PROPERTY
  // ----------------------------------------
  /**
   * propTypes
   * - seasons {DaeSeasons}
   * - team {string} team.id - 【注意】data は number なので cast して比較すること
   * - team {string} type.key - key_name を比較します
   * @type {{seasons: DaeSeasons, team: string, type: string}}
   */
  static propTypes = {
    seasons: PropTypes.instanceOf(DaeSeasons).isRequired,
    team: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * nextProps.team, nextProps.type を比較し update するかを決定します
   * @param {{team: string, type: string}} nextProps 更新される props
   * @returns {boolean} true: render する
   */
  shouldComponentUpdate(nextProps) {
    const { team, type } = this.props;
    let update = false;
    if (team !== nextProps.team) {
      update = true;
    }
    if (type !== nextProps.type) {
      update = true;
    }
    console.log('ComScheduleList shouldComponentUpdate', nextProps, update);
    return update;
  }
  /**
   * div.mlb__schedule__result__section を出力します
   * - {@link ComSchedule}
   *   - ComScheduleList
   *     - {@link ComSeasons}
   *       - {@link ComGames}
   *         - {@link ComGame}
   * @returns {XML} div.mlb__schedule__result__section を返します
   */
  render() {
    // select / option の値
    const { team, type } = this.props;
    console.log('ComScheduleList.render team, type', team, type);
    return (
      <div className="mlb__schedule__result__section">
        {
          this.props.seasons.list.map((season) => {
            // @type {DaeLeagues}
            const leagues = this.props.seasons.leagues(season);
            if (!leagues.enable) {
              return null;
            }
            // filter
            if (type !== 'all' && type !== leagues.key) {
              return null;
            }
            // render
            return (
              <ComSeasons
                key={`season-${leagues.key}`}
                leagues={leagues}
                team={team}
              />
            );
          })
        }
      </div>
    );
  }
}
