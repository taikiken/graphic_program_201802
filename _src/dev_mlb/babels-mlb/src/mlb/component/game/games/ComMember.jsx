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
/**
 * 出場成績・投手
 * @param {DaePlayers} players 選手情報
 * @param {string} type home|visitor
 * @param {string} team チーム名（日本語）
 * @param {DaeGameInfo} info ゲーム情報, win / lose / save を取得します
 * @returns {XML} table.mlb_live__record
 * @constructor
 */
const ComPitchers = ({ players, type, team, info }) => {
  // console.log('ComPitchers players', players);
  // players.members.pitchers Sort - 登板順
  const win = info.win;
  const lose = info.lose;
  const save = info.save;
  // console.log('ComPitchers', team, win, lose, save, players.members.pitchers);
  // const members = players.members.pitchers;
  // 打席順・ソート済みデータ - 登板順がまだ無いので... on 2017-08-04
  const members = players.members.pitchersOrder;
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
          members.map((player) => {
            const playerName = player.player;
            // @type {string} - 勝敗Sのシンボル（文字）
            let mark = '';
            if (playerName === win) {
              mark = '○';
            } else if (playerName === lose) {
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

/**
 * propTypes
 * @type {{players: DaePlayers, type: string, team: string, info: DaeGameInfo}}
 */
ComPitchers.propTypes = {
  players: PropTypes.instanceOf(DaePlayers).isRequired,
  type: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
};

// ----------------------------------------
// 出場成績・打者
// ----------------------------------------
/**
 * 出場成績・打者
 * @param {DaePlayers} players 選手情報
 * @param {string} type home|visitor
 * @param {string} team チーム名（日本語）
 * @returns {XML} table.mlb_live__record
 * @constructor
 */
const ComBatters = ({ players, type, team }) => {
  // TODO: players.members.batters Sort - 打席順 + 出場順
  // console.log('ComBatters players', players);
  // 打数, 安打, 打点 を合計します
  let bats = 0;
  let hits = 0;
  let runs = 0;
  // const members = players.members.batters;
  // 打席順・ソート済みデータ
  const members = players.members.battersOrder;
  // render
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
          members.map((player) => {
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

/**
 * propTypes
 * @type {{players: DaePlayers, type: string, team: string}}
 */
ComBatters.propTypes = {
  players: PropTypes.instanceOf(DaePlayers).isRequired,
  type: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
};

// ----------------------------------------
// 出場成績・親
// ----------------------------------------
/**
 * 出場成績・親
 * - ComMember
 *   - {@link ComMemberTab}
 *   - {@link ComBatters}
 *   - {@link ComPitchers}
 *
 * tab で 打者 / 投手 表示切替します
 */
export default class ComMember extends Component {
  // ----------------------------------------
  // STATIC PROPERTY
  // ----------------------------------------
  /**
   * propTypes
   * @type {{info: DaeGameInfo, member: DaeMemberInfo, tab: string}}
   */
  static propTypes = {
    info: PropTypes.instanceOf(DaeGameInfo),
    member: PropTypes.instanceOf(DaeMemberInfo),
    tab: PropTypes.string.isRequired,
    cb: PropTypes.func.isRequired,
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
  /**
   * ComPitchers
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    /**
     * tab 切替 state
     * - batter
     * - pitcher
     * @type {{tab: string}}
     */
    this.state = {
      tab: props.tab,
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
    // console.log('ComMember.onChange', tab);
    this.setState({ tab });
    this.props.cb(tab);
  }
  /**
   * data 不正の時に空タグを出力します
   * @returns {XML} div.mlb_live__record__container
   * @since 2017-08-17
   * @see https://aws-plus.backlog.jp/view/UNDO_MLBSTATS-24#comment-1174362975
   */
  emptyChoose() {
    const tab = this.state.tab;
    switch (tab) {
      case 'batter': {
        return (
          <div className="mlb_live__record__container mlb_live__record__container--batter">
            <table className="mlb_live__record mlb_live__record--home">
              <caption className="mlb_live__record__heading">&nbsp;</caption>
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
                <tr>
                  <td>&nbsp;</td>
                  <td className="t-left">&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th className="mlb_live__record__th" colSpan={2}>合計</th>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              </tfoot>
            </table>
            <table className="mlb_live__record mlb_live__record--visitor">
              <caption className="mlb_live__record__heading">&nbsp;</caption>
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
                <tr>
                  <td>&nbsp;</td>
                  <td className="t-left">&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th className="mlb_live__record__th" colSpan={2}>合計</th>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              </tfoot>
            </table>
          </div>
        );
      }
      case 'pitcher': {
        return (
          <div className="mlb_live__record__container mlb_live__record__container--pitcher">
            <table className="mlb_live__record mlb_live__record--home">
              <caption className="mlb_live__record__heading">&nbsp;</caption>
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
                <tr>
                  <td>&nbsp;</td>
                  <td className="t-left">&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              </tbody>
            </table>
            <table className="mlb_live__record mlb_live__record--visitor">
              <caption className="mlb_live__record__heading">&nbsp;</caption>
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
                <tr>
                  <td>&nbsp;</td>
                  <td className="t-left">&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      }
      default:
        return null;
    }
  }
  /**
   * data 不正の時に空タグを出力します
   * @returns {XML} div.js-member-container
   * @since 2017-08-17
   * @see https://aws-plus.backlog.jp/view/UNDO_MLBSTATS-24#comment-1174362975
   */
  empty() {
    return (
      <div className="js-member-container">
        <ComMemberTab
          change={this.onChange}
          tab={this.props.tab}
        />
        <section className="mlb_live__record__section">
          {
            this.emptyChoose()
          }
        </section>
      </div>
    );
  }
  /**
   * 引数 `tab` で表示切替をします
   * - 打者成績
   * - 投手成績
   * @param {string} tab batter|pitcher
   * @returns {?XML} div,mlb_live__record__container
   */
  choose(tab) {
    const { info, member } = this.props;
    // console.log('ComMember.choose', tab, info, member);
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
  /**
   * 出場成績
   * div.js-member-container > section.mlb_live__record__section
   * @returns {?XML} div.js-member-container > section.mlb_live__record__section
   */
  render() {
    const { info, member } = this.props;
    // console.log('ComMember.render info, member', info, member, this.state);
    if (!info || !member) {
      return this.empty();
      // return null;
    }
    return (
      <div className="js-member-container">
        <ComMemberTab
          change={this.onChange}
          tab={this.props.tab}
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
