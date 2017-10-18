/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/28 - 22:04
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
import DaeGameInfo from '../../dae/games/DaeGameInfo';
import DaeMemberInfo from '../../dae/games/DaeMemberInfo';
import DaeTeamInfo from '../../dae/games/DaeTeamInfo';
import DaeInnings from '../../dae/games/DaeInnings';

// component
import ComInfoTab from './ComInfoTab';

// component/games
import ComGame from './games/ComGame';
import ComMember from './games/ComMember';
import ComInning from './games/ComInning';

// ----------------------------------------
// 親
// ----------------------------------------
/**
 * `/stats/mlb/game/YYYY/GAME_ID` の tab と切替で表示するコンテナの親
 * - {@link ComInfoTab}
 * - {@link ComGame}
 * - {@link ComMember}
 * - {@link ComInning}
 */
export default class ComInfo extends Component {
  // ----------------------------------------
  // STATIC PROPERTY
  // ----------------------------------------
  /**
   * propTypes
   * @type {{info: DaeGameInfo, member: DaeMemberInfo, team: DaeTeamInfo}}
   */
  static propTypes = {
    info: PropTypes.instanceOf(DaeGameInfo),
    member: PropTypes.instanceOf(DaeMemberInfo),
    team: PropTypes.instanceOf(DaeTeamInfo),
    innings: PropTypes.instanceOf(DaeInnings),
  };
  /**
   * defaultProps
   * @type {{info: ?DaeGameInfo, member: ?DaeMemberInfo, team: ?DaeTeamInfo}}
   */
  static defaultProps = {
    info: null,
    member: null,
    team: null,
    innings: null,
  };
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * ゲーム情報を表示します
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * - game
     * - member
     * - inning
     * @type {{tab: string}}
     */
    this.state = {
      tab: 'game',
    };
    /**
     * bind onChange event handler - tab 切替
     * @type {function}
     */
    this.onChange = this.onChange.bind(this);
    /**
     * bind onMember - 出場成績タブ event handler
     * @type {function}
     */
    this.onMember = this.onMember.bind(this);
    /**
     * 出場成績タブ current id
     * @type {string}
     */
    this.member = 'batter';
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * tab 切替 event handler
   * - 試合情報
   * - 出場成績
   * - イニング速報
   * @param {string} tab tab 名称
   */
  onChange(tab) {
    // console.log('ComInfo.onChange', tab);
    this.setState({ tab });
  }
  /**
   * 出場成績タブをキープするために切替コールバックから「タブ」id を取得し `this.member` へ保存します
   * - 打者成績
   * - 投手成績
   * @param {string} tab batter|pitcher
   */
  onMember(tab) {
    // console.log('ComInfo.onMember', tab);
    this.member = tab;
  }
  /**
   * data 不正の時に空タグを出力します
   * - game
   * - member
   * - inning
   * @returns {XML} div.mlb_live__starting
   * @since 2017-08-17
   * @see https://aws-plus.backlog.jp/view/UNDO_MLBSTATS-24#comment-1174362975
   */
  emptyChoose() {
    const tab = this.state.tab;
    const { info, member } = this.props;
    switch (tab) {
      case 'game': {
        return (
          <section className="mlb_live__starting">
            {/* starting pitcher */}
            <div className="js-starting-pitchers">
              <h2 className="mlb_live__heading--h2">予告先発投手</h2>
              <table className="mlb_live__starting--pitcher">
                <thead>
                  <tr>
                    <th className="mlb_live__starting--pitcher__th--home">
                      &nbsp;
                    </th>
                    <th className="mlb_live__starting--pitcher__th--visitor">
                      &nbsp;
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="mlb_live__starting--pitcher__td">
                      <p className="mlb_live__starting--pitcher__position">投手</p>
                      <p className="mlb_live__starting--pitcher__uniform_num">
                        &nbsp;
                      </p>
                      <p className="mlb_live__starting--pitcher__name">
                        &nbsp;
                      </p>
                    </td>
                    <td className="mlb_live__starting--pitcher__td">
                      <p className="mlb_live__starting--pitcher__position">投手</p>
                      <p className="mlb_live__starting--pitcher__uniform_num">
                        &nbsp;
                      </p>
                      <p className="mlb_live__starting--pitcher__name">
                        &nbsp;
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
                      &nbsp;
                    </td>
                    <td className="mlb_live__starting--pitcher_record__td">
                      &nbsp;
                    </td>
                    <td className="mlb_live__starting--pitcher_record__td">
                      &nbsp;
                    </td>
                    <td className="mlb_live__starting--pitcher_record__td">
                      &nbsp;
                    </td>
                    <td className="mlb_live__starting--pitcher_record__td">今季</td>
                    <td className="mlb_live__starting--pitcher_record__td">
                      &nbsp;
                    </td>
                    <td className="mlb_live__starting--pitcher_record__td">
                      &nbsp;
                    </td>
                    <td className="mlb_live__starting--pitcher_record__td">
                      &nbsp;
                    </td>
                    <td className="mlb_live__starting--pitcher_record__td">
                      &nbsp;
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* starting */}
            <div className="js-starting-fielders">
              <h2 className="mlb_live__heading--h2">スターティングメンバー</h2>
              <div className="mlb_live__starting--member__section">
                {/* home */}
                <table className="mlb_live__starting--member mlb_live__starting--member--home">
                  <caption className="mlb_live__starting--member__caption">
                    &nbsp;
                  </caption>
                  <tbody>
                    <tr>
                      <th className="mlb_live__starting--member__th--lineup">
                        &nbsp;
                      </th>
                      <td className="mlb_live__starting--member__td--position">
                        &nbsp;
                      </td>
                      <td className="mlb_live__starting--member__td--player">
                        &nbsp;
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* visitor */}
                <table className="mlb_live__starting--member mlb_live__starting--member--visitor">
                  <caption className="mlb_live__starting--member__caption">
                    &nbsp;
                  </caption>
                  <tbody>
                    <tr>
                      <th className="mlb_live__starting--member__th--lineup">
                        &nbsp;
                      </th>
                      <td className="mlb_live__starting--member__td--position">
                        &nbsp;
                      </td>
                      <td className="mlb_live__starting--member__td--player">
                        &nbsp;
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* reserve */}
            <h2 className="mlb_live__heading--h2">控え選手</h2>
            <div className="mlb_live__starting--bench__section">
              <table className="mlb_live__starting--bench mlb_live__starting--bench--home">
                <caption className="mlb_live__starting--bench__caption">
                  &nbsp;
                </caption>
                <tbody className="mlb_live__starting--bench--pitcher">
                  <tr>
                    <th className="mlb_live__starting--bench__th__heading">
                      &nbsp;
                    </th>
                  </tr>
                  <tr>
                    <td className="mlb_live__starting--bench__td--player">
                      &nbsp;
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="mlb_live__starting--bench mlb_live__starting--bench--visitor">
                <caption className="mlb_live__starting--bench__caption">
                  &nbsp;
                </caption>
                <tbody className="mlb_live__starting--bench--pitcher">
                  <tr>
                    <th className="mlb_live__starting--bench__th__heading">
                      &nbsp;
                    </th>
                  </tr>
                  <tr>
                    <td className="mlb_live__starting--bench__td--player">
                      &nbsp;
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* record */}
            <section className="mlb_live__win_loss_standings-section">
              <h2 className="mlb_live__heading--h2">チーム対戦成績</h2>
              <table className="mlb_live__win_loss_standings">
                <thead>
                  <tr>
                    <th className="mlb_live__win_loss_standings__th--home">
                      &nbsp;
                    </th>
                    <th className="mlb_live__win_loss_standings__th">成績</th>
                    <th className="mlb_live__win_loss_standings__th--visitor">
                      &nbsp;
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="mlb_live__win_loss_standings__td">
                      &nbsp;勝&nbsp;敗
                    </td>
                    <th className="mlb_live__win_loss_standings__th">勝敗</th>
                    <td className="mlb_live__win_loss_standings__td">
                      &nbsp;勝&nbsp;敗
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </section>
        );
      }
      case 'member': {
        return <ComMember info={info} member={member} tab={this.member} cb={this.onMember} />;
      }
      case 'inning': {
        return (
          <div className="mlb_live__inning__section">
            <div>
              <h2 className="mlb_live__inning__heading">&nbsp;</h2>
              <table className="mlb_live__inning">
                <thead className="">
                  <tr>
                    <th className="mlb_live__inning__th--pitcher" colSpan={2}>
                      ピッチャー
                      <span className="mlb_live__inning__pitcher_name">&nbsp;</span>
                    </th>
                    <th className="mlb_live__inning__th--out">アウト</th>
                    <th className="mlb_live__inning__th--score" colSpan={2}>スコア</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="mlb_live__inning__td--lineup">
                      <span>&nbsp;</span>
                    </td>
                    <td className="mlb_live__inning__td--play">
                      <span className="mlb_live__inning__player">&nbsp;</span>
                      <span className="mlb_live__inning__action">&nbsp;</span>
                    </td>
                    <td className="mlb_live__inning__td--out">
                      &nbsp;
                    </td>
                    <td className="mlb_live__inning__td--score--home">&nbsp;</td>
                    <td className="mlb_live__inning__td--score--visitor">&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  }
  /**
   * data 不正の時に空タグを出力します
   * @returns {XML} div.js-info-container
   * @since 2017-08-17
   * @see https://aws-plus.backlog.jp/view/UNDO_MLBSTATS-24#comment-1174362975
   */
  empty() {
    return (
      <div className="js-info-container">
        <ComInfoTab
          change={this.onChange}
        />
        {
          this.emptyChoose()
        }
      </div>
    );
  }
  /**
   * onChange tab 切替で出力するコンテナを切替ます
   * @param {string} tab tab ID - game / member / inning
   * @returns {?XML} {@link ComGame} / {@link ComMember}} / {@link ComInning}
   */
  choose(tab) {
    const { info, member, team, innings } = this.props;
    console.log('ComInfo.choose tab', tab, info, member, team);

    switch (tab) {
      case 'game': {
        return <ComGame info={info} team={team} />;
      }
      case 'member': {
        return <ComMember info={info} member={member} tab={this.member} cb={this.onMember} />;
      }
      case 'inning': {
        return <ComInning info={info} innings={innings} />;
      }
      default:
        return null;
    }
  }
  /**
   * tab 切替親コンテナ
   * @returns {?XML} div#js-info-container
   */
  render() {
    const { info, member, team, innings } = this.props;
    // console.log('ComInfo.render info, member, team', info, member, team);
    if (!info || !member || !team || !innings) {
      return this.empty();
      // return null;
    }
    // render
    return (
      <div className="js-info-container">
        <ComInfoTab
          change={this.onChange}
        />
        {
          this.choose(this.state.tab)
        }
      </div>
    );
  }
}
