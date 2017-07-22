/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/22 - 14:15
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
import DaeSchedule, { DaeJapanese, DaeJapanesePlayer } from '../../dae/schedule/DaeSchedule';
import DaeBatting from '../../dae/player/DaeBatting';
import DaePitching from '../../dae/player/DaePitching';

// util
import Day from '../../util/Day';

// ----------------------------------------
// section.mlb__today_jp
// ----------------------------------------
const ComBatting = ({ player }) => (
  <tr>
    <th className="mlb__today_jp__record__th">成績</th>
    <td className="mlb__today_jp__record__td">打率：{player.average}</td>
    <td className="mlb__today_jp__record__td">{player.bats}打数{player.hits}安打</td>
    <td className="mlb__today_jp__record__td">{player.run}打点</td>
  </tr>
);

ComBatting.propTypes = {
  player: PropTypes.instanceOf(DaeBatting).isRequired,
};

const ComPitching = ({ player }) => (
  <tr>
    <th className="mlb__today_jp__record__th">成績</th>
    <td className="mlb__today_jp__record__td">防御率：{player.average}</td>
    <td className="mlb__today_jp__record__td">投球数：{player.pitched}</td>
    <td className="mlb__today_jp__record__td">失点：{player.ra}</td>
  </tr>
);

ComPitching.propTypes = {
  player: PropTypes.instanceOf(DaePitching).isRequired,
};

const ComJaPlayer = ({ player }) => {
  const batting = player.type === 'batting';
  const ComType = batting ? ComBatting : ComPitching;
  const comStats = batting ? player.batting : player.pitching;
  return (
    <div className="mlb_jp_stats">
      <div className="mlb__today_jp__player">
        <h3 className="mlb__today_jp__player__name">{player.player}</h3>
        <dl className="mlb__today_jp__player__profile">
          <dt className="mlb__today_jp__player__profile">{player.team}</dt>
          <dd className="mlb__today_jp__player__profile__uniform_num">
            背番号<span>{player.number}</span>
          </dd>
        </dl>
      </div>
      {/* 成績 */}
      <div className="mlb__today_jp__record__container">
        <table className="mlb__today_jp__record">
          <tbody>
            <ComType
              player={comStats}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

ComJaPlayer.propTypes = {
  player: PropTypes.instanceOf(DaeJapanesePlayer).isRequired,
};

const ComGame = ({ game }) => {
  if (!game.players.has()) {
    return null;
  }
  return (
    game.players.list.map(player => (
      <ComJaPlayer
        key={player.id}
        player={player}
      />
    ))
  );
};


const ComJapanese = ({ japanese, date }) => {
  if (!japanese.has()) {
    return null;
  }
  return (
    <section className="mlb__today_jp">
      <h2 className="mlb__today_jp__heading">{Day.title(date)}に出場した日本人選手</h2>
      {
        japanese.list.map(game => (
          <ComGame
            key={`${game.id}-${game.status}`}
            game={game}
          />
        ))
      }
    </section>
  );
};

ComJapanese.propTypes = {
  japanese: PropTypes.instanceOf(DaeJapanese).isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
};

export default class ComScheduleMam extends Component {
  static propTypes = {
    schedule: PropTypes.instanceOf(DaeSchedule),
    date: PropTypes.shape({
      year: PropTypes.number,
      month: PropTypes.number,
      day: PropTypes.number,
    }),
  };
  static defaultProps = {
    schedule: null,
    date: null,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      team: 'all',
      league: 'all',
    };
  }
  render() {
    if (!this.props.schedule || !this.props.date) {
      return null;
    }
    return (
      <div className="index-container">
        <ComJapanese
          japanese={this.props.schedule.japanese}
          date={this.props.date}
        />
      </div>
    );
  }
}
