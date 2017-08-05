/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/25 - 14:52
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// react
import React from 'react';
import PropTypes from 'prop-types';

// dae/schedule
import
{
  DaeJapanese,
  DaeJapanesePlayer,
  DaeGame,
} from '../../../dae/schedule/DaeSchedule';

// dae/player
import DaeBatting from '../../../dae/player/DaeBatting';
import DaePitching from '../../../dae/player/DaePitching';

// util
import Day from '../../../util/Day';
import Print from '../../../util/Print';

// define
import Style from '../../../define/Style';

// ----------------------------------------
// ComBatting
// ----------------------------------------
/**
 * ComBatting
 * @param {DaeBatting} player 野手情報
 * @constructor
 */
const ComBatting = ({ player }) => (
  <tr>
    <th className="mlb__today_jp__record__th">成績</th>
    <td className="mlb__today_jp__record__td">
      打率：{Print.str(player.average)}
    </td>
    <td className="mlb__today_jp__record__td">
      {Print.int(player.bats)}打数{Print.int(player.hits)}安打
    </td>
    <td className="mlb__today_jp__record__td">
      {Print.int(player.runs)}打点
    </td>
  </tr>
);

/**
 * propTypes
 * @type {{player: DaeBatting}}
 */
ComBatting.propTypes = {
  player: PropTypes.instanceOf(DaeBatting).isRequired,
};

// ----------------------------------------
// ComPitching
// ----------------------------------------
/**
 * 投手成績
 * @param {DaePitching} player 投手情報
 * @constructor
 */
const ComPitching = ({ player }) => (
  <tr>
    <th className="mlb__today_jp__record__th">成績</th>
    <td className="mlb__today_jp__record__td">
      防御率：{Print.str(player.average)}
    </td>
    <td className="mlb__today_jp__record__td">
      投球数：{Print.int(player.pitched)}
    </td>
    <td className="mlb__today_jp__record__td">
      失点：{Print.int(player.ra)}
    </td>
  </tr>
);

/**
 * propTypes
 * @type {{player: DaePitching}}
 */
ComPitching.propTypes = {
  player: PropTypes.instanceOf(DaePitching).isRequired,
};

// ----------------------------------------
// ComPlayer
// ----------------------------------------
/**
 * 日本人選手情報
 * - {@link ComBatting}
 * - {@link ComPitching}
 * @param {DaeJapanesePlayer} player 日本人選手
 * @returns {XML} div.mlb_jp_stats
 * @constructor
 */
const ComPlayer = ({ player }) => {
  console.log('ComJaPlayer player', player);
  // 投手でも type が 'batting' になっている
  // const batting = player.type === 'batting';
  // const ComType = batting ? ComBatting : ComPitching;
  // const comStats = batting ? player.batting : player.pitching;
  const elements = [];
  if (player.pitching.has) {
    elements.push(<ComPitching player={player.pitching} key={`jp-pitcher-${player.id}`} />);
  }
  if (player.batting.has) {
    elements.push(<ComBatting player={player.batting} key={`jp-batter-${player.id}`} />);
  }

  return (
    <div className="js-mlb_jp_stats">
      <div className="mlb__today_jp__player">
        <h3 className="mlb__today_jp__player__name">{Print.str(player.player)}</h3>
        <dl className="mlb__today_jp__player__profile">
          <dt className="mlb__today_jp__player__profile__team">{Print.str(player.team)}</dt>
          <dd className="mlb__today_jp__player__profile__uniform_num">
            背番号<span>{Print.int(player.number)}</span>
          </dd>
        </dl>
      </div>
      {/* 成績 */}
      <div className="mlb__today_jp__record__container">
        <table className="mlb__today_jp__record">
          <tbody>
            {
              elements.map(element => element)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

/**
 * propTypes
 * @type {{player: DaeJapanesePlayer}}
 */
ComPlayer.propTypes = {
  player: PropTypes.instanceOf(DaeJapanesePlayer).isRequired,
};

// ----------------------------------------
// ComGame
// ----------------------------------------
/**
 * 試合結果を表示します
 * @param {DaeGame} game game 情報
 * @param {string} homeClass home team class
 * @param {string} visitorClass visitor tean class
 * @param {string} statusClass 試合 status class
 * @param {string} teamClass チーム class
 * @returns {XML} div.mlb__game__overview
 */
const ComGameDetail = ({ game, homeClass, visitorClass, statusClass, teamClass }) => (
  <div className="mlb__game__overview">
    <p className={`${teamClass} ${teamClass}--home ${homeClass}`}>
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
    <p className={`${teamClass} ${teamClass}--visitor ${visitorClass}`} >
      {Print.str(game.visitor.team)}
    </p>
  </div>
);

/**
 * propTypes
 * @type {{game: DaeGame, homeClass: string, visitorClass: string, statusClass: string, teamClass: string}}
 */
ComGameDetail.propTypes = {
  game: PropTypes.instanceOf(DaeGame).isRequired,
  homeClass: PropTypes.string.isRequired,
  visitorClass: PropTypes.string.isRequired,
  statusClass: PropTypes.string.isRequired,
  teamClass: PropTypes.string.isRequired,
};

/**
 * 試合結果にリンクをつけるか否かを判定します
 * @param {DaeGame} game ゲーム情報
 * @param {*} date {@link Day.date} object - 試合日
 * @param {*} today {@link Day.date} object - 今日
 * @returns {XML} div.mlb__game__overview__no_link > {@link ComGameDetail}
 * @constructor
 */
const ComGame = ({ game, date, today }) => {
  const homeClass = game.home.win ? Style.WIN : '';
  const visitorClass = game.visitor.win ? Style.WIN : '';
  const statusClass = game.className;
  const teamClass = 'mlb__game__overview__team';
  // render
  // 未来のゲームはリンクしない
  if (date.full > today.full) {
    // console.log('div.mlb__game__overview__no_link');
    return (
      <div
        className="mlb__game__overview__no_link"
        data-href={`/stats/mlb/game/${date.year}/${game.id}/`}
      >
        <ComGameDetail
          game={game}
          homeClass={homeClass}
          visitorClass={visitorClass}
          statusClass={statusClass}
          teamClass={teamClass}
        />
      </div>
    );
  }
  // a
  return (
    <a
      href={`/stats/mlb/game/${date.year}/${game.id}/`}
      className="mlb__game__overview__link"
    >
      <ComGameDetail
        game={game}
        homeClass={homeClass}
        visitorClass={visitorClass}
        statusClass={statusClass}
        teamClass={teamClass}
      />
    </a>
  );
};

/**
 * propTypes
 * @type {{game: DaeGame, team: string, date: *, today: *}}
 */
ComGame.propTypes = {
  game: PropTypes.instanceOf(DaeGame).isRequired,
  date: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
    full: PropTypes.string.isRequired,
  }).isRequired,
  today: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
    full: PropTypes.string.isRequired,
  }).isRequired,
};

