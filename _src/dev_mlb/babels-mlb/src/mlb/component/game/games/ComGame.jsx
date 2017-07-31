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
// 試合情報・控え選手
// ----------------------------------------
const reserveHandType = (reserve) => {
  const type = reserve.position === '投' ? reserve.hand : reserve.batHand;
  if (type === '左') {
    return 'mlb_live__starting--member__td--player__handed--left';
  } else if (type === '右') {
    return 'mlb_live__starting--member__td--player__handed--right';
  }
  return 'mlb_live__starting--member__td--player__handed--both';
};

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

// ComReserves.propTypes = {
//   reserve: PropTypes.instanceOf(DaeReserve).isRequired,
//   type: PropTypes.string.isRequired,
// };

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


ComReserve.propTypes = {
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
  team: PropTypes.instanceOf(DaeTeamInfo).isRequired,
};


// ----------------------------------------
// 試合情報・スターティングメンバー
// ----------------------------------------
const batType = (starting) => {
  const type = starting.position === '投' ? starting.hand : starting.batHand;
  if (type === '左') {
    return 'mlb_live__starting--member__td--player__handed--left';
  } else if (type === '右') {
    return 'mlb_live__starting--member__td--player__handed--right';
  }
  return 'mlb_live__starting--member__td--player__handed--both';
};

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
                  <i className={batType(starting.batHand)}>&nbsp;</i>
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

ComStarting.propTypes = {
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
  team: PropTypes.instanceOf(DaeTeamInfo).isRequired,
};


// ----------------------------------------
// 試合情報・予告先発投手
// ----------------------------------------
const pitcherHandType = (type) => {
  if (type === '左') {
    return 'mlb_live__starting--pitcher__handed--left';
  } else if (type === '右') {
    return 'mlb_live__starting--pitcher__handed--right';
  }
  return 'mlb_live__starting--pitcher__handed--both';
};

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

ComGamePitchers.propTypes = {
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
};

// ----------------------------------------
// 試合情報・親
// ----------------------------------------
const ComGame = ({ info, team }) => (
  <section className="mlb_live__starting">
    <ComGamePitchers info={info} />
    <ComStarting team={team} info={info} />
    <ComReserve team={team} info={info} />
  </section>
);

ComGame.propTypes = {
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
  team: PropTypes.instanceOf(DaeTeamInfo).isRequired,
};

export default ComGame;
