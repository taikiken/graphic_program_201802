/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/28 - 22:05
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

// util
import Print from '../../../util/Print';

// dae
import DaeGameInfo from '../../../dae/games/DaeGameInfo';
import DaeTeamInfo from '../../../dae/games/DaeTeamInfo';

// ----------------------------------------

// ----------------------------------------
// 試合情報・チーム対戦成績
// ----------------------------------------
/**
 * 試合情報・チーム対戦成績
 * @param {DaeGameInfo} info チーム情報
 * @returns {XML} section.mlb_live__win_loss_standings-section
 */
const ComTeamRecord = ({ info }) => (
  <section className="mlb_live__win_loss_standings-section">
    <h2 className="mlb_live__heading--h2">チーム対戦成績</h2>
    <table className="mlb_live__win_loss_standings">
      <thead>
        <tr>
          <th className="mlb_live__win_loss_standings__th--home">
            {Print.str(info.home.jp)}
          </th>
          <th className="mlb_live__win_loss_standings__th">成績</th>
          <th className="mlb_live__win_loss_standings__th--visitor">
            {Print.str(info.visitor.jp)}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="mlb_live__win_loss_standings__td">
            {Print.int(info.home.record.wins, '0')}勝{Print.int(info.home.record.losses, '0')}敗
          </td>
          <th className="mlb_live__win_loss_standings__th">勝敗</th>
          <td className="mlb_live__win_loss_standings__td">
            {Print.int(info.visitor.record.wins, '0')}勝{Print.int(info.visitor.record.losses, '0')}敗
          </td>
        </tr>
      </tbody>
    </table>
  </section>
);

/**
 * propTypes
 * @type {{info: DaeGameInfo}}
 */
ComTeamRecord.propTypes = {
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
};

// ----------------------------------------
// 試合情報・控え選手
// ----------------------------------------
/**
 * 控え選手
 * 左・右・両 に見合う class name を取得します
 * - mlb_live__starting--bench__td--player__handed--left
 * - mlb_live__starting--bench__td--player__handed--right
 * - mlb_live__starting--bench__td--player__handed--both
 * @param {DaePlayer} reserve 控え選手
 * @returns {string} 左・右・両 に見合う class name
 */
const reserveHandType = (reserve) => {
  const type = reserve.position === '投' ? reserve.hand : reserve.batHand;
  if (type === '左') {
    return 'mlb_live__starting--bench__td--player__handed--left';
  } else if (type === '右') {
    return 'mlb_live__starting--bench__td--player__handed--right';
  }
  return 'mlb_live__starting--bench__td--player__handed--both';
};

/**
 * tbody へカテゴリ別に class を取得する
 * - mlb_live__starting--bench--pitcher
 * - mlb_live__starting--bench--backstop
 * - mlb_live__starting--bench--designated_hitter
 * - mlb_live__starting--bench--outfielder
 * - mlb_live__starting--bench--infielder
 * @param {string} position position カテゴリ名称
 * @returns {string} body へカテゴリ別に class
 */
const bodyClassName = (position) => {
  switch (position) {
    case '投手': {
      return 'mlb_live__starting--bench--pitcher';
    }
    case '捕手': {
      return 'mlb_live__starting--bench--backstop';
    }
    case '指名打者': {
      return 'mlb_live__starting--bench--designated_hitter';
    }
    case '外野手': {
      return 'mlb_live__starting--bench--outfielder';
    }
    default: {
      return 'mlb_live__starting--bench--infielder';
    }
  }
};

/**
 * tr > td.mlb_live__starting--bench__td--player
 * @param {Array.<DaePlayer>} list カテゴリ別選手リスト
 * @returns {XML} tr > td.mlb_live__starting--bench__td--player
 */
const comReservesPlayer = list => (
  list.map(player => (
    <tr key={`reserve-${player.id}`}>
      <td className="mlb_live__starting--bench__td--player">
        <i className={reserveHandType(player)}>&nbsp;</i>
        {Print.str(player.player)}
      </td>
    </tr>
  ),
));


/**
 * カテゴリごとに `tbody` を出力します
 * @param {DaePlayers} reserve 控え選手
 * @param {string} type home | visitor
 * @returns {Array.<XML>} tbody 一覧を返します
 */
const comReserves = (reserve, type) => {
  const reserves = reserve.reserves;
  return Object.keys(reserves).map(category => (
    <tbody
      key={`${type}-reserve-position-${encodeURIComponent(category)}`}
      className={bodyClassName(category)}
    >
      <tr>
        <th className="mlb_live__starting--bench__th__heading">
          {category}
        </th>
      </tr>
      {
        comReservesPlayer(reserves[category])
      }
    </tbody>
  ));
};

/**
 * 試合情報・控え選手
 * - ComReserve
 *   - comReserves
 *     - comReservesPlayer
 *   - comReserves
 *     - comReservesPlayer
 * @param {DaeGameInfo} info ゲーム情報
 * @param {DaeTeamInfo} team チーム情報
 * @returns {XML} div.js-reserves > div.mlb_live__starting--bench__section
 * @constructor
 */