// ----------------------------------------
// ComGame
// ----------------------------------------
/**
 * 試合毎の日本人選手一覧を出力します
 * - {@link ComPlayer}
 * @param {DaeGame} game japanese player game 情報
 * @param {*} date {{year: number, month: number, day: number, full: string}} な object
 * @param {*} today {{year: number, month: number, day: number, full: string}} な object
 * @returns {?XML} div.com-player-container > div.mlb__game__overview
 * @constructor
 */
const ComGameContainer = ({ game, date, today }) => {
  if (!game.players.has()) {
    return null;
  }
  // -----
  // render
  return (
    <div className="mlb__today_jp__container">
      {
        game.players.list.map(player => (
          <ComPlayer
            key={`japanese-${player.id}`}
            player={player}
          />
        ))
      }
      <ComGame
        game={game}
        date={date}
        today={today}
      />
    </div>
  );
};


/**
 * propTypes
 * @type {{game: DaeGame, date: {
 *  year: number,
 *  month: number,
 *  day: number,
 * }}},
 * today: *
 */
ComGameContainer.propTypes = {
  game: PropTypes.instanceOf(DaeGame).isRequired,
  date: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
  }).isRequired,
  today: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
    full: PropTypes.string.isRequired,
  }).isRequired,
};

// ----------------------------------------
// ComJapanese
// ----------------------------------------
/**
 * 日程・結果 - 日本人選手一覧
 * - {@link ComScheduleMam}
 *   - ComJapanese
 * @param {DaeJapanese} japanese JSON `.japanese_players.[]` リスト
 * @param {{year: number, month: number, day: number}} date {@link Day}.today object
 * @returns {?XML} section.mlb__today_jp or null
 * @constructor
 */
const ComJapanese = ({ japanese, date }) => {
  // 存在チェック
  if (!japanese.has()) {
    return null;
  }
  console.log('ComJapanese japanese', japanese, date);
  const today = Day.today();
  // render
  return (
    <section className="mlb__today_jp">
      <h2 className="mlb__today_jp__heading">{Day.title(date)}に出場した日本人選手</h2>
      {
        japanese.list.map(game => (
          <ComGameContainer
            key={`${game.id}-${game.status}`}
            game={game}
            date={date}
            today={today}
          />
        ))
      }
      <div className="mlb__today_jp__btn">
        <a href="/stats/mlb/playerlist/">日本人選手一覧へ</a>
      </div>
    </section>
  );
};

/**
 * propTypes
 * @type {{japanese: DaeJapanese, date: {year: number, month: number, day: number}}}
 */
ComJapanese.propTypes = {
  japanese: PropTypes.instanceOf(DaeJapanese).isRequired,
  date: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
  }).isRequired,
};

export default ComJapanese;
