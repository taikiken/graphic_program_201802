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
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// dae
import DaeGameInfo from '../../../dae/games/DaeGameInfo';
import DaeMemberInfo, { DaePlayers } from '../../../dae/games/DaeMemberInfo';

// component
import ComMemberTab from './ComMemberTab';

// util
import Print from '../../../util/Print';

// ----------------------------------------
// 出場成績・投手
// ----------------------------------------
const ComPitchers = ({ players, type, team, info }) => {
  console.log('ComPitchers', team, players.members.pitchers);
  const win = info.win;
  const loose = info.loose;
  const save = info.save;
  return (
    <table className={`mlb_live__record mlb_live__record--${type}`}>
      <caption className="mlb_live__record__heading">{team}</caption>
      <thead>
        <tr>
          <th className="mlb_live__record__th">勝敗・セーブ</th>
          <th className="mlb_live__record__th">選手</th>
          <th className="mlb_live__record__th">防御率</th>
          <th className="mlb_live__record__th">投球回数</th>
          <th className="mlb_live__record__th">投球数(ストライク)</th>
        </tr>
      </thead>
      <tbody>
        {
          players.members.pitchers.map((player) => {
            const playerName = player.player;
            let mark = '';
            if (playerName === win) {
              mark = '○';
            } else if (playerName === loose) {
              mark = '●';
            } else if (playerName === save) {
              mark = 'S';
            }
            return (
              <tr key={`${type}-pitcher-${player.id}`} className={`player-${player.no}`}>
                <td>{mark}</td>
                <td className="t-left">{Print.str(playerName)}</td>
                <td>{Print.str(player.pitching.average)}</td>
                <td>{player.pitching.innings.title}</td>
                <td>{Print.int(player.pitching.pitched)}（{Print.int(player.pitching.strikes)}）</td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};


ComPitchers.propTypes = {
  players: PropTypes.instanceOf(DaePlayers).isRequired,
  type: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
};

// ----------------------------------------
// 出場成績・打者
// ----------------------------------------
const ComBatters = ({ players, type, team }) => {
  // TODO: players.members.batters Sort - 打席順 + 出場順
  let bats = 0;
  let hits = 0;
  let runs = 0;
  return (
    <table className={`mlb_live__record mlb_live__record--${type}`}>
      <caption className="mlb_live__record__heading">{team}</caption>
      <thead>
        <tr>
          <th className="mlb_live__record__th">位置</th>
          <th className="mlb_live__record__th">選手</th>
          <th className="mlb_live__record__th">通算打率</th>
          <th className="mlb_live__record__th">打数</th>
          <th className="mlb_live__record__th">安打</th>
          <th className="mlb_live__record__th">打点</th>
        </tr>
      </thead>
      <tbody>
        {
          players.members.batters.map((player) => {
            // 累積します
            bats += player.batting.bats;
            hits += player.batting.hits;
            runs += player.batting.runs;
            // render tr > td
            return (
              <tr key={`${type}-batter-${player.id}`} className={`player-${player.no}`}>
                <td>{Print.str(player.position)}</td>
                <td className="t-left">{Print.str(player.player)}</td>
                <td>{Print.str(player.batting.average)}</td>
                <td>{Print.int(player.batting.bats)}</td>
                <td>{Print.int(player.batting.hits)}</td>
                <td>{Print.int(player.batting.runs)}</td>
              </tr>
            );
          })
        }
      </tbody>
      <tfoot>
        <tr>
          <th className="mlb_live__record__th" colSpan={2}>合計</th>
          <td>&nbsp;</td>
          <td>{bats}</td>
          <td>{hits}</td>
          <td>{runs}</td>
        </tr>
      </tfoot>
    </table>
  );
};

ComBatters.propTypes = {
  players: PropTypes.instanceOf(DaePlayers).isRequired,
  type: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
};

// ----------------------------------------
// 出場成績・親
// ----------------------------------------
export default class ComMember extends Component {
  // ----------------------------------------
  // STATIC PROPERTY
  // ----------------------------------------
  /**
   * propTypes
   * @type {{info: DaeGameInfo, member: DaeMemberInfo}}
   */
  static propTypes = {
    info: PropTypes.instanceOf(DaeGameInfo),
    member: PropTypes.instanceOf(DaeMemberInfo),
  };
  /**
   * defaultProps
   * @type {{info: ?DaeGameInfo, member: ?DaeMemberInfo}}
   */
  static defaultProps = {
    info: null,
    member: null,
  };
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  constructor(props) {
    super(props);
    /**
     * - batter
     * - pitcher
     * @type {{tab: string}}
     */
    this.state = {
      tab: 'batter',
    };
    /**
     * bind onChange event handler - tab 切替
     * @type {function}
     */
    this.onChange = this.onChange.bind(this);
  }
  /**
   * tab 切替 event handler
   * @param {string} tab tab 名称
   */
  onChange(tab) {
    console.log('ComMember.onChange', tab);
    this.setState({ tab });
  }
  choose(tab) {
    const { info, member } = this.props;
    console.log('ComMember.choose', tab, info, member);
    switch (tab) {
      case 'batter': {
        return (
          <div className="mlb_live__record__container mlb_live__record__container--batter">
            <ComBatters
              players={member.team(info.home.id)}
              type="home"
              team={info.home.jp}
            />
            <ComBatters
              players={member.team(info.visitor.id)}
              type="visitor"
              team={info.visitor.jp}
            />
          </div>
        );
      }
      case 'pitcher': {
        return (
          <div className="mlb_live__record__container mlb_live__record__container--pitcher">
            <ComPitchers
              players={member.team(info.home.id)}
              type="home"
              team={info.home.jp}
              info={info}
            />
            <ComPitchers
              players={member.team(info.visitor.id)}
              type="visitor"
              team={info.visitor.jp}
              info={info}
            />
          </div>
        );
      }
      default:
        return null;
    }
  }
  render() {
    const { info, member } = this.props;
    console.log('ComMember.render info, member', info, member);
    if (!info || !member) {
      return null;
    }
    return (
      <div className="js-member-container">
        <ComMemberTab
          change={this.onChange}
        />
        <section className="mlb_live__record__section">
          {
            this.choose(this.state.tab)
          }
        </section>
      </div>
    );
  }
}