const ComReserve = ({ info, team }) => (
  <div className="js-reserves">
    <h2 className="mlb_live__heading--h2">控え選手</h2>
    <div className="mlb_live__starting--bench__section">
      <table className="mlb_live__starting--bench mlb_live__starting--bench--home">
        <caption className="mlb_live__starting--bench__caption">
          {Print.str(info.home.jp)}
        </caption>
        {
          comReserves(team.teams[info.home.id].reserve, 'home')
        }
      </table>
      <table className="mlb_live__starting--bench mlb_live__starting--bench--visitor">
        <caption className="mlb_live__starting--bench__caption">
          {Print.str(info.visitor.jp)}
        </caption>
        {
          comReserves(team.teams[info.visitor.id].reserve, 'visitor')
        }
      </table>
    </div>
  </div>
);

/**
 * propTypes
 * @type {{info: DaeGameInfo, team: DaeTeamInfo}}
 */
ComReserve.propTypes = {
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
  team: PropTypes.instanceOf(DaeTeamInfo).isRequired,
};


// ----------------------------------------
// 試合情報・スターティングメンバー
// ----------------------------------------
/**
 * 試合情報・スターティングメンバー
 * 左・右・両 に見合う class name を取得します
 * - mlb_live__starting--member__td--player__handed--left
 * - mlb_live__starting--member__td--player__handed--right
 * - mlb_live__starting--member__td--player__handed--both
 * @param {DaePlayer} starting スターティングメンバー選手情報
 * @returns {string} 左・右・両 に見合う class name
 */
const batType = (starting) => {
  const type = starting.position === '投' ? starting.hand : starting.batHand;
  if (type === '左') {
    return 'mlb_live__starting--member__td--player__handed--left';
  } else if (type === '右') {
    return 'mlb_live__starting--member__td--player__handed--right';
  }
  return 'mlb_live__starting--member__td--player__handed--both';
};

/**
 * 試合情報・スターティングメンバー
 * @param {DaeGameInfo} info ゲーム情報
 * @param {DaeTeamInfo} team チーム情報
 * @returns {XML} div.js-starting-fielders > div.mlb_live__starting--member__section
 * */
const ComStarting = ({ info, team }) => (
  <div className="js-starting-fielders">
    <h2 className="mlb_live__heading--h2">スターティングメンバー</h2>
    <div className="mlb_live__starting--member__section">
      {/* home */}
      <table className="mlb_live__starting--member mlb_live__starting--member--home">
        <caption className="mlb_live__starting--member__caption">
          {Print.str(info.home.jp)}
        </caption>
        <tbody>
          {
            team.teams[info.home.id].starting.list.map(starting => (
              <tr key={`home-starting-${starting.id}`}>
                <th className="mlb_live__starting--member__th--lineup">
                  {starting.no === 0 ? '-' : Print.int(starting.no)}
                </th>
                <td className="mlb_live__starting--member__td--position">
                  {Print.str(starting.position)}
                </td>
                <td className="mlb_live__starting--member__td--player">
                  <i className={batType(starting)}>&nbsp;</i>
                  {Print.str(starting.player)}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {/* visitor */}
      <table className="mlb_live__starting--member mlb_live__starting--member--visitor">
        <caption className="mlb_live__starting--member__caption">
          {Print.str(info.visitor.jp)}
        </caption>
        <tbody>
          {
            team.teams[info.visitor.id].starting.list.map(starting => (
              <tr key={`home-starting-${starting.id}`}>
                <th className="mlb_live__starting--member__th--lineup">
                  {starting.no === 0 ? '-' : Print.int(starting.no)}
                </th>
                <td className="mlb_live__starting--member__td--position">
                  {Print.str(starting.position)}
                </td>
                <td className="mlb_live__starting--member__td--player">
                  <i className={batType(starting)}>&nbsp;</i>
                  {Print.str(starting.player)}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>
);

/**
 * propTypes
 * @type {{info: DaeGameInfo, team: DaeTeamInfo}}
 */
ComStarting.propTypes = {
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
  team: PropTypes.instanceOf(DaeTeamInfo).isRequired,
};


// ----------------------------------------
// 試合情報・予告先発投手
// ----------------------------------------
/**
 * 予告先発投手
 * 左・右・両 に見合う class name を取得します
 * - mlb_live__starting--pitcher__handed--left
 * - mlb_live__starting--pitcher__handed--right
 * - mlb_live__starting--pitcher__handed--both
 * @param {string} type 左・右・両
 * @returns {*} 左・右・両 に見合う class name を返します
 */
const pitcherHandType = (type) => {
  if (type === '左') {
    return 'mlb_live__starting--pitcher__handed--left';
  } else if (type === '右') {
    return 'mlb_live__starting--pitcher__handed--right';
  }
  return 'mlb_live__starting--pitcher__handed--both';
};

/**
 * 試合情報・予告先発投手
 * @param {DaeGameInfo} info ゲーム情報
 * @returns {XML} div.js-starting-pitchers > table.mlb_live__starting--pitcher
 * @constructor
 */
const ComGamePitchers = ({ info }) => (
  <div className="js-starting-pitchers">
    <h2 className="mlb_live__heading--h2">予告先発投手</h2>
    <table className="mlb_live__starting--pitcher">
      <thead>
        <tr>
          <th className="mlb_live__starting--pitcher__th--home">{Print.str(info.home.jp)}</th>
          <th className="mlb_live__starting--pitcher__th--visitor">{Print.str(info.visitor.jp)}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="mlb_live__starting--pitcher__td">
            <p className="mlb_live__starting--pitcher__position">投手</p>
            <p className="mlb_live__starting--pitcher__uniform_num">
              {Print.int(info.home.pitcher.number)}
            </p>
            <p className="mlb_live__starting--pitcher__name">
              {Print.str(info.home.pitcher.player)}
              <i className={pitcherHandType(info.home.pitcher.hand)}>&nbsp;</i>
            </p>
          </td>
          <td className="mlb_live__starting--pitcher__td">
            <p className="mlb_live__starting--pitcher__position">投手</p>
            <p className="mlb_live__starting--pitcher__uniform_num">
              {Print.int(info.visitor.pitcher.number)}
            </p>
            <p className="mlb_live__starting--pitcher__name">
              {Print.str(info.visitor.pitcher.player)}
              <i className={pitcherHandType(info.visitor.pitcher.hand)}>&nbsp;</i>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <table className="mlb_live__starting--pitcher_record">
      <thead>
        <tr>
          <th className="mlb_live__starting--pitcher_record__th">試</th>
          <th className="mlb_live__starting--pitcher_record__th">勝</th>
          <th className="mlb_live__starting--pitcher_record__th">負</th>
          <th className="mlb_live__starting--pitcher_record__th">防御率</th>
          <th className="mlb_live__starting--pitcher_record__th">成績</th>
          <th className="mlb_live__starting--pitcher_record__th">試</th>
          <th className="mlb_live__starting--pitcher_record__th">勝</th>
          <th className="mlb_live__starting--pitcher_record__th">負</th>
          <th className="mlb_live__starting--pitcher_record__th">防御率</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="mlb_live__starting--pitcher_record__td">
            {Print.int(info.home.pitcher.games, '0')}
          </td>
          <td className="mlb_live__starting--pitcher_record__td">
            {Print.int(info.home.pitcher.wins, '0')}
          </td>
          <td className="mlb_live__starting--pitcher_record__td">
            {Print.int(info.home.pitcher.losses, '0')}
          </td>
          <td className="mlb_live__starting--pitcher_record__td">
            {Print.str(info.home.pitcher.average, '0')}
          </td>
          <td className="mlb_live__starting--pitcher_record__td">今季</td>
          <td className="mlb_live__starting--pitcher_record__td">
            {Print.int(info.visitor.pitcher.games, '0')}
          </td>
          <td className="mlb_live__starting--pitcher_record__td">
            {Print.int(info.visitor.pitcher.wins, '0')}
          </td>
          <td className="mlb_live__starting--pitcher_record__td">
            {Print.int(info.visitor.pitcher.losses, '0')}
          </td>
          <td className="mlb_live__starting--pitcher_record__td">
            {Print.str(info.visitor.pitcher.average, '0')}
          </td>
        </tr>
        <tr>
          <td className="mlb_live__starting--pitcher_record__td">XX</td>
          <td className="mlb_live__starting--pitcher_record__td">XX</td>
          <td className="mlb_live__starting--pitcher_record__td">XX</td>
          <td className="mlb_live__starting--pitcher_record__td">XX</td>
          <td className="mlb_live__starting--pitcher_record__td">対戦</td>
          <td className="mlb_live__starting--pitcher_record__td">XX</td>
          <td className="mlb_live__starting--pitcher_record__td">XX</td>
          <td className="mlb_live__starting--pitcher_record__td">XX</td>
          <td className="mlb_live__starting--pitcher_record__td">XX</td>
        </tr>
      </tbody>
    </table>
  </div>
);

/**
 * propTypes
 * @type {{info: DaeGameInfo}}
 */
ComGamePitchers.propTypes = {
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
};

// ----------------------------------------
// 試合情報・親
// ----------------------------------------
/**
 * 試合情報・親
 * - ComGame - section.mlb_live__starting
 *   - {@link ComGamePitchers}
 *   - {@link ComStarting}
 *   - {@link ComReserve}
 *   - {@link ComTeamRecord}
 * @param {DaeGameInfo} info ゲーム情報
 * @param {DaeTeamInfo} team チーム情報・先発 / 控
 * @returns {XML} section.mlb_live__starting
 */
const ComGame = ({ info, team }) => (
  <section className="mlb_live__starting">
    <ComGamePitchers info={info} />
    <ComStarting team={team} info={info} />
    <ComReserve team={team} info={info} />
    <ComTeamRecord info={info} />
  </section>
);

/**
 * propTypes
 * @type {{info: DaeGameInfo, team: DaeTeamInfo}}
 */
ComGame.propTypes = {
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
  team: PropTypes.instanceOf(DaeTeamInfo).isRequired,
};

export default ComGame;
